import type { TechIconName } from "@/components/tech-icons";

export type TechCategory =
  | "frontend"
  | "backend"
  | "data"
  | "ai"
  | "design"
  | "tools";

export type Tech = {
  name: string;
  icon: TechIconName;
  category: TechCategory;
  /** Used for the hover glow, icon tint and note readout. Tuned for both themes. */
  color: string;
};

export const techCategories: { id: "all" | TechCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data" },
  { id: "ai", label: "AI" },
  { id: "design", label: "Design" },
  { id: "tools", label: "Tools" },
];

/**
 * Order matters: the first block mirrors the reference layout, the rest are
 * additions. Each entry gets a note from the pentatonic scale in list order.
 */
export const techStack: Tech[] = [
  { name: "JavaScript", icon: "javascript", category: "frontend", color: "#d9a800" },
  { name: "TypeScript", icon: "typescript", category: "frontend", color: "#3178c6" },
  { name: "React", icon: "react", category: "frontend", color: "#38bdf8" },
  { name: "Next.js", icon: "nextdotjs", category: "frontend", color: "#9ca3af" },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "frontend", color: "#0ea5e9" },
  { name: "Framer Motion", icon: "framer", category: "frontend", color: "#4d7cff" },
  { name: "Node.js", icon: "nodedotjs", category: "backend", color: "#5fa04e" },
  { name: "Express.js", icon: "express", category: "backend", color: "#a3a3a3" },
  { name: "MongoDB", icon: "mongodb", category: "data", color: "#47a248" },
  { name: "PostgreSQL", icon: "postgresql", category: "data", color: "#4169e1" },
  { name: "Prisma", icon: "prisma", category: "data", color: "#6366f1" },
  { name: "OAuth", icon: "oauth", category: "backend", color: "#8b5cf6" },
  { name: "JWT", icon: "jsonwebtokens", category: "backend", color: "#e879f9" },
  { name: "Git", icon: "git", category: "tools", color: "#f05032" },
  { name: "GitHub", icon: "github", category: "tools", color: "#9ca3af" },
  { name: "Vercel", icon: "vercel", category: "tools", color: "#9ca3af" },
  { name: "Figma", icon: "figma", category: "design", color: "#f24e1e" },
  { name: "Postman", icon: "postman", category: "tools", color: "#ff6c37" },
  { name: "Axios", icon: "axios", category: "tools", color: "#7c5cff" },

  { name: "Python", icon: "python", category: "backend", color: "#4b8bbe" },
  { name: "FastAPI", icon: "fastapi", category: "backend", color: "#0d9488" },
  { name: "C#", icon: "csharp", category: "backend", color: "#8b5cf6" },
  { name: "ASP.NET Core", icon: "dotnet", category: "backend", color: "#7c6bff" },
  { name: "Java", icon: "openjdk", category: "backend", color: "#f59e0b" },
  { name: "SQL", icon: "sql", category: "data", color: "#7c8ba1" },
  { name: "Redis", icon: "redis", category: "data", color: "#ff4438" },
  { name: "Docker", icon: "docker", category: "tools", color: "#2496ed" },
  { name: "AWS", icon: "amazonwebservices", category: "data", color: "#ff9900" },
  { name: "MCP", icon: "modelcontextprotocol", category: "ai", color: "#a78bfa" },
  { name: "RAG", icon: "rag", category: "ai", color: "#a78bfa" },
  { name: "AI Agents", icon: "agents", category: "ai", color: "#f472b6" },
  { name: "ChromaDB", icon: "chromadb", category: "ai", color: "#eab308" },
  { name: "Vector Embeddings", icon: "embeddings", category: "ai", color: "#06b6d4" },
  { name: "Bash", icon: "gnubash", category: "tools", color: "#4eaa25" },
];
