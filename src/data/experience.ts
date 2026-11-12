export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
  href?: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    org: "Froze Communication",
    role: "Project Intern",
    period: "Jan 2026 — Jun 2026",
    location: "Remote",
    summary:
      "Built and deployed a multi-tenant endpoint detection and response platform for Windows fleets.",
    points: [
      "Engineered a Windows endpoint agent for event log collection, deduplication, firewall synchronization, and auto-updates, with reliable batched ingestion.",
      "Designed the detection and response pipeline: automated IP blocking, ~30s firewall sync, threat-intelligence enrichment, and real-time SSE alerts.",
      "Built multi-tenant monitoring with strict tenant isolation and role-based access control across organizations.",
    ],
    stack: ["Python", "FastAPI", "Windows", "SSE", "RBAC", "Docker"],
    current: false,
  },
];
