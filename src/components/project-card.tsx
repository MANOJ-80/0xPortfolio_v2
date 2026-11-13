import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { ProjectArt } from "./project-art";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const liveLink = project.links.find((link) => link.label === "Live");
  const githubLink = project.links.find((link) => link.label === "GitHub");

  return (
    <article className="project-card group">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.name} case study`}
        className="project-card-art block"
      >
        <ProjectArt project={project} priority={priority} />
        <span className="project-card-view">
          View project <ArrowUpRightIcon size={12} />
        </span>
      </Link>

      <div className="project-card-content">
        <div className="flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate text-[17px] font-semibold tracking-tight text-fg">
            <Link href={`/work/${project.slug}`} className="project-card-title">
              {project.name}
            </Link>
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-muted">
            <span className={`project-status-dot ${liveLink ? "is-live" : ""}`} />
            {liveLink ? "Live" : project.status}
          </span>
        </div>

        <p className="mt-0.5 text-[12px] text-muted">{project.tagline}</p>
        <p className="mt-3 text-[13px] leading-[1.55] text-soft">{project.summary}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <ul className="flex min-w-0 flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech} className="project-tag">{tech}</li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-3 pl-1">
            {liveLink && (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live website`}
                title="Live website"
                className="project-icon-link"
              >
                <GlobeIcon className="size-[17px]" />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                title="GitHub repository"
                className="project-icon-link"
              >
                <GitHubIcon size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
