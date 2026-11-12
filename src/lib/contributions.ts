import { cacheLife } from "next/cache";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionData = {
  total: number;
  days: ContributionDay[];
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

/**
 * GitHub's contribution graph is not exposed over REST, so we read it through
 * a public contributions proxy and cache the result for a day.
 */
export async function getContributions(): Promise<ContributionData | null> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/MANOJ-80?y=last",
      { headers: { accept: "application/json" } },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as ApiResponse;
    return {
      total: data.total.lastYear ?? 0,
      days: data.contributions,
    };
  } catch {
    return null;
  }
}

export type Week = (ContributionDay | null)[];

const DAY = 86_400_000;

export function buildWeeks(days: ContributionDay[]) {
  if (days.length === 0) return { weeks: [] as Week[], labels: [] as { col: number; label: string }[] };

  const weeks: Week[] = [];
  let week: Week = [];

  // Pad the first column so rows run Sunday -> Saturday.
  const firstDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDay; i += 1) week.push(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const labels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((column, col) => {
    const day = column.find(Boolean);
    if (!day) return;
    const date = new Date(`${day.date}T00:00:00Z`);
    const month = date.getUTCMonth();
    if (month !== lastMonth) {
      if (labels.length === 0 || col - labels[labels.length - 1].col >= 3) {
        labels.push({
          col,
          label: date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
        });
      }
      lastMonth = month;
    }
  });

  return { weeks, labels };
}

export function formatRange(days: ContributionDay[]) {
  if (days.length === 0) return "";
  const start = new Date(`${days[0].date}T00:00:00Z`);
  const end = new Date(`${days[days.length - 1].date}T00:00:00Z`);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  return `${fmt(start)} — ${fmt(end)}`;
}

export const DAY_MS = DAY;
