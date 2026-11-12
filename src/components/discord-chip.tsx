"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { discord } from "@/data/site";
import { DiscordIcon } from "./icons";

/**
 * Discord has no public profile lookup, so the chip copies the username instead
 * of pretending to link somewhere. The card mirrors the Discord profile popout:
 * avatar with presence dot, name and handle, a status quote, then presence.
 */
export function DiscordChip() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function handleClick() {
    if (discord.href) {
      window.open(discord.href, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      await navigator.clipboard.writeText(discord.handle);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group/social relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          copied
            ? "Discord username copied"
            : `Copy Discord username ${discord.handle}`
        }
        className="group inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-2 text-[12px] text-soft transition-colors hover:border-accent/45 hover:text-fg"
      >
        <DiscordIcon
          size={14}
          className="text-muted transition-colors group-hover:text-accent"
        />
        {copied ? "Copied" : "Discord"}
      </button>

      <div
        className="pointer-events-none invisible absolute right-0 top-full z-40 hidden pt-2 opacity-0 transition-opacity duration-200 group-hover/social:visible group-hover/social:opacity-100 group-focus-within/social:visible group-focus-within/social:opacity-100 sm:block"
        aria-hidden
      >
        <div className="w-[300px] translate-y-1 rounded-xl border border-line bg-bg-elev p-4 shadow-[0_32px_70px_-28px_rgba(0,0,0,0.95)] transition-transform duration-200 group-hover/social:translate-y-0 group-focus-within/social:translate-y-0">
          <div className="flex items-start gap-3">
            <div className="relative size-11 shrink-0 rounded-full bg-bg-soft">
              <Image
                src={discord.avatar}
                alt=""
                fill
                sizes="44px"
                className="rounded-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 size-[13px] rounded-full border-[3px] border-bg-elev bg-[#23a55a]" />
            </div>

            <div className="min-w-0 pt-0.5">
              <p className="truncate text-[14px] font-medium leading-tight text-fg">
                {discord.name}
              </p>
              <p className="mt-1 truncate text-[11.5px] leading-none text-muted">
                {discord.handle}
              </p>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-soft">
            {discord.quote}
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="flex items-center gap-2 text-[11.5px] leading-none text-soft">
              <span className="size-2 shrink-0 rounded-full bg-[#23a55a]" />
              {discord.status}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Active status
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
