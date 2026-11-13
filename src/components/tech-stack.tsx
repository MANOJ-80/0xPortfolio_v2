"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { techCategories, techStack, type TechCategory } from "@/data/tech-stack";
import { getNote, useTechAudio, type TechSoundMode } from "@/lib/tech-audio";
import { cn } from "@/lib/cn";
import { TechIcon } from "./tech-icons";
import { VolumeIcon, VolumeOffIcon } from "./icons";

type Filter = "all" | TechCategory;

const SOUND_KEY = "tech-stack-sound";
const SOUND_MODE_KEY = "tech-stack-sound-mode";

/* Small external store so the saved preference can be read during hydration
   without a setState-inside-effect. */
const soundStore = (() => {
  let enabled = true;
  let hydrated = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      if (!hydrated && typeof window !== "undefined") {
        hydrated = true;
        enabled = window.localStorage.getItem(SOUND_KEY) !== "off";
      }
      return enabled;
    },
    getServerSnapshot() {
      return true;
    },
    set(next: boolean) {
      enabled = next;
      hydrated = true;
      window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
      listeners.forEach((listener) => listener());
    },
  };
})();

const soundModeStore = (() => {
  let mode: TechSoundMode = "piano";
  let hydrated = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): TechSoundMode {
      if (!hydrated && typeof window !== "undefined") {
        hydrated = true;
        mode = window.localStorage.getItem(SOUND_MODE_KEY) === "keyboard" ? "keyboard" : "piano";
      }
      return mode;
    },
    getServerSnapshot(): TechSoundMode {
      return "piano";
    },
    set(next: TechSoundMode) {
      mode = next;
      hydrated = true;
      window.localStorage.setItem(SOUND_MODE_KEY, next);
      listeners.forEach((listener) => listener());
    },
  };
})();

function Equalizer() {
  return (
    <span className="tech-eq" aria-hidden>
      <i />
      <i />
      <i />
    </span>
  );
}

export function TechStack({
  heading = "Tech Stack",
  showFilters = true,
  className,
}: {
  heading?: string | null;
  showFilters?: boolean;
  className?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const soundOn = useSyncExternalStore(
    soundStore.subscribe,
    soundStore.getSnapshot,
    soundStore.getServerSnapshot,
  );
  const soundMode = useSyncExternalStore(
    soundModeStore.subscribe,
    soundModeStore.getSnapshot,
    soundModeStore.getServerSnapshot,
  );
  const [hovered, setHovered] = useState<number | null>(null);
  const [flashing, setFlashing] = useState<number | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useTechAudio(soundOn, soundMode);

  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    [],
  );

  const toggleSound = useCallback(() => {
    soundStore.set(!soundStore.getSnapshot());
  }, []);

  const setSoundMode = useCallback((mode: TechSoundMode) => {
    soundModeStore.set(mode);
  }, []);

  const visible = useMemo(
    () =>
      techStack
        .map((tech, index) => ({ tech, index }))
        .filter(({ tech }) => filter === "all" || tech.category === filter),
    [filter],
  );

  const activeIndex = hovered ?? flashing;
  const activeTech = activeIndex === null ? null : techStack[activeIndex];
  const activeSoundLabel =
    activeIndex === null
      ? null
      : soundMode === "piano"
        ? getNote(activeIndex).name
        : "KEY";

  const handleEnter = (index: number) => {
    setHovered(index);
    play(index, "hover");
  };

  const handleLeave = (index: number) => {
    setHovered((current) => (current === index ? null : current));
  };

  const handleClick = (index: number) => {
    play(index, "click");
    setFlashing(index);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashing(null), 340);
  };

  const handleMove = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const hint = (
    <div className="flex items-center gap-2">
      <span className="hidden font-mono text-[9.5px] tracking-[0.14em] text-muted sm:inline">
        ( hover to play )
      </span>
      <span className="font-mono text-[9.5px] tracking-[0.14em] text-muted sm:hidden">
        ( tap to play )
      </span>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute tech stack sounds" : "Enable tech stack sounds"}
        title={soundOn ? "Mute sounds" : "Enable sounds"}
        className={cn(
          "inline-flex size-6 items-center justify-center transition-colors",
          soundOn ? "text-soft hover:text-fg" : "text-muted/60 hover:text-soft",
        )}
      >
        {soundOn ? <VolumeIcon size={12} /> : <VolumeOffIcon size={12} />}
      </button>

      <div
        role="group"
        aria-label="Tech stack sound mode"
        className="inline-flex h-5 items-center rounded border border-line/70 p-0.5 font-mono text-[8px] uppercase tracking-[0.1em]"
      >
        {(["piano", "keyboard"] as const).map((mode) => {
          const active = soundMode === mode;
          const label = mode === "piano" ? "Piano" : "Keyboard";
          return (
            <button
              key={mode}
              type="button"
              aria-pressed={active}
              aria-label={`${label} sound`}
              title={`Use ${label.toLowerCase()} sound`}
              onClick={() => setSoundMode(mode)}
              className={cn(
                "h-full rounded-[2px] px-1.5 transition-colors",
                active ? "bg-fg/10 text-fg" : "text-muted hover:text-soft",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <span
        className={cn(
          "inline-flex h-4 w-[58px] items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] transition-opacity duration-200",
          activeSoundLabel ? "opacity-100" : "opacity-0",
        )}
        style={{ color: activeTech?.color }}
        aria-hidden
      >
        {activeSoundLabel ? (
          <>
            <Equalizer />
            <span>{activeSoundLabel}</span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </span>
    </div>
  );

  const filters = showFilters ? (
    <div
      role="group"
      aria-label="Filter technologies"
      className="no-scrollbar -mb-1 flex max-w-full items-center gap-1 overflow-x-auto pb-1 sm:mb-0 sm:flex-wrap sm:gap-0.5 sm:overflow-visible sm:pb-0"
    >
      {techCategories.map((category) => {
        const active = filter === category.id;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={active}
            onClick={() => setFilter(category.id)}
            className={cn(
              "relative shrink-0 px-2 py-1.5 font-mono text-[10.5px] tracking-[0.02em] transition-colors sm:px-2.5",
              active ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {category.label}
            {active && (
              <span className="absolute inset-x-2 -bottom-0.5 h-px bg-fg sm:inset-x-2.5" />
            )}
          </button>
        );
      })}
    </div>
  ) : null;

  const chips = (
    <div className="relative overflow-hidden border-y border-dashed border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="v-rule absolute inset-y-0 left-1/4" />
        <span className="v-rule absolute inset-y-0 left-1/2" />
        <span className="v-rule absolute inset-y-0 left-3/4" />
      </div>

      <div key={filter} className="relative flex flex-wrap gap-2 py-4 sm:py-5">
        {visible.map(({ tech, index }, order) => (
          <button
            key={tech.name}
            type="button"
            className="tech-chip"
            style={
              {
                "--tech": tech.color,
                animationDelay: `${Math.min(order * 14, 220)}ms`,
              } as CSSProperties
            }
            data-active={hovered === index || flashing === index}
            onPointerEnter={() => handleEnter(index)}
            onPointerLeave={() => handleLeave(index)}
            onPointerMove={handleMove}
            onFocus={() => handleEnter(index)}
            onBlur={() => handleLeave(index)}
            onClick={() => handleClick(index)}
            aria-label={`${tech.name} — ${soundMode === "piano" ? `play note ${getNote(index).name}` : "play mechanical keyboard sound"}`}
          >
            <TechIcon name={tech.icon} size={13} className="tech-chip-icon" />
            <span>{tech.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const body = (
    <>
      {heading !== null ? (
        <div className="mb-5 border-t border-dashed border-line pt-8 sm:mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
                {heading}
              </h2>
              {hint}
            </div>
            {filters}
          </div>
        </div>
      ) : (
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {hint}
          {filters}
        </div>
      )}

      {chips}
    </>
  );

  if (heading === null) {
    return <div className={className}>{body}</div>;
  }

  return (
    <section id="tech-stack" className={cn("bleed py-12 sm:py-16", className)}>
      {body}
    </section>
  );
}
