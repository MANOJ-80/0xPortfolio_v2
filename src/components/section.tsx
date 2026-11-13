import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  title,
  aside,
  children,
  className,
}: {
  id?: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("bleed py-12 sm:py-16", className)}>
      <div className="mb-8 border-t border-dashed border-line pt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
            {title}
          </h2>
          {aside && <div className="label text-right">{aside}</div>}
        </div>
      </div>
      {children}
    </section>
  );
}
