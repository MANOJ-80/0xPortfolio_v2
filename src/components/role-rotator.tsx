"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Cycles the role line the way Samiran's identity block does: the current
 * title blurs and lifts out, the next one settles in.
 */
export function RoleRotator({
  roles,
  className,
}: {
  roles: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (roles.length < 2) return;

    const id = window.setInterval(() => {
      setShown(false);

      window.setTimeout(() => {
        setIndex((current) => (current + 1) % roles.length);
        setShown(true);
      }, 280);
    }, 2800);

    return () => window.clearInterval(id);
  }, [roles]);

  return (
    <p className={cn("text-[15px] leading-none text-muted sm:text-[16px]", className)}>
      <span
        className={cn(
          "inline-block transition-[opacity,transform,filter] duration-300 ease-out",
          shown
            ? "translate-y-0 opacity-100 blur-0"
            : "-translate-y-1 opacity-0 blur-[3px]",
        )}
      >
        {roles[index]}
      </span>
    </p>
  );
}
