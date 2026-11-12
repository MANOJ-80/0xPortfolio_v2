import { experience } from "@/data/experience";
import { education } from "@/data/site";
import { PlusIcon } from "./icons";

export function ExperienceList() {
  return (
    <div className="flex flex-col gap-3">
      {experience.map((role) => (
        <details
          key={`${role.org}-${role.period}`}
          className="details group rounded-lg border border-line bg-bg-soft/40 transition-colors open:border-line hover:border-fg/25"
        >
          <summary className="flex items-start justify-between gap-4 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                className={`mt-[7px] size-1.5 shrink-0 rounded-full ${
                  role.current ? "bg-accent" : "bg-muted"
                }`}
              />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-[15px] font-medium tracking-tight text-fg">{role.org}</h3>
                </div>
                <p className="mt-1 text-[13px] text-muted">
                  {role.role} · {role.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {role.period}
              </span>
              <PlusIcon className="plus mt-0.5 text-muted transition-transform duration-300" />
            </div>
          </summary>

          <div className="border-t border-dashed border-line px-4 pb-5 pt-4 sm:px-5">
            <p className="max-w-2xl text-[13px] leading-relaxed text-soft">{role.summary}</p>

            <ul className="mt-4 flex flex-col gap-2.5">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                  <span className="mt-[9px] size-1 shrink-0 rounded-full bg-accent/70" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {role.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-soft"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </details>
      ))}

      <div className="flex items-start justify-between gap-4 rounded-lg border border-dashed border-line p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-line" />
          <div>
            <h3 className="text-[15px] font-medium tracking-tight text-fg">{education.school}</h3>
            <p className="mt-1 text-[13px] text-muted">
              {education.degree} · {education.detail}
            </p>
          </div>
        </div>
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {education.period}
        </span>
      </div>
    </div>
  );
}
