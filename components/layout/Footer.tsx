"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
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

const columnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const columnItemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();
  const alternateLocale: Locale = locale === "id" ? "en" : "id";
  const prefersReduced = useReducedMotion();

  const copyright = dictionary.footer.copyright.replace("{year}", String(year));

  const footerLinkClasses =
    "text-sm text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150";

  return (
    <footer className="bg-[--color-bg-dark] text-[--color-text-inverse]">
      {/* Main footer grid */}
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 pt-16 pb-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
          variants={prefersReduced ? undefined : columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Col 1: Brand */}
          <motion.div className="sm:col-span-2 md:col-span-1" variants={columnItemVariant}>
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
          </motion.div>

          {/* Col 2: Services */}
          <motion.div variants={columnItemVariant}>
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
                    <AnimatedLink
                      href={`/${locale}/${servicesPath}/${slug}`}
                      className="text-sm"
                    >
                      {name}
                    </AnimatedLink>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Col 3: Company */}
          <motion.div variants={columnItemVariant}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--color-text-secondary]">
              {locale === "id" ? "Perusahaan" : "Company"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <AnimatedLink
                  href={getLocalizedPath("about", locale)}
                  className="text-sm"
                >
                  {dictionary.nav.about}
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  href={getLocalizedPath("contact", locale)}
                  className="text-sm"
                >
                  {dictionary.nav.contact}
                </AnimatedLink>
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
          </motion.div>

          {/* Col 4: Resources */}
          <motion.div variants={columnItemVariant}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[--color-text-secondary]">
              {locale === "id" ? "Sumber Daya" : "Resources"}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <AnimatedLink
                  href={getLocalizedPath("track", locale)}
                  className="text-sm"
                >
                  {dictionary.nav.track}
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink
                  href={getLocalizedPath("quote", locale)}
                  className="text-sm"
                >
                  {dictionary.nav.quote}
                </AnimatedLink>
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
          </motion.div>
        </motion.div>
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
