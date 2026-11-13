import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon } from "./icons";
import { ProjectArt } from "./project-art";

export function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-bg-soft/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-bg-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <div className="size-full grayscale transition-[filter,transform] duration-[700ms] ease-out group-hover:scale-[1.035] group-hover:grayscale-0">
          <ProjectArt project={project} priority={priority} />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="m-3 inline-flex translate-y-1.5 items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0">
            View case study
            <ArrowUpRightIcon size={11} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-[15px] tracking-tight text-fg">{project.name}</h3>
          <ArrowUpRightIcon
            size={15}
            className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-soft"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
