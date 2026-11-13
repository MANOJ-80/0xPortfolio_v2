import Link from "next/link";
import { site } from "@/data/site";
import { socialIcons } from "./icons";
import { ViewCount } from "./view-count";
import { FooterQuoteRotator } from "./footer-quote-rotator";

export function SiteFooter() {
  const footerSocials = site.socials.filter((social) =>
    ["x", "gmail", "github"].includes(social.key),
  );
  const xProfile = site.socials.find((social) => social.key === "x");

  return (
    <footer className="bleed px-4 pb-7 pt-12 sm:px-6 sm:pb-8 sm:pt-16">
      <div className="flex flex-col items-center text-center">
        <ViewCount variant="visitor" />

        <a href={`mailto:${site.email}`} className="footer-cta mt-8">
          Let&apos;s build something extraordinary
        </a>

        <nav className="mt-7 flex items-center gap-3" aria-label="Social links">
          {footerSocials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <Link
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-link"
              >
                <Icon size={22} />
              </Link>
            );
          })}
        </nav>
      </div>

      <FooterQuoteRotator />

      <div className="mx-auto mt-14 flex max-w-[54rem] flex-col gap-3 border-t border-line-soft pt-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {site.year} {site.name} <span className="px-1">·</span> Built with care</p>
        <div className="flex items-center gap-4">
          {xProfile && (
            <a href={xProfile.href} target="_blank" rel="noopener noreferrer" className="footer-bottom-link">
              DM me
            </a>
          )}
          <a href={`mailto:${site.email}`} className="footer-bottom-link">Mail me</a>
        </div>
      </div>
    </footer>
  );
}
