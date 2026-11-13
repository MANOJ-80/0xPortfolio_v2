import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { ExperienceList } from "@/components/experience-list";
import { TechStack } from "@/components/tech-stack";
import { ArrowUpRightIcon } from "@/components/icons";

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
          <p className="label">6 case studies, plus the project archive</p>
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
    </>
  );
}
