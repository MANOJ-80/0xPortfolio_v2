import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Contributions } from "./contributions";
import { CopyEmail } from "./copy-email";
import { ArrowUpRightIcon, DownloadIcon, socialIcons } from "./icons";
import { LocalClock } from "./local-clock";

export function Hero() {
  return (
    <section className="pb-12 pt-10 sm:pb-14 sm:pt-14">
      <div className="rise flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line bg-bg-soft">
          <Image
            src="/profile.webp"
            alt={site.name}
            fill
            priority
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="label text-soft">{site.availability}</span>
          </div>
          <p className="label">
            {site.location} · <LocalClock timeZone={site.timeZone} /> IST
          </p>
        </div>
      </div>

      <h1
        className="rise mt-9 font-serif text-[clamp(3.1rem,9.5vw,5.5rem)] leading-[0.92] tracking-[-0.025em]"
        style={{ animationDelay: "60ms" }}
      >
        Manoj <span className="italic">Ganesan</span>
        <span className="text-accent">.</span>
      </h1>

      <div
        className="rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
        style={{ animationDelay: "120ms" }}
      >
        <span className="text-accent">~/0xecho</span>
        <span className="hidden h-px w-8 bg-line sm:block" />
        <span>Software Engineer</span>
      </div>

      <p
        className="rise mt-7 max-w-[56ch] text-[15px] leading-[1.8] text-soft"
        style={{ animationDelay: "180ms" }}
      >
        I build secure backends, AI agent infrastructure and developer tools — the
        kind of software that keeps working when the happy path ends. Final-year CS
        student, most recently shipping multi-tenant EDR at Froze Communication.
      </p>

      <div
        className="rise mt-8 flex flex-wrap items-center gap-2.5"
        style={{ animationDelay: "240ms" }}
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
        style={{ animationDelay: "300ms" }}
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

      <div className="rise mt-10 border-t border-dashed border-line pt-6" style={{ animationDelay: "360ms" }}>
        <Contributions />
      </div>
    </section>
  );
}
