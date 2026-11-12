import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, certifications, education, openSource, site } from "@/data/site";
import { stack } from "@/data/projects";
import { ExperienceList } from "@/components/experience-list";
import { ArrowUpRightIcon, socialIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Manoj Ganesan (0xEcho) — software engineer working on backend systems, security tooling and AI agent infrastructure.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <p className="label text-accent">[ABOUT] // IDENTITY</p>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-line">
            <Image
              src="/profile.webp"
              alt={site.name}
              fill
              priority
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif text-[clamp(2.4rem,7vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
              Manoj Ganesan
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              ~/0xecho · software engineer
            </p>
          </div>
        </div>

        <div className="mt-8 flex max-w-[64ch] flex-col gap-4">
          {about.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[14px] leading-[1.85] text-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bleed py-10">
        <blockquote className="max-w-[56ch] border-l border-accent/60 pl-5">
          <p className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] italic leading-[1.4] text-fg">
            “{about.philosophy}”
          </p>
        </blockquote>
      </section>

      <section className="bleed py-12">
        <h2 className="mb-6 flex items-center gap-3">
          <span className="label text-accent">[01]</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
            Experience & education
          </span>
        </h2>
        <ExperienceList />
      </section>

      <section className="bleed py-12">
        <h2 className="mb-6 flex items-center gap-3">
          <span className="label text-accent">[02]</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
            Toolkit
          </span>
        </h2>
        <div className="divide-y divide-dashed divide-line border-y border-dashed border-line">
          {stack.map((group) => (
            <div key={group.group} className="grid gap-3 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
              <p className="label pt-1.5">{group.group}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-bg-soft/40 px-2.5 py-1 font-mono text-[10px] text-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bleed py-12">
        <h2 className="mb-6 flex items-center gap-3">
          <span className="label text-accent">[03]</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
            Open source & certificates
          </span>
        </h2>

        <div className="flex flex-col gap-3">
          {openSource.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 rounded-lg border border-line bg-bg-soft/40 p-5 transition-colors hover:border-accent/45 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-[13px] text-fg">{item.title}</h3>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-2 max-w-[60ch] text-[13px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
              <ArrowUpRightIcon
                size={15}
                className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          ))}

          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg border border-dashed border-line p-5 transition-colors hover:border-fg/25"
            >
              <div>
                <h3 className="font-mono text-[13px] text-fg">{cert.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {cert.issuer}
                </p>
              </div>
              <ArrowUpRightIcon
                size={15}
                className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="bleed py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">Currently</p>
            <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-soft">
              {education.period} · {education.degree} at {education.school}. Open to
              full-time engineering roles and freelance work.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink"
            >
              Get in touch
              <ArrowUpRightIcon size={12} />
            </a>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-fg/40 hover:text-fg"
            >
              View work
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-line pt-5">
          {site.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-fg"
              >
                <Icon size={13} />
                {social.label}
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
