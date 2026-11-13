import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Writing and notes by Manoj Ganesan (0xEcho).",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <section className="pb-10 pt-10 sm:pt-14">
        <h1 className="font-serif text-[clamp(3rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.025em]">
          Blogs<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-[14px] leading-relaxed text-muted">
          Notes, ideas, and things I learn while building.
        </p>
      </section>

      <section className="bleed py-10">
        <div className="rounded-xl border border-dashed border-line bg-bg-soft/30 px-6 py-12 text-center sm:py-16">
          <p className="label">NO POSTS YET</p>
          <h2 className="mt-4 font-serif text-3xl">The first one is still taking shape.</h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[13px] leading-relaxed text-muted">
            I haven’t published any articles yet. This page will fill in when I have something
            worth sharing.
          </p>
        </div>
      </section>
    </>
  );
}
