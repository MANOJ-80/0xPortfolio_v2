"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { DownloadIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="header-bar">
      <div className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-[13px] tracking-tight"
          aria-label={`${site.name} — home`}
        >
          <span className="text-accent">0x</span>
          <span className="text-fg">Echo</span>
          <span className="hidden text-muted transition-colors group-hover:text-soft sm:inline">
            ~/
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors sm:px-3",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {active && (
                  <span className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent sm:inset-x-3" />
                )}
                {link.label}
              </Link>
            );
          })}

          <span className="mx-1 hidden h-4 w-px bg-line sm:block" />

          <ThemeToggle />

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-accent hover:text-fg sm:flex"
          >
            <DownloadIcon size={12} />
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
