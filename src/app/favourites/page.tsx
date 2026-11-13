import type { Metadata } from "next";
import { favouriteSections } from "@/data/favourites";
import { FavouritePoster } from "@/components/favourite-poster";

export const metadata: Metadata = {
  title: "Favourites",
  description: "A personal collection of movies, series, books, and anime.",
  alternates: { canonical: "/favourites" },
};

function ShelfIcon({ shelf }: { shelf: string }) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "size-3.5 text-muted",
  };

  if (shelf === "Movies") {
    return (
      <svg {...common}>
        <rect x="1.5" y="2.5" width="13" height="11" rx="0.8" />
        <path d="M4.5 2.5v11M11.5 2.5v11M1.5 6h3m-3 4h3m7-4h3m-3 4h3" />
      </svg>
    );
  }

  if (shelf === "Series") {
    return (
      <svg {...common}>
        <rect x="1.5" y="2" width="13" height="9.5" rx="1" />
        <path d="M5.5 14h5M8 11.5V14" />
      </svg>
    );
  }

  if (shelf === "Books") {
    return (
      <svg {...common}>
        <path d="M2 3.2c2.3-.7 4.3-.2 6 1.1v9.3c-1.7-1.3-3.7-1.8-6-1.1V3.2Zm12 0c-2.3-.7-4.3-.2-6 1.1v9.3c1.7-1.3 3.7-1.8 6-1.1V3.2Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m8 1.7 1.6 4.7 4.7 1.6-4.7 1.6L8 14.3l-1.6-4.7L1.7 8l4.7-1.6L8 1.7Z" />
    </svg>
  );
}

export default function FavouritesPage() {
  return (
    <>
      <section className="pb-8 pt-10 sm:pt-14">
        <h1 className="font-serif text-[clamp(3rem,8vw,4.75rem)] leading-[0.95] tracking-[-0.025em]">
          Favourites<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-[14px] leading-relaxed text-muted">
          A little shelf for the stories I keep coming back to.
        </p>
      </section>

      <div className="bleed pb-12">
        {favouriteSections.map((shelf) => (
          <section key={shelf.id} id={shelf.id} className="py-7 sm:py-8">
            <div className="mb-7 flex items-center gap-2 border-y border-dashed border-line py-2.5">
              <ShelfIcon shelf={shelf.title} />
              <h2 className="text-xs font-semibold tracking-[0.08em] text-muted">
                {shelf.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10">
              {shelf.items.map((item) => (
                <div key={item.title} className="flex justify-center">
                  <FavouritePoster item={item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
