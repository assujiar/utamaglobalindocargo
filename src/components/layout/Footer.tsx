import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { services } from "@/data/services";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Footer({ locale, dict }: FooterProps) {
  const prefix = `/${locale}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-carbon-dark text-white" role="contentinfo">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={prefix} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 bg-logistics-orange flex items-center justify-center text-sm font-black">
                U
              </span>
              <span className="font-black text-lg tracking-tight">
                UGC Logistics
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              PT Utama Globalindo Cargo
            </p>
            <p className="text-sm italic text-logistics-orange font-medium">
              &ldquo;{dict.footer.tagline}&rdquo;
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
              {dict.footer.servicesLabel}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`${prefix}/services/${service.slug}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {service.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
              {dict.footer.companyLabel}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`${prefix}/about`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/industries`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {dict.nav.industries}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/case-studies`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {dict.nav.caseStudies}
                </Link>
              </li>
              <li>
                <Link
                  href={`${prefix}/faq`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {dict.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
              {dict.footer.contactLabel}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:info@utamaglobalindocargo.com"
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                info@utamaglobalindocargo.com
              </a>
              <p className="text-sm text-white/50">{dict.footer.address}</p>
              <Link
                href={`${prefix}/contact`}
                className="inline-block mt-4 bg-logistics-orange text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
              >
                {dict.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {currentYear} {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale === "id" ? "en" : "id"}`}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {dict.common.language}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
