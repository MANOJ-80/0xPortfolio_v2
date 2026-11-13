"use client";

import { useCallback, useEffect, useRef } from "react";

const PENTATONIC = [0, 2, 4, 7, 9] as const;
const NOTE_NAMES = ["C", "D", "E", "G", "A"] as const;

export type NoteMeta = {
  name: string;
  midi: number;
  frequency: number;
};

/** Two octaves of a major pentatonic scale — pleasant in any order. */
export function getNote(index: number): NoteMeta {
  const step = ((index % 10) + 10) % 10;
  const octave = 4 + Math.floor(step / 5);
  const semitone = PENTATONIC[step % 5];
  const midi = 12 * (octave + 1) + semitone;

  return {
    name: `${NOTE_NAMES[step % 5]}${octave}`,
    midi,
    frequency: 440 * Math.pow(2, (midi - 69) / 12),
  };
}

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  reverb: ConvolverNode;
  keyboardSprite: AudioBuffer | null;
  keyboardSpriteLoad: Promise<AudioBuffer | null> | null;
};

export type TechSoundMode = "piano" | "keyboard";

const KEY_SAMPLE_COUNT = 16;
const KEY_SAMPLE_STRIDE = 0.12;
const KEY_SAMPLE_DURATION = 0.095;

type AudioContextConstructor = typeof AudioContext;

function impulseResponse(ctx: AudioContext, seconds: number, decay: number) {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = ctx.createBuffer(2, length, rate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }

  return buffer;
}

function loadKeyboardSprite(engine: Engine) {
  if (engine.keyboardSprite) return Promise.resolve(engine.keyboardSprite);
  if (engine.keyboardSpriteLoad) return engine.keyboardSpriteLoad;

  engine.keyboardSpriteLoad = fetch("/sounds/keyboard-click-sprite.wav")
    .then((response) => {
      if (!response.ok) throw new Error("Keyboard sound samples could not be loaded");
      return response.arrayBuffer();
    })
    .then((data) => engine.ctx.decodeAudioData(data))
    .then((buffer) => {
      engine.keyboardSprite = buffer;
      return buffer;
    })
    .catch(() => null);

  return engine.keyboardSpriteLoad;
}

function keyboardClick(engine: Engine, buffer: AudioBuffer, index: number, when: number, kind: "hover" | "click") {
  const { ctx, master } = engine;
  // Reorder the recorded presses so adjacent chips don't all repeat the same timbre.
  const sampleIndex = (index * 7 + (kind === "click" ? 5 : 0)) % KEY_SAMPLE_COUNT;
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(kind === "click" ? 0.76 : 0.58, when);
  source.connect(envelope);
  envelope.connect(master);
  source.start(when, sampleIndex * KEY_SAMPLE_STRIDE, KEY_SAMPLE_DURATION);
}

function voice(
  engine: Engine,
  frequency: number,
  when: number,
  duration: number,
  gain: number,
) {
  const { ctx, master, reverb } = engine;

  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, when);
  osc.detune.setValueAtTime(-3, when);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.setValueAtTime(0.6, when);
  filter.frequency.setValueAtTime(4600, when);
  filter.frequency.exponentialRampToValueAtTime(1500, when + duration);

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, when);
  env.gain.exponentialRampToValueAtTime(gain, when + 0.008);
  env.gain.exponentialRampToValueAtTime(0.0001, when + duration);

  osc.connect(filter);
  filter.connect(env);
  env.connect(master);
  env.connect(reverb);

  osc.start(when);
  osc.stop(when + duration + 0.05);

  const shine = ctx.createOscillator();
  shine.type = "sine";
  shine.frequency.setValueAtTime(frequency * 2, when);

  const shineEnv = ctx.createGain();
  shineEnv.gain.setValueAtTime(0.0001, when);
  shineEnv.gain.exponentialRampToValueAtTime(gain * 0.2, when + 0.01);
  shineEnv.gain.exponentialRampToValueAtTime(0.0001, when + duration * 0.55);

  shine.connect(shineEnv);
  shineEnv.connect(master);
  shineEnv.connect(reverb);
  shine.start(when);
  shine.stop(when + duration);
}

export function useTechAudio(enabled: boolean, mode: TechSoundMode) {
  const engineRef = useRef<Engine | null>(null);
  const lastPlayed = useRef(0);

  const ensureEngine = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (engineRef.current) {
      if (engineRef.current.ctx.state === "suspended") {
        void engineRef.current.ctx.resume();
      }
      return engineRef.current;
    }

    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioContextConstructor })
        .webkitAudioContext;

    if (!AudioCtor) return null;

    const ctx = new AudioCtor();
    const master = ctx.createGain();
    master.gain.value = 0.8;
    master.connect(ctx.destination);

    const reverb = ctx.createConvolver();
    reverb.buffer = impulseResponse(ctx, 1.6, 3);

    const wet = ctx.createGain();
    wet.gain.value = 0.32;
    reverb.connect(wet);
    wet.connect(master);

    const engine: Engine = {
      ctx,
      master,
      reverb,
      keyboardSprite: null,
      keyboardSpriteLoad: null,
    };
    engineRef.current = engine;

    if (ctx.state === "suspended") void ctx.resume();
    return engine;
  }, []);

  const play = useCallback(
    (index: number, kind: "hover" | "click" = "hover") => {
      if (!enabled) return;

      const now = performance.now();
      if (kind === "hover" && now - lastPlayed.current < 45) return;
      lastPlayed.current = now;

      const engine = ensureEngine();
      if (!engine) return;

      const t = engine.ctx.currentTime + 0.012;

      if (mode === "keyboard") {
        const playSample = (buffer: AudioBuffer | null) => {
          if (buffer && engine.ctx.state !== "closed") keyboardClick(engine, buffer, index, t, kind);
        };
        if (engine.keyboardSprite) playSample(engine.keyboardSprite);
        else void loadKeyboardSprite(engine).then(playSample);
        return;
      }

      const { frequency } = getNote(index);

      if (kind === "click") {
        voice(engine, frequency, t, 0.85, 0.05);
        voice(engine, frequency * 1.4983, t + 0.085, 0.7, 0.042);
        voice(engine, frequency * 2, t + 0.17, 1, 0.036);
      } else {
        voice(engine, frequency, t, 0.55, 0.046);
      }
    },
    [enabled, ensureEngine, mode],
  );

  /* Browsers only allow audio after a gesture, so prime on the first one. */
  useEffect(() => {
    if (!enabled) return;

    const prime = () => {
      const engine = ensureEngine();
      if (mode === "keyboard" && engine) void loadKeyboardSprite(engine);
    };
    window.addEventListener("pointerdown", prime, { passive: true });
    window.addEventListener("keydown", prime);

    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, [enabled, ensureEngine, mode]);

  useEffect(
    () => () => {
      const engine = engineRef.current;
      engineRef.current = null;
      if (engine) void engine.ctx.close();
    },
    [],
  );

  return play;
}
