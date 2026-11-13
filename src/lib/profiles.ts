import { cacheLife } from "next/cache";
import { site } from "@/data/site";
import { socialIcons } from "@/components/icons";

type SocialIcon = keyof typeof socialIcons;

export type ProfileStat = {
  value: number;
  label: string;
  /** Compact the number, e.g. 3000 -> 3K. */
  compact?: boolean;
  /** Verbatim label when the platform itself rounds, e.g. "500+". */
  display?: string;
};

export type SocialProfile = {
  key: string;
  label: string;
  href: string;
  icon: SocialIcon;
  name: string;
  handle: string;
  bio: string;
  location: string;
  avatar: string;
  banner: string;
  stats: ProfileStat[];
};

type GitHubUser = {
  name?: string | null;
  login?: string;
  bio?: string | null;
  avatar_url?: string;
  location?: string | null;
  public_repos?: number;
  followers?: number;
};

type FXUser = {
  name?: string;
  description?: string;
  location?: string;
  followers?: number;
  tweets?: number;
};

const GITHUB_USER = "MANOJ-80";
const X_USER = "0xEchoDev";

async function fetchGitHub(): Promise<Partial<SocialProfile> | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: { accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;

    const user = (await res.json()) as GitHubUser;
    if (typeof user.public_repos !== "number") return null;

    return {
      name: user.name ?? undefined,
      bio: user.bio ?? undefined,
      location: user.location ?? undefined,
      stats: [
        { value: user.public_repos, label: "Repositories" },
        { value: user.followers ?? 0, label: "Followers" },
      ],
    };
  } catch {
    return null;
  }
}

async function fetchX(): Promise<Partial<SocialProfile> | null> {
  try {
    const res = await fetch(`https://api.fxtwitter.com/${X_USER}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { user?: FXUser };
    const user = data.user;
    if (!user || typeof user.followers !== "number") return null;

    return {
      name: user.name,
      bio: user.description,
      location: user.location,
      stats: [
        { value: user.followers, label: "Followers" },
        { value: user.tweets ?? 0, label: "Posts" },
      ],
    };
  } catch {
    return null;
  }
}

/**
 * Live profile data for the social hover cards, merged over the static
 * snapshot in `site.socials`. Cached for a day: the numbers move slowly and
 * this keeps the page static while still being real data.
 */
export async function getSocialProfiles(): Promise<SocialProfile[]> {
  "use cache";
  cacheLife("days");

  const [github, x] = await Promise.all([fetchGitHub(), fetchX()]);
  const live: Record<string, Partial<SocialProfile> | null> = {
    github,
    x,
    linkedin: null,
  };

  return site.socials.map((social) => {
    const extra = live[social.key] ?? {};

    return {
      key: social.key,
      label: social.label,
      href: social.href,
      icon: social.icon,
      name: extra.name || social.name,
      handle: social.handle,
      bio: extra.bio || social.bio,
      location: extra.location || social.location,
      avatar: social.avatar,
      banner: social.banner,
      stats: extra.stats?.length ? extra.stats : social.stats,
    };
  });
}
