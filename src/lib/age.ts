import { cacheLife } from "next/cache";
import { site } from "@/data/site";

/**
 * Whole years between a date of birth (YYYY-MM-DD) and a reference date.
 * Returns null on an unparseable value so the UI can degrade quietly.
 */
export function calculateAge(dob: string, now: Date = new Date()): number | null {
  const birth = new Date(`${dob}T00:00:00Z`);
  if (Number.isNaN(birth.getTime())) return null;

  let age = now.getUTCFullYear() - birth.getUTCFullYear();
  const month = now.getUTCMonth() - birth.getUTCMonth();

  if (month < 0 || (month === 0 && now.getUTCDate() < birth.getUTCDate())) {
    age -= 1;
  }

  return age;
}

/**
 * Cached for a day, so the age flips on the birthday without turning the page
 * into a per-request render.
 */
export async function getCurrentAge(): Promise<number | null> {
  "use cache";
  cacheLife("days");
  return calculateAge(site.dob);
}
