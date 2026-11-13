import { buildWeeks, getContributions } from "@/lib/contributions";
import { site } from "@/data/site";

const levelClass = [
  "bg-line",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
] as const;

export async function Contributions() {
  const data = await getContributions();

  if (!data || data.days.length === 0) {
    return (
      <div className="flex items-center justify-between border border-dashed border-line px-4 py-5">
        <p className="label">Contribution graph unavailable right now</p>
        <a
          href={`https://github.com/${site.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="label text-accent"
        >
          GitHub ↗
        </a>
      </div>
    );
  }

  const { weeks, labels } = buildWeeks(data.days);

  return (
    <div>
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="sm:min-w-0">
          <div
            className="mb-1.5 hidden gap-[3px] font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:grid"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
            aria-hidden
          >
            {labels.map((label) => (
              <span
                key={`${label.col}-${label.label}`}
                style={{ gridColumn: label.col + 1 }}
                className="col-span-2 whitespace-nowrap"
              >
                {label.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className={`flex-1 flex-col gap-[3px] ${
                  weekIndex < weeks.length - 26 ? "hidden sm:flex" : "flex"
                }`}
              >
                {week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className={`aspect-square w-full rounded-[2px] ${levelClass[day.level]}`}
                    />
                  ) : (
                    <span key={`empty-${dayIndex}`} className="aspect-square w-full" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-4">
        <p className="text-[12.5px] text-soft">
          <span className="text-fg">{data.total.toLocaleString("en-US")}</span>{" "}
          contributions <span className="text-muted">in the last year</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="label">Less</span>
          <div className="flex gap-[3px]">
            {levelClass.map((cls, i) => (
              <span key={i} className={`size-2.5 rounded-[2px] ${cls}`} />
            ))}
          </div>
          <span className="label">More</span>
        </div>
      </div>
    </div>
  );
}
