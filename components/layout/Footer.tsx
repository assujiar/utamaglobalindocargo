import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { getLocalizedPath } from "@/lib/utils/routes";
import { services } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  locale: Locale;
  dictionary: {
    nav: Record<string, string>;
    footer: Record<string, string>;
    common: Record<string, string>;
  };
}

function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();
  const alternateLocale: Locale = locale === "id" ? "en" : "id";

  const copyright = dictionary.footer.copyright.replace("{year}", String(year));

  const footerLinkClasses =
    "text-sm text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150";

  return (
    <footer className="bg-[--color-bg-dark] text-[--color-text-inverse]">
      {/* Main footer grid */}
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            {/* TODO: Replace with real UGC logo SVG (white variant) */}
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <rect width="40" height="40" rx="8" fill="var(--color-primary)" />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="var(--font-primary)"
                >
                  UGC
                </text>
              </svg>
              <span className="text-lg font-semibold">UGC Logistics</span>
            </div>
            <p className="text-sm font-medium text-[--color-primary] mb-2 italic">
              &ldquo;We Care What We Deliver&rdquo;
            </p>
            <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-4">
              {dictionary.footer.tagline}
            </p>
            {/* Social links placeholder */}
            <div className="flex gap-3">
              {/* TODO: Add real social media links */}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--color-text-secondary]">
              {dictionary.nav.services}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => {
                const name =
                  locale === "id" ? service.name_id : service.name_en;
                const slug =
                  locale === "id" ? service.slug_id : service.slug_en;
                const servicesPath =
                  locale === "id" ? "layanan" : "services";
                return (
                  <li key={service.key}>
                    <Link
                      href={`/${locale}/${servicesPath}/${slug}`}
                      className={footerLinkClasses}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--color-text-secondary]">
              {locale === "id" ? "Perusahaan" : "Company"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href={getLocalizedPath("about", locale)}
                  className={footerLinkClasses}
                >
                  {dictionary.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("contact", locale)}
                  className={footerLinkClasses}
                >
                  {dictionary.nav.contact}
                </Link>
              </li>
              <li>
                {/* Insights — Phase 2 placeholder */}
                <span className="text-sm text-[--color-text-secondary]/50 cursor-default">
                  {dictionary.nav.insights}
                </span>
              </li>
              <li>
                {/* Careers placeholder */}
                <span className="text-sm text-[--color-text-secondary]/50 cursor-default">
                  {locale === "id" ? "Karir" : "Careers"}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--color-text-secondary]">
              {locale === "id" ? "Sumber Daya" : "Resources"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href={getLocalizedPath("track", locale)}
                  className={footerLinkClasses}
                >
                  {dictionary.nav.track}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath("quote", locale)}
                  className={footerLinkClasses}
                >
                  {dictionary.nav.quote}
                </Link>
              </li>
              <li>
                {/* Download Company Profile — placeholder until admin upload */}
                <span className="text-sm text-[--color-text-secondary]/50 cursor-default">
                  {locale === "id"
                    ? "Unduh Profil Perusahaan"
                    : "Download Company Profile"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[--color-border-dark]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 pt-8 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[--color-text-secondary]">{copyright}</p>

          <div className="flex items-center gap-6">
            <Link
              href={getLocalizedPath("privacy", locale)}
              className="text-xs text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150"
            >
              {locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <Link
              href={getLocalizedPath("terms", locale)}
              className="text-xs text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150"
            >
              {locale === "id" ? "Syarat & Ketentuan" : "Terms of Service"}
            </Link>
            <Link
              href={`/${alternateLocale}`}
              className="text-xs font-medium text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150 uppercase"
              aria-label={`Switch to ${dictionary.common.switchLanguage}`}
            >
              {dictionary.common.switchLanguage}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer, type FooterProps };
