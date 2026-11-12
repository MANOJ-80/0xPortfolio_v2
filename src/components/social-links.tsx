import Image from "next/image";
import type { SocialProfile } from "@/lib/profiles";
import { MapPinIcon, socialIcons } from "./icons";

function formatStat(stat: { value: number; compact?: boolean; display?: string }) {
  if (stat.display) return stat.display;
  if (stat.compact && stat.value >= 1000) {
    const k = stat.value / 1000;
    return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}K`;
  }
  return stat.value.toLocaleString("en-US");
}

export function SocialLinks({
  age,
  profiles,
  children,
}: {
  age: number | null;
  profiles: SocialProfile[];
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {profiles.map((profile, index) => {
        const Icon = socialIcons[profile.icon];
        const alignRight = index === profiles.length - 1;
        const newTab =
          profile.href.startsWith("http") || profile.href.endsWith(".pdf");

        return (
          <div key={profile.key} className="group/social relative">
            <a
              href={profile.href}
              {...(newTab
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-bg-soft px-3 py-2 text-[12px] text-soft transition-colors hover:border-accent/45 hover:text-fg"
            >
              <Icon
                size={14}
                className="text-muted transition-colors group-hover:text-accent"
              />
              {profile.label}
            </a>

            <div
              className={`pointer-events-none invisible absolute top-full z-40 hidden pt-2 opacity-0 transition-opacity duration-200 group-hover/social:visible group-hover/social:opacity-100 group-focus-within/social:visible group-focus-within/social:opacity-100 sm:block ${
                alignRight ? "right-0" : "left-0"
              }`}
              aria-hidden
            >
              <div className="w-[304px] translate-y-1 overflow-hidden rounded-xl border border-line bg-bg-elev shadow-[0_32px_70px_-28px_rgba(0,0,0,0.95)] transition-transform duration-200 group-hover/social:translate-y-0 group-focus-within/social:translate-y-0">
                <div className="relative h-[80px]">
                  <Image
                    src={profile.banner}
                    alt=""
                    fill
                    sizes="304px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/25 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-elev via-bg-elev/25 to-transparent" />
                  <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-md border border-line/80 bg-bg/70 text-soft backdrop-blur-sm">
                    <Icon size={12} />
                  </span>
                </div>

                <div className="relative z-10 px-4 pb-4">
                  <div className="-mt-6 flex items-end gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-bg-elev bg-bg-soft ring-1 ring-line">
                      <Image
                        src={profile.avatar}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 pb-1">
                      <p className="truncate text-[14px] font-medium leading-tight text-fg">
                        {profile.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] leading-none text-muted">
                        {profile.handle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-soft">
                    {profile.showAge && age !== null ? `${age} · ` : ""}
                    {profile.bio}
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-[11px] leading-none text-muted">
                    <MapPinIcon size={12} className="shrink-0" />
                    {profile.location}
                  </p>

                  {profile.stats.length > 0 && (
                    <div className="mt-3 flex items-center gap-4 border-t border-line pt-3 text-[11px]">
                      {profile.stats.map((stat) => (
                        <span key={stat.label}>
                          <span className="font-medium text-fg tabular-nums">
                            {formatStat(stat)}
                          </span>{" "}
                          <span className="text-muted">{stat.label}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {children}
    </div>
  );
}
