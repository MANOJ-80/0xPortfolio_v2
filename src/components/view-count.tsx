"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";
import { EyeIcon } from "./icons";

/**
 * Lightweight page-view counter.
 *
 * Abacus is a free, keyless hit counter. The request is deduped at module
 * scope so a single page load only registers one view even if the component
 * mounts twice in development.
 */
const ENDPOINT = "https://abacus.jasoncameron.dev/hit/manojganesan-dev/home";

let pending: Promise<number | null> | null = null;

function loadViews() {
  if (!pending) {
    pending = fetch(ENDPOINT, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { value?: number } | null) =>
        typeof data?.value === "number" ? data.value : null,
      )
      .catch(() => null);
  }
  return pending;
}

function ordinalParts(value: number) {
  const remainder = value % 100;
  const suffix =
    remainder >= 11 && remainder <= 13
      ? "th"
      : value % 10 === 1
        ? "st"
        : value % 10 === 2
          ? "nd"
          : value % 10 === 3
            ? "rd"
            : "th";

  return { number: value.toLocaleString("en-US"), suffix };
}

function ordinal(value: number) {
  const { number, suffix } = ordinalParts(value);
  return `${number}${suffix}`;
}

export function ViewCount({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "visitor";
}) {
  const [views, setViews] = useState<number | null>(null);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let active = true;

    loadViews().then((value) => {
      if (active) setViews(value);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  const visitorOrdinal = views === null ? null : ordinalParts(views);

  if (variant === "visitor") {
    return (
      <div className={`visitor-badge-wrap ${className ?? ""}`}>
        <button
          type="button"
          className="visitor-badge"
          aria-live="polite"
          aria-label={`${views === null ? "Visitor count" : `You are the ${ordinal(views)} visitor`}. Play click sound`}
          onClick={() => {
            const audio = clickAudio.current;
            if (!audio) return;
            audio.volume = 0.5;
            audio.currentTime = 0;
            void audio.play().catch(() => {});
          }}
        >
          <div className="visitor-badge-frame">
            <div className="visitor-badge-metal" aria-hidden="true">
              {webglAvailable && (
                <LiquidMetal
                  width="100%"
                  height="100%"
                  colorBack="#6b5828"
                  colorTint="#ffd700"
                  speed={0.3}
                  repetition={4}
                  distortion={0.2}
                  softness={0}
                  shiftRed={0.3}
                  shiftBlue={-0.3}
                  angle={45}
                  shape="none"
                  scale={1}
                  fit="cover"
                />
              )}
            </div>
            <div className="visitor-badge-interior">
              <span className="visitor-badge-shine" aria-hidden="true" />
              <span className="visitor-badge-label">
                You are the <span className="tabular-nums">{visitorOrdinal?.number ?? "—"}</span>
                {visitorOrdinal && <>{"\u2009"}<span>{visitorOrdinal.suffix}</span></>} visitor
              </span>
            </div>
          </div>
        </button>
        <audio
          ref={clickAudio}
          src="/sounds/cd-metal-click.mp3"
          preload="auto"
          aria-hidden="true"
          className="hidden"
        />
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted ${className ?? ""}`}
      title={views === null ? "Page views" : `${views.toLocaleString("en-US")} page views`}
    >
      <EyeIcon size={13} className="text-muted" />
      <span className="tabular-nums">
        {views === null ? "—" : views.toLocaleString("en-US")}
      </span>
    </span>
  );
}
