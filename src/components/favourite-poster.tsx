import Image from "next/image";

export type FavouritePosterData = {
  title: string;
  image: string;
  credit?: string;
  description?: string;
};

export function FavouritePoster({ item }: { item: FavouritePosterData }) {
  return (
    <article
      tabIndex={0}
      aria-label={`${item.title}${item.credit ? `. ${item.credit}` : ""}`}
      className="group relative aspect-[2/3] w-full max-w-48 cursor-default select-none overflow-hidden rounded-[4px] border border-line bg-bg-soft outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Image
        src={item.image}
        alt={`${item.title} poster`}
        fill
        sizes="(max-width: 639px) 42vw, 192px"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex translate-y-4 flex-col items-center gap-0.5 p-3 text-center opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white">
          {item.title}
        </h3>
        {item.credit && (
          <p className="line-clamp-1 text-[10px] font-medium text-neutral-300/90">
            {item.credit}
          </p>
        )}
        {item.description && (
          <p className="mt-1 line-clamp-2 px-1 font-mono text-[9px] leading-relaxed text-neutral-400">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
