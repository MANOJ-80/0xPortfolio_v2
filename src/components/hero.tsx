import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Contributions } from "./contributions";
import { CopyEmail } from "./copy-email";
import { HeroBanner } from "./hero-banner";
import { ArrowUpRightIcon, DownloadIcon, socialIcons } from "./icons";
import { LocalClock } from "./local-clock";

export function Hero() {
  return (
    <section className="pb-12">
      <HeroBanner />

      <div className="rise relative z-10 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="-mt-10 size-[84px] shrink-0 overflow-hidden rounded-xl border-[3px] border-bg bg-bg-soft shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] sm:-mt-12 sm:size-24">
            <Image
              src="/profile.webp"
              alt={site.name}
              width={192}
              height={192}
              priority
              className="size-full object-cover"
            />
          </div>

          <div className="pt-4 sm:pt-5">
            <h1 className="font-serif text-[clamp(1.9rem,4.8vw,2.75rem)] leading-none tracking-[-0.02em]">
              Manoj Ganesan
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">~/0xecho</span>
              <span className="hidden h-px w-4 bg-line sm:block" />
              <span>Software Engineer</span>
            </p>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-1.5 pb-1 sm:flex">
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="label text-soft">Open to work</span>
          </span>
          <span className="label">
            {site.location} · <LocalClock timeZone={site.timeZone} /> IST
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5 sm:hidden">
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="label text-soft">Open to work</span>
        </span>
        <span className="label pl-4">
          {site.location} · <LocalClock timeZone={site.timeZone} /> IST
        </span>
      </div>

      <p
        className="rise mt-7 max-w-[56ch] text-[15px] leading-[1.8] text-soft"
        style={{ animationDelay: "120ms" }}
      >
        I build secure backends, AI agent infrastructure and developer tools — the
        kind of software that keeps working when the happy path ends. Final-year CS
        student, most recently shipping multi-tenant EDR at Froze Communication.
      </p>

      <div
        className="rise mt-8 flex flex-wrap items-center gap-2.5"
        style={{ animationDelay: "180ms" }}
      >
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 rounded-full bg-accent-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          Selected work
          <ArrowUpRightIcon size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-fg/40 hover:text-fg"
        >
          <DownloadIcon size={13} />
          Resume
        </a>

        <CopyEmail
          email={site.email}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-fg/40 hover:text-fg"
        />

        <a
          href={`mailto:${site.email}`}
          aria-label="Send an email"
          className="hidden size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg sm:grid"
        >
          <ArrowUpRightIcon size={14} />
        </a>
      </div>

      <div
        className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
        style={{ animationDelay: "240ms" }}
      >
        {site.socials.map((social) => {
          const Icon = socialIcons[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
            >
              <Icon size={13} className="text-soft group-hover:text-accent" />
              {social.label}
            </a>
          );
        })}
      </div>

      <div className="rise mt-10 border-t border-dashed border-line pt-6" style={{ animationDelay: "300ms" }}>
        <Contributions />
      </div>
    </section>
  );
}
