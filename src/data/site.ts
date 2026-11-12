export const site = {
  name: "Manoj Ganesan",
  handle: "0xEcho",
  role: "Software Engineer",
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
  availability: "Open to full-time roles & freelance work",
  socials: [
    { label: "GitHub", href: "https://github.com/MANOJ-80", icon: "github" as const },
    { label: "X", href: "https://x.com/0xEchoDev", icon: "x" as const },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/manoj-ganesan-2444ab28a/",
      icon: "linkedin" as const,
    },
  ],
};

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
export const homeAbout: { parts: { text: string; strong?: boolean }[] }[] = [
  {
    parts: [
      { text: "I'm a " },
      { text: "software engineer", strong: true },
      {
        text: " focused on secure backends, security tooling, and AI agent infrastructure.",
      },
    ],
  },
  {
    parts: [
      { text: "I build with " },
      { text: "Python, TypeScript, FastAPI and PostgreSQL", strong: true },
      {
        text: ", and I care about the parts of a system that have to hold when the happy path ends.",
      },
    ],
  },
  {
    parts: [
      { text: "Currently a " },
      { text: "final-year CS student", strong: true },
      {
        text: " at PSG Institute of Technology, shipping multi-tenant EDR at Froze Communication and open source under the ",
      },
      { text: "0x", strong: true },
      { text: " prefix." },
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
