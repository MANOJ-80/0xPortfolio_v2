import Link from "next/link";
import { site } from "@/data/site";
import { LocalClock } from "./local-clock";
import { socialIcons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bleed py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] text-soft">
            © {site.year} {site.name}
          </p>
          <p className="label">
            {site.location.split(",")[0]} ·{" "}
            <LocalClock timeZone={site.timeZone} /> IST
          </p>
        </div>

        <div className="flex items-center gap-4">
          {site.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon size={15} />
              </Link>
            );
          })}
          <span className="label hidden sm:inline">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
