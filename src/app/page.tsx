import Link from "next/link";
import { site } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { ExperienceList } from "@/components/experience-list";
import { CopyEmail } from "@/components/copy-email";
import { TechStack } from "@/components/tech-stack";
import { ArrowUpRightIcon, socialIcons } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        title="Projects"
        aside={
          <Link href="/work" className="transition-colors hover:text-accent">
            All projects ↗
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">2 more case studies in the archive</p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:text-accent"
          >
            Open the archive
            <ArrowUpRightIcon
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Section>

      <Section title="Experience" aside="2023 — 2027">
        <ExperienceList />
      </Section>

      <TechStack />

      <Section title="Contact" aside={site.availability}>
        <div className="flex flex-col gap-8">
          <h2 className="max-w-[18ch] font-serif text-[clamp(2.4rem,7vw,4.25rem)] leading-[0.98] tracking-[-0.02em]">
            Let&apos;s build <span className="italic">something</span>
            <span className="text-accent">.</span>
          </h2>

          <p className="max-w-[52ch] text-[14px] leading-relaxed text-muted">
            If you are hiring, need a system built, or want to compare notes on
            backend architecture — the inbox is open. I read everything and usually
            reply within a day.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="link group inline-flex w-fit items-center gap-2 font-mono text-[14px] tracking-tight text-fg sm:text-[17px]"
            >
              {site.email}
              <ArrowUpRightIcon
                size={15}
                className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <div className="flex items-center gap-2">
              <CopyEmail
                email={site.email}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-fg/40 hover:text-fg"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-line pt-5">
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
            <span className="label ml-auto hidden sm:inline">
              Replies usually within a day
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
