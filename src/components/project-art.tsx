import Image from "next/image";
import type { Project } from "@/data/projects";

const tones = {
  paper: {
    background:
      "linear-gradient(150deg, #f4f4ef 0%, #dedfd7 55%, #c3c5bb 100%)",
    foreground: "#15160f",
    muted: "rgba(21,22,15,0.55)",
  },
  ink: {
    background:
      "radial-gradient(120% 120% at 15% 0%, #1d2420 0%, #0b0d0c 55%, #08090a 100%)",
    foreground: "#e8e9e3",
    muted: "rgba(232,233,227,0.45)",
  },
  steel: {
    background:
      "linear-gradient(155deg, #2b3138 0%, #171b1f 60%, #101314 100%)",
    foreground: "#dbe3ea",
    muted: "rgba(219,227,234,0.45)",
  },
  sand: {
    background:
      "linear-gradient(150deg, #efe9d9 0%, #ded4bd 60%, #cdbfa2 100%)",
    foreground: "#221f17",
    muted: "rgba(34,31,23,0.5)",
  },
} as const;

export function ProjectArt({
  project,
  priority = false,
  className = "",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const tone = tones[project.coverTone ?? "ink"];

  if (project.cover) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden ${className}`}
        data-fit={project.coverFit ?? "cover"}
        style={project.coverFit === "contain" ? { background: tone.background } : undefined}
      >
        <Image
          src={project.cover}
          alt={`${project.name} preview`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 420px"
          className={project.coverFit === "contain" ? "object-contain" : "object-cover object-top"}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
      </div>
    );
  }

  const sizeClass =
    project.name.length > 10
      ? "text-[40px] sm:text-[48px]"
      : project.name.length > 8
        ? "text-[56px] sm:text-[68px]"
        : "text-[72px] sm:text-[92px]";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      data-fit="cover"
      style={{ background: tone.background, color: tone.foreground }}
    >
      <div className="absolute inset-0 hatch opacity-[0.22]" />
      <div className="absolute inset-0 dotfield opacity-25" />

      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[9px] uppercase tracking-[0.2em]"
        style={{ color: tone.muted }}
      >
        <span>{project.type}</span>
        <span>{project.year}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-5">
        <span className={`text-center font-serif italic leading-none opacity-95 ${sizeClass}`}>
          {project.name}
        </span>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t p-3 font-mono text-[9px] uppercase tracking-[0.18em]"
        style={{ borderColor: tone.muted, color: tone.muted }}
      >
        <span>{project.status}</span>
        <span>{project.stack[0]}</span>
      </div>
    </div>
  );
}
