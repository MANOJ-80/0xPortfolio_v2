"use client";

import { useEffect, useState } from "react";
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

function ordinal(value: number) {
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

  return `${value.toLocaleString("en-US")}${suffix}`;
}

export function ViewCount({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "visitor";
}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    loadViews().then((value) => {
      if (active) setViews(value);
    });

    return () => {
      active = false;
    };
  }, []);

  if (variant === "visitor") {
    return (
      <span
        className={`visitor-badge ${className ?? ""}`}
        title={views === null ? "Visitor count" : `${views.toLocaleString("en-US")} page views`}
      >
        You are the <span className="tabular-nums">{views === null ? "—" : ordinal(views)}</span> visitor
      </span>
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
