export const site = {
  name: "Manoj Ganesan",
  handle: "0xEcho",
  role: "Software Engineer",
  roles: [
    "Indie hacker",
    "Security researcher",
    "Software engineer",
    "Full stack engineer",
  ],
  headline: "Backend systems, security tooling, AI agents.",
  description:
    "Manoj Ganesan (0xEcho) is a software engineer from India building secure backends, AI agent infrastructure and developer tools.",
  url: "https://manojganesan.dev",
  email: "manojofficial.018@gmail.com",
  location: "Coimbatore, India",
  timeZone: "Asia/Kolkata",
  github: "MANOJ-80",
  resume: "/resume.pdf",
  year: 2026,
  dob: "2005-10-27",
  availability: "Open to full-time roles & freelance work",
  socials: [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/MANOJ-80",
      icon: "github" as const,
      name: "0xEcho",
      handle: "@MANOJ-80",
      bio: "(0xEcho㉿github) ~ $ whoami",
      location: "Coimbatore, India",
      avatar: "/social/github-avatar.webp",
      banner: "/banner-poster.webp",
      showAge: false,
      stats: [
        { value: 66, label: "Repositories" },
        { value: 28, label: "Followers" },
      ],
    },
    {
      key: "x",
      label: "X",
      href: "https://x.com/0xEchoDev",
      icon: "x" as const,
      name: "0xEcho",
      handle: "@0xEchoDev",
      bio: "Love to learn/build something",
      location: "127.0.0.1",
      avatar: "/social/x-avatar.webp",
      banner: "/banner-poster.webp",
      showAge: true,
      stats: [
        { value: 12, label: "Followers" },
        { value: 163, label: "Posts" },
      ],
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/manoj-ganesan-2444ab28a/",
      icon: "linkedin" as const,
      name: "Manoj Ganesan",
      handle: "@in/manoj-ganesan-2444ab28a",
      bio: "Software Engineer | Full Stack Developer | 0xEcho | Final Year @ PSG iTech",
      location: "Coimbatore, India",
      avatar: "/social/linkedin-avatar.webp",
      banner: "/banner-poster.webp",
      showAge: false,
      stats: [
        { value: 3000, label: "Followers", compact: true },
        { value: 500, label: "Connections", display: "500+" },
      ],
    },
    {
      key: "gmail",
      label: "Gmail",
      href: "mailto:manojofficial.018@gmail.com",
      icon: "mail" as const,
      name: "Manoj Ganesan",
      handle: "manojofficial.018@gmail.com",
      bio: "Open to full-time roles & freelance work",
      location: "Coimbatore, India",
      avatar: "/profile.webp",
      banner: "/banner-poster.webp",
      showAge: false,
      stats: [],
    },
    {
      key: "resume",
      label: "Resume",
      href: "/resume.pdf",
      icon: "file" as const,
      name: "Manoj Ganesan",
      handle: "resume.pdf",
      bio: "Backend systems, security tooling, AI agents.",
      location: "Coimbatore, India",
      avatar: "/profile.webp",
      banner: "/social/resume-banner.webp",
      showAge: false,
      stats: [
        { value: 1, label: "Page" },
        { value: 0, label: "File", display: "PDF" },
      ],
    },
  ],
};

/**
 * Discord has no public profile API and profile URLs are keyed by the numeric
 * user ID, not the username. Drop the ID in below and the chip becomes a real
 * link to https://discord.com/users/<id>; until then clicking copies the handle.
 */
export const discord = {
  name: "0xEcho",
  handle: "0xechodev",
  id: null as string | null,
  avatar: "/social/github-avatar.webp",
  status: "Online",
  quote: "Break it to understand it, then build it to last.",
};

export const discordProfileUrl = discord.id
  ? `https://discord.com/users/${discord.id}`
  : null;

export const about = {
  intro: [
    "I'm a final-year Computer Science & Business Systems student at PSG Institute of Technology and Applied Research, Coimbatore. I build backend systems, security tooling, and AI agent infrastructure — the kind of software that has to keep working when the happy path ends.",
    "Most recently I built a multi-tenant endpoint detection and response platform at Froze Communication: Windows event collection, brute-force detection, threat intelligence enrichment, and automated firewall response across organizations.",
    "Outside of work I ship open source under the 0x prefix. 0xMemory gives coding agents persistent, project-scoped memory. 0xNexigent puts hard budget limits in front of LLM calls. I also contribute to OWASP cve-lite, a dependency vulnerability scanner.",
  ],
  philosophy:
    "I treat engineering the way I treat most things: as a series of experiments. Some work, some don't, all of them teach. What I care about is building with intent, understanding the system beneath the abstraction, and turning rough ideas into software that holds up.",
};

/** Short, scannable intro used under the hero identity block. */
export const homeTagline =
  "Engineer / builder. I like making systems that hold up when the happy path ends.";

export const homeAbout: { parts: { text: string; strong?: boolean }[] }[] = [
  {
    parts: [
      {
        text: "AI agents, open source, and security tooling are what I spend most of my time on.",
      },
    ],
  },
  {
    parts: [
      {
        text: "I think the interesting part of engineering starts after the happy path, so I build for failure first.",
      },
    ],
  },
  {
    parts: [
      { text: "Currently building " },
      { text: "0xNexigent", strong: true },
      { text: ", " },
      { text: "0xMemory", strong: true },
      { text: ", and multi-tenant EDR at Froze Communication." },
    ],
  },
];

export const education = {
  school: "PSG Institute of Technology and Applied Research",
  place: "Coimbatore, India",
  degree: "B.Tech — Computer Science & Business Systems",
  period: "2023 — 2027",
  detail: "CGPA 8.20 / 10",
};

export const certifications = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    href: "https://www.coursera.org/professional-certificates/google-cybersecurity",
  },
];

export const openSource = [
  {
    title: "OWASP cve-lite-cli",
    href: "https://github.com/OWASP/cve-lite-cli",
    description:
      "Improved static dependency analysis accuracy in the OWASP dependency scanner, with scanner enhancements and automated regression tests.",
    tag: "OWASP Lab Project",
  },
];
