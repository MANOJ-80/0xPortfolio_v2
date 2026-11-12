import type { Metadata } from "next";
import Link from "next/link";
import { archive, featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/project-card";
import { ArrowUpRightIcon, ArrowLeftIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work by Manoj Ganesan (0xEcho): AI infrastructure, security tooling, peer-to-peer systems and full-stack products.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeftIcon size={12} className="transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <p className="label mt-8 text-accent">[ALL] // ARTIFACTS</p>
        <h1 className="mt-4 font-serif text-[clamp(3rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.025em]">
          Work<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-[14px] leading-relaxed text-muted">
          Systems I have designed and shipped: budget-enforcing LLM proxies, agent
          memory, EDR infrastructure, security tooling and a few products that
          started as experiments.
        </p>
      </section>

      <section className="bleed py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="bleed py-12 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="flex items-center gap-3">
            <span className="label text-accent">[+]</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
              Archive
            </span>
          </h2>
          <span className="label">60+ repositories on GitHub</span>
        </div>

        <ul className="border-t border-dashed border-line">
          {archive.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-start gap-4 border-b border-dashed border-line py-4 transition-colors hover:bg-bg-soft/50 sm:grid-cols-[180px_1fr_auto]"
              >
                <span className="font-mono text-[13px] text-fg transition-colors group-hover:text-accent">
                  {item.name}
                </span>
                <span className="col-span-2 text-[12px] leading-relaxed text-muted sm:col-span-1">
                  {item.description}
                </span>
                <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  {item.language}
                  <ArrowUpRightIcon
                    size={12}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`https://github.com/${site.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:text-accent"
        >
          Browse every repository on GitHub
          <ArrowUpRightIcon size={12} />
        </a>
      </section>
    </>
  );
}
