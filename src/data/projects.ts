export type Project = {
  slug: string;
  name: string;
  type: string;
  tagline: string;
  year: string;
  status: "Live" | "Open source" | "Private" | "Archived";
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
  cover?: string;
  coverTone?: "lime" | "ink" | "steel" | "sand";
  featured?: boolean;
  overview: string;
  problems: string[];
  highlights: string[];
  role?: string;
};

export const projects: Project[] = [
  {
    slug: "0xnexigent",
    name: "0xNexigent",
    type: "AI infrastructure",
    tagline: "Budget governance in front of every LLM call.",
    year: "2026",
    status: "Live",
    summary:
      "An intercepting LLM proxy that enforces multi-tier budget holds before a request reaches the provider, then reconciles real token usage after it returns.",
    stack: ["TypeScript", "Redis", "PostgreSQL", "AWS S3", "React"],
    links: [
      { label: "Live", href: "https://nexigent-tau.vercel.app" },
      { label: "GitHub", href: "https://github.com/MANOJ-80/0xNexigent" },
    ],
    cover: "/work/0xnexigent.webp",
    coverTone: "ink",
    featured: true,
    overview:
      "An enterprise-grade LLM proxy gateway and active FinOps control plane. 0xNexigent sits between an agent fleet and upstream providers such as Groq or OpenAI, so a runaway loop can never turn into an unbounded bill.",
    problems: [
      "Agent fleets can retry, loop, and fan out — one misconfigured prompt can spend a month of budget in minutes.",
      "Post-hoc cost reporting tells you what you already spent. It cannot stop the request that spends it.",
      "Long prompt and response payloads bloat the transactional database and make audits slow.",
    ],
    highlights: [
      "Pre-flight budget reservation across Teams, Agents and Sessions using atomic Redis Lua holds, reconciled to the microdollar after execution.",
      "Sliding-window runaway circuit breakers that detect and reroute a spiking agent before it drains its tier.",
      "AWS S3 audit offloading for large prompt/response payloads, enabling six-step request timeline replay without weighing down PostgreSQL.",
    ],
    role: "Design & implementation",
  },
  {
    slug: "0xmemory",
    name: "0xMemory",
    type: "AI developer tools",
    tagline: "Persistent, project-scoped memory for coding agents.",
    year: "2026",
    status: "Open source",
    summary:
      "A local-first memory layer for Cursor, Claude and Gemini. Human-editable Markdown on disk, a ChromaDB index for hybrid search, exposed over MCP.",
    stack: ["Python", "FastAPI", "MCP", "ChromaDB", "Embeddings"],
    links: [
      { label: "GitHub", href: "https://github.com/MANOJ-80/0xMemory" },
      { label: "Roadmap", href: "https://github.com/MANOJ-80/0xMemory#readme" },
    ],
    coverTone: "lime",
    featured: true,
    overview:
      "Every new agent session starts from zero. 0xMemory gives coding agents a durable, portable memory that lives with the project instead of inside a vendor's cloud.",
    problems: [
      "Context is re-derived on every session, burning tokens and repeating the same corrections.",
      "Vector-only memory is unreadable and unexplainable when it retrieves the wrong thing.",
      "Hosted memory layers lock project context into a single provider.",
    ],
    highlights: [
      "Dual-storage design: canonical Markdown files synced with a ChromaDB vector index, giving keyword and semantic retrieval over the same facts.",
      "MCP server so Cursor, Claude and other clients share one memory without bespoke integrations.",
      "LLM extraction pipeline that turns raw chat logs into structured, reviewable facts — with commit-aware lifecycle tracking that links memories to the code evidence behind them.",
    ],
    role: "Design & implementation",
  },
  {
    slug: "0xtrace",
    name: "0xTrace",
    type: "Full-stack product",
    tagline: "A searchable vault of campus placement interviews.",
    year: "2026",
    status: "Live",
    summary:
      "An AI extraction studio and interview directory that turns raw candidate PDFs into structured, searchable rounds, questions and outcomes.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Groq", "Tailwind"],
    links: [
      { label: "Live", href: "https://0x-trace.vercel.app" },
      { label: "GitHub", href: "https://github.com/MANOJ-80/0xTrace" },
    ],
    cover: "/work/0xtrace.webp",
    coverTone: "steel",
    featured: true,
    overview:
      "Placement experience is passed around as scattered PDFs and group-chat screenshots. 0xTrace makes it queryable while keeping every answer verbatim to the original document.",
    problems: [
      "Interview experience is high-value and low-retention — it disappears with the graduating batch.",
      "Naive LLM summarization quietly rewrites what a candidate actually said.",
      "Candidates need to filter by company, role, outcome and round, not scroll a folder.",
    ],
    highlights: [
      "AI extraction studio that parses uploaded PDFs into rounds, coding problems, questions and outcomes, with an interactive review bench before ingestion.",
      "Verbatim-preservation constraint: the pipeline structures content without paraphrasing the source text.",
      "Directory with filters for company, outcome, role and candidate, backed by a Postgres question bank.",
    ],
    role: "Design & implementation",
  },
  {
    slug: "0xlynk",
    name: "0xLynk",
    type: "Peer-to-peer systems",
    tagline: "File transfer that never touches a server.",
    year: "2026",
    status: "Open source",
    summary:
      "Browser-native file transfer over WebRTC DataChannels with chunked transport, SHA-256 verification, resend recovery and ephemeral room sessions.",
    stack: ["WebRTC", "JavaScript", "Node.js", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/MANOJ-80/0xLynk" }],
    coverTone: "sand",
    featured: true,
    overview:
      "A privacy-first transfer tool where payload bytes stay peer-to-peer. The backend only handles signaling — files are never stored, proxied, or logged.",
    problems: [
      "Cloud transfer tools require uploading a file before your recipient can download it.",
      "Browser P2P breaks on unreliable networks without integrity checks and recovery.",
      "Link-based transfers are hard to gate when the content is sensitive.",
    ],
    highlights: [
      "Chunked binary transport with pause, resume, cancel and configurable chunk sizes from 16 KB to 256 KB.",
      "Receiver-side SHA-256 verification plus missing-chunk recovery through a NACK and resend flow.",
      "Ephemeral six-digit rooms with optional passphrases, join gates, per-IP rate limiting and session TTL cleanup.",
    ],
    role: "Design & implementation",
  },
  {
    slug: "0xarmor",
    name: "0xArmor",
    type: "Security tooling",
    tagline: "Linux hardening and compliance, without the bash sprawl.",
    year: "2026",
    status: "Open source",
    summary:
      "An agent-based platform that applies SSH, firewall and kernel hardening policies, then watches for configuration drift across a fleet.",
    stack: ["Python", "FastAPI", "React", "Docker", "Linux"],
    links: [{ label: "GitHub", href: "https://github.com/MANOJ-80/0xArmor" }],
    cover: "/work/0xarmor.webp",
    coverTone: "ink",
    featured: true,
    overview:
      "Security baselines rot the moment they are applied by hand. 0xArmor replaces one-off scripts with a central control plane and an agent that keeps every machine on policy.",
    problems: [
      "Hardening scripts drift per machine and become impossible to audit.",
      "Compliance is checked quarterly instead of continuously.",
      "There is no single view of which hosts are out of policy right now.",
    ],
    highlights: [
      "One-click policy application for SSH, firewall and kernel sysctl baselines across hosts.",
      "Real-time drift detection when a machine diverges from its assigned policy.",
      "Agent-based architecture with containerized deployment and a live compliance dashboard.",
    ],
    role: "Design & implementation",
  },
  {
    slug: "cve-lite-cli",
    name: "cve-lite-cli",
    type: "Open source / OWASP",
    tagline: "Dependency scanning that tells you what to run.",
    year: "2026",
    status: "Open source",
    summary:
      "A fast JS/TS dependency vulnerability scanner with local lockfile scanning, OSV matching, direct vs transitive visibility and practical fix guidance.",
    stack: ["TypeScript", "OSV", "npm", "GitHub Actions"],
    links: [
      { label: "OWASP", href: "https://owasp.org/cve-lite-cli/" },
      { label: "GitHub", href: "https://github.com/OWASP/cve-lite-cli" },
      { label: "npm", href: "https://www.npmjs.com/package/cve-lite-cli" },
    ],
    coverTone: "lime",
    featured: true,
    overview:
      "Most scanners stop at a list of advisories. cve-lite-cli is built around the next question: which of these are actually reachable, and what command fixes them?",
    problems: [
      "Vulnerability output is noisy and flattens direct dependencies together with transitive ones.",
      "Scanning often requires uploading a lockfile to a remote service.",
      "Reports describe risk but leave remediation as an exercise for the reader.",
    ],
    highlights: [
      "Local lockfile scanning matched against OSV, with clear direct vs transitive attribution.",
      "Actionable remediation guidance, `--fix` support and JSON output for CI pipelines.",
      "Shipped as an OWASP Lab Project with a GitHub Action and npm distribution.",
    ],
    role: "Open source contributor",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const archive = [
  {
    name: "0xRupex",
    description: "Privacy-first Android finance manager with SMS and UPI capture.",
    language: "Java",
    href: "https://github.com/MANOJ-80/0xRupex",
    year: "2026",
  },
  {
    name: "0xShelf",
    description: "Full-stack MERN bookstore with auth, orders and analytics.",
    language: "JavaScript",
    href: "https://github.com/MANOJ-80/0xShelf",
    year: "2026",
  },
  {
    name: "0xObserve",
    description: "Self-hosted LLM observability for prompts, latency, cost and evals.",
    language: "Python",
    href: "https://github.com/MANOJ-80/0xObserve",
    year: "2026",
  },
  {
    name: "0xNova",
    description: "Pluggable, PII-safe gateway in front of LLM providers.",
    language: "Python",
    href: "https://github.com/MANOJ-80/0xNova",
    year: "2026",
  },
  {
    name: "0xOrbit",
    description: "Local-first autonomous browser agent.",
    language: "JavaScript",
    href: "https://github.com/MANOJ-80/0xOrbit",
    year: "2026",
  },
  {
    name: "0xApply",
    description: "Open-source job application automation with safety rails.",
    language: "Python",
    href: "https://github.com/MANOJ-80/0xApply",
    year: "2026",
  },
];

export const stack = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C#", "Java", "SQL", "Bash"],
  },
  {
    group: "Backend",
    items: ["FastAPI", "Node.js", "Express", "ASP.NET Core", "REST APIs", "SSE"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Data & cloud",
    items: ["PostgreSQL", "MongoDB", "Redis", "ChromaDB", "AWS S3", "AWS EC2", "Docker"],
  },
  {
    group: "AI / LLM",
    items: ["MCP", "AI agents", "RAG", "Vector embeddings", "Prompt engineering"],
  },
  {
    group: "Security",
    items: ["JWT", "RBAC", "Threat detection", "API security", "Linux hardening"],
  },
];
