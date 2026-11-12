import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectArt } from "@/components/project-art";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <div className="pb-8 pt-10 sm:pt-14">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeftIcon size={12} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="label text-accent">[CASE {String(index + 1).padStart(2, "0")}]</span>
          <span className="label">{project.type}</span>
          <span className="label">·</span>
          <span className="label">{project.year}</span>
          <span className="label">·</span>
          <span className="label text-soft">{project.status}</span>
        </div>

        <h1 className="mt-4 font-serif text-[clamp(2.8rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.025em]">
          {project.name}
        </h1>
        <p className="mt-4 max-w-[46ch] text-[16px] leading-snug text-soft sm:text-[18px]">
          {project.tagline}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-soft transition-colors hover:border-accent hover:text-fg"
            >
              {link.label}
              <ArrowUpRightIcon
                size={12}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="bleed py-8">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-bg-soft sm:aspect-[2/1]">
          <ProjectArt project={project} priority />
        </div>
      </div>

      <dl className="bleed grid grid-cols-2 gap-y-6 py-6 sm:grid-cols-4">
        <div>
          <dt className="label">Role</dt>
          <dd className="mt-2 text-[12px] text-soft">{project.role ?? "Engineering"}</dd>
        </div>
        <div>
          <dt className="label">Year</dt>
          <dd className="mt-2 text-[12px] text-soft">{project.year}</dd>
        </div>
        <div>
          <dt className="label">Status</dt>
          <dd className="mt-2 text-[12px] text-soft">{project.status}</dd>
        </div>
        <div>
          <dt className="label">Stack</dt>
          <dd className="mt-2 text-[12px] leading-relaxed text-soft">
            {project.stack.join(", ")}
          </dd>
        </div>
      </dl>

      <section className="bleed grid gap-6 py-10 sm:grid-cols-[140px_1fr] sm:gap-10">
        <h2 className="label pt-1">Overview</h2>
        <p className="max-w-[62ch] text-[15px] leading-[1.85] text-soft">{project.overview}</p>
      </section>

      <section className="bleed grid gap-6 py-10 sm:grid-cols-[140px_1fr] sm:gap-10">
        <h2 className="label pt-1">The problem</h2>
        <ul className="flex max-w-[62ch] flex-col gap-4">
          {project.problems.map((problem) => (
            <li key={problem} className="flex gap-3 text-[14px] leading-relaxed text-muted">
              <span className="mt-[9px] size-1 shrink-0 rounded-full bg-line" />
              <span>{problem}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bleed grid gap-6 py-10 sm:grid-cols-[140px_1fr] sm:gap-10">
        <h2 className="label pt-1">What I built</h2>
        <ol className="flex max-w-[62ch] flex-col gap-5">
          {project.highlights.map((highlight, i) => (
            <li key={highlight} className="grid grid-cols-[28px_1fr] gap-3">
              <span className="font-mono text-[10px] tracking-[0.1em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[14px] leading-relaxed text-soft">{highlight}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bleed grid gap-6 py-10 sm:grid-cols-[140px_1fr] sm:gap-10">
        <h2 className="label pt-1">Stack</h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-bg-soft/40 px-2.5 py-1 font-mono text-[10px] text-soft"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <nav className="bleed py-10">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-bg-soft/40 p-5 transition-colors hover:border-accent/45"
        >
          <div>
            <p className="label">Next case</p>
            <p className="mt-2 font-serif text-2xl italic tracking-tight text-fg">{next.name}</p>
            <p className="mt-1 text-[12px] text-muted">{next.tagline}</p>
          </div>
          <ArrowRightIcon
            size={20}
            className="shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
          />
        </Link>
      </nav>
    </article>
  );
}
