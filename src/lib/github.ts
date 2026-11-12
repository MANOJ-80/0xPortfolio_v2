import { cacheLife } from "next/cache";
import { site } from "@/data/site";

export type GitHubStats = {
  repos: number;
  followers: number;
};

/** Cached for a day so the hover card can show live numbers cheaply. */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  "use cache";
  cacheLife("days");

  try {
    const res = await fetch(`https://api.github.com/users/${site.github}`, {
      headers: { accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      public_repos?: number;
      followers?: number;
    };

    if (typeof data.public_repos !== "number" || typeof data.followers !== "number") {
      return null;
    }

    return { repos: data.public_repos, followers: data.followers };
  } catch {
    return null;
  }
}
