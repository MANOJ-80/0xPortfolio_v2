import Image from "next/image";
import { homeAbout, homeTagline, site } from "@/data/site";
import { Contributions } from "./contributions";
import { DiscordChip } from "./discord-chip";
import { HeroBanner } from "./hero-banner";
import { ArrowUpRightIcon } from "./icons";
import { getCurrentAge } from "@/lib/age";
import { getSocialProfiles } from "@/lib/profiles";
import { RoleRotator } from "./role-rotator";
import { SocialLinks } from "./social-links";

export async function Hero() {
  const [age, profiles] = await Promise.all([
    getCurrentAge(),
    getSocialProfiles(),
  ]);

  return (
    <section className="pb-12">
      <HeroBanner />

      <div className="rise mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-bg-soft sm:size-24">
            <Image
              src="/profile.webp"
              alt={site.name}
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 pt-1">
            <h1 className="font-serif text-[clamp(2rem,4.8vw,2.9rem)] leading-[1.02] tracking-[-0.025em]">
              Manoj Ganesan
            </h1>
            <RoleRotator roles={site.roles} className="mt-2.5" />
            <p className="mt-2.5 text-[11px] leading-none text-muted">
              {age !== null ? `${age}, ` : ""}
              {site.location}
            </p>
          </div>
        </div>

      </div>

      <div
        className="rise mt-10 border-t border-dashed border-line pt-8"
        style={{ animationDelay: "120ms" }}
      >
        <h2 className="font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
          About
        </h2>

        <p className="mt-4 text-[15px] leading-[1.75] text-soft">{homeTagline}</p>

        <ul className="mt-5 flex max-w-[68ch] flex-col gap-3.5">
          {homeAbout.map((point, i) => (
            <li key={i} className="flex gap-3 text-[14.5px] leading-[1.75] text-soft">
              <span className="mt-[10px] size-[3px] shrink-0 rounded-full bg-accent/80" />
              <span>
                {point.parts.map((part, j) =>
                  part.strong ? (
                    <strong key={j} className="font-medium text-fg">
                      {part.text}
                    </strong>
                  ) : (
                    <span key={j}>{part.text}</span>
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rise mt-8" style={{ animationDelay: "240ms" }}>
        <p className="text-[13px] text-muted">
          Here are my <span className="font-medium text-fg">socials</span>
        </p>

        <SocialLinks profiles={profiles}>
          <DiscordChip />
        </SocialLinks>
      </div>

      <div
        className="rise mt-12 border-t border-dashed border-line pt-8"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-[1.9rem] leading-none tracking-[-0.02em]">
            GitHub Activity
          </h2>
          <a
            href={`https://github.com/${site.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            @{site.github} <ArrowUpRightIcon size={11} />
          </a>
        </div>

        <div className="mt-6">
          <Contributions />
        </div>
      </div>
    </section>
  );
}
