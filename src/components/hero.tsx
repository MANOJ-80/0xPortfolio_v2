import Image from "next/image";
import Link from "next/link";
import { homeAbout, homeTagline, site } from "@/data/site";
import { Contributions } from "./contributions";
import { HeroBanner } from "./hero-banner";
import { ArrowUpRightIcon, MailIcon, socialIcons } from "./icons";
import { RoleRotator } from "./role-rotator";
import { ViewCount } from "./view-count";

export function Hero() {
  return (
    <section className="pb-12">
      <HeroBanner />

      <div className="rise mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-bg-soft sm:size-24">
            <Image
              src="/profile.webp"
              alt={site.name}
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 pt-1">
            <h1 className="font-serif text-[clamp(2rem,4.8vw,2.9rem)] leading-[1.02] tracking-[-0.025em]">
              Manoj Ganesan
            </h1>
            <RoleRotator roles={site.roles} className="mt-2.5" />
            <p className="mt-2.5 text-[11px] leading-none text-muted">
              {site.location}
            </p>
          </div>
        </div>

        <ViewCount className="self-end sm:self-start sm:pt-1.5" />
      </div>

      <div
        className="rise mt-10 border-t border-dashed border-line pt-8"
        style={{ animationDelay: "120ms" }}
      >
        <h2 className="font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
          About
        </h2>

        <p className="mt-4 text-[15px] leading-[1.75] text-soft">{homeTagline}</p>

        <ul className="mt-5 flex max-w-[68ch] flex-col gap-3.5">
          {homeAbout.map((point, i) => (
            <li key={i} className="flex gap-3 text-[14.5px] leading-[1.75] text-soft">
              <span className="mt-[10px] size-[3px] shrink-0 rounded-full bg-accent/80" />
              <span>
                {point.parts.map((part, j) =>
                  part.strong ? (
                    <strong key={j} className="font-medium text-fg">
                      {part.text}
                    </strong>
                  ) : (
                    <span key={j}>{part.text}</span>
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rise mt-7 flex flex-wrap items-center gap-2"
        style={{ animationDelay: "180ms" }}
      >
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 rounded-md bg-accent-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          Selected work
          <ArrowUpRightIcon size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-accent/45 hover:text-fg"
        >
          <MailIcon size={13} />
          Send an email
        </a>
      </div>

      <div className="rise mt-8" style={{ animationDelay: "240ms" }}>
        <p className="text-[13px] text-muted">
          Here are my <span className="font-medium text-fg">socials</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {site.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-2 text-[12px] text-soft transition-colors hover:border-accent/45 hover:text-fg"
              >
                <Icon size={14} className="text-muted transition-colors group-hover:text-accent" />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="rise mt-10 border-t border-dashed border-line pt-6" style={{ animationDelay: "300ms" }}>
        <Contributions />
      </div>
    </section>
  );
}
