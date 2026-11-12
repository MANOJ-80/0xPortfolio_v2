import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center py-16">
      <p className="label text-accent">[404] // NOT_FOUND</p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,9vw,5rem)] leading-[0.95] tracking-[-0.02em]">
        Wrong <span className="italic">turn</span>.
      </h1>
      <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-muted">
        This route does not exist. The index is still where you left it.
      </p>
      <div className="mt-8 flex gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink"
        >
          <ArrowLeftIcon size={12} />
          Back home
        </Link>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-soft transition-colors hover:border-fg/40 hover:text-fg"
        >
          View work
        </Link>
      </div>
    </div>
  );
}
