/**
 * Hero banner.
 *
 * Footage: "Starry Night Sky Over Pine Forest" from Coverr (free to use, no
 * attribution required). The source is a slow 8s pan, mirrored to a 16s
 * palindrome so the loop is seamless, then re-encoded to 1440px / 20fps.
 *
 * To swap it, replace `public/banner.mp4` and `public/banner-poster.webp`
 * with the same crop. The poster is what shows on slow connections and when
 * the visitor prefers reduced motion.
 */
const BANNER_SRC = "/banner.mp4";
const BANNER_POSTER = "/banner-poster.webp";

export function HeroBanner() {
  return (
    <div className="relative h-[190px] overflow-hidden bg-[#05070c] sm:h-[280px] lg:h-[340px]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <video
          className="absolute inset-0 size-full object-cover object-center motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={BANNER_POSTER}
          aria-hidden
        >
          <source src={BANNER_SRC} type="video/mp4" />
        </video>
      </div>

      {/* Grade: sink the edges into the page background */}
      <div className="pointer-events-none absolute inset-0 bg-[#05070c]/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg via-bg/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg/75 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg/45 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg/30 to-transparent" />

      <div className="pointer-events-none absolute inset-0 grain opacity-[0.12]" />

      <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-4 px-5 pb-3 sm:flex">
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          11.0168°N&nbsp;&nbsp;76.9558°E
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          Nilgiri Ridge · Night
        </p>
      </div>
    </div>
  );
}
