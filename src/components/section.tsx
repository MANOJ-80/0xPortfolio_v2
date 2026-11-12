import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  index,
  title,
  aside,
  children,
  className,
}: {
  id?: string;
  index: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("bleed py-12 sm:py-16", className)}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="flex items-center gap-3">
          <span className="label text-accent">[{index}]</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
            {title}
          </span>
        </h2>
        {aside && <div className="label text-right">{aside}</div>}
      </div>
      {children}
    </section>
  );
}
