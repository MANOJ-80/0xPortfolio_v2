import Image from "next/image";
import { site } from "@/data/site";
import type { GitHubStats } from "@/lib/github";
import { MapPinIcon, socialIcons } from "./icons";

export function SocialLinks({
  age,
  stats,
}: {
  age: number | null;
  stats: GitHubStats | null;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {site.socials.map((social, index) => {
        const Icon = socialIcons[social.icon];
        const alignRight = index === site.socials.length - 1;

        return (
          <div key={social.label} className="group/social relative">
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-2 text-[12px] text-soft transition-colors hover:border-accent/45 hover:text-fg"
            >
              <Icon
                size={14}
                className="text-muted transition-colors group-hover:text-accent"
              />
              {social.label}
            </a>

            <div
              className={`pointer-events-none invisible absolute top-full z-40 hidden pt-2 opacity-0 transition-opacity duration-200 group-hover/social:visible group-hover/social:opacity-100 group-focus-within/social:visible group-focus-within/social:opacity-100 sm:block ${
                alignRight ? "right-0" : "left-0"
              }`}
              aria-hidden
            >
              <div className="w-[304px] translate-y-1 overflow-hidden rounded-xl border border-line bg-bg-elev shadow-[0_32px_70px_-28px_rgba(0,0,0,0.95)] transition-transform duration-200 group-hover/social:translate-y-0 group-focus-within/social:translate-y-0">
                <div className="relative h-[76px]">
                  <Image
                    src="/banner-poster.webp"
                    alt=""
                    fill
                    sizes="304px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/25 to-transparent" />
                </div>

                <div className="relative z-10 px-4 pb-4">
                  <div className="-mt-6 flex items-end gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-bg-elev bg-bg-soft ring-1 ring-line">
                      <Image
                        src="/profile.webp"
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="pb-1">
                      <p className="text-[14px] font-medium leading-tight text-fg">
                        {site.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-none text-muted">
                        {social.handle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed text-soft">
                    {age !== null ? `${age} · ` : ""}
                    {social.meta}
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-none text-muted">
                    <MapPinIcon size={12} className="shrink-0" />
                    {social.location}
                  </p>

                  {social.stats === "github" && stats && (
                    <div className="mt-3 flex items-center gap-4 border-t border-line pt-3 text-[11px]">
                      <span>
                        <span className="font-medium text-fg">{stats.repos}</span>{" "}
                        <span className="text-muted">Repositories</span>
                      </span>
                      <span>
                        <span className="font-medium text-fg">
                          {stats.followers}
                        </span>{" "}
                        <span className="text-muted">Followers</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
