"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * The theme class is applied by the inline script in the root layout before
 * paint, so the correct icon can be selected with CSS instead of state.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
    >
      <SunIcon size={15} className="hidden dark:block" />
      <MoonIcon size={15} className="block dark:hidden" />
    </button>
  );
}
