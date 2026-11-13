"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

const moreLinks = [
  { href: "/blogs", label: "Blogs" },
  { href: "/favourites", label: "Favourites" },
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

          <details className="group relative">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-1 rounded-full px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors [&::-webkit-details-marker]:hidden sm:px-3",
                pathname.startsWith("/blogs") || pathname.startsWith("/favourites")
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              More
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className="size-3 transition-transform group-open:rotate-180"
                fill="none"
              >
                <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-1.5 hidden min-w-36 flex-col rounded-xl border border-line bg-bg-elev p-1.5 shadow-[var(--shadow)] group-open:flex">
              {moreLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => {
                      event.currentTarget.closest("details")?.removeAttribute("open");
                    }}
                    className={cn(
                      "rounded-lg px-3 py-2.5 font-mono text-[10px] tracking-[0.08em] transition-colors hover:bg-bg-soft hover:text-fg",
                      active ? "text-fg" : "text-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </details>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
