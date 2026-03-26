"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { Button } from "@/components/ui/Button";
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
    <motion.footer
      className="bg-[--color-bg-dark] text-[--color-text-inverse]"
      initial={prefersReduced ? undefined : { clipPath: "inset(8% 0 0 0)", opacity: 0.8 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* ── LET'S TALK CTA Band ── */}
      <GSAPProvider>
        <div className="relative overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[160px]" />
          </div>
          <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 py-20 sm:py-28 text-center relative z-10">
            <SplitTextReveal
              as="p"
              type="words"
              stagger={0.04}
              className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold gradient-text-vivid tracking-[-0.04em] mb-6"
            >
              {locale === "id" ? "MARI BICARA" : "LET'S TALK"}
            </SplitTextReveal>
            <motion.p
              className="text-[--color-text-secondary] text-lg mb-8 max-w-md mx-auto"
              initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {locale === "id"
                ? "Diskusikan kebutuhan logistik Anda dengan tim kami."
                : "Discuss your logistics needs with our team."}
            </motion.p>
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              <MagneticElement strength={0.3}>
                <Button href={getLocalizedPath("quote", locale)} size="lg">
                  {locale === "id" ? "Minta Penawaran" : "Request a Quote"}
                </Button>
              </MagneticElement>
            </motion.div>
          </div>
        </div>
      </GSAPProvider>

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
            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {[
                { label: "WhatsApp", href: "https://wa.me/6281284596614", icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                )},
                { label: "LinkedIn", href: "https://linkedin.com/company/utamaglobalindocargo", icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )},
                { label: "Instagram", href: "https://instagram.com/ugclogistics", icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                )},
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center size-9 rounded-lg bg-[rgba(255,255,255,0.06)] text-[--color-text-secondary] hover:bg-[rgba(255,70,0,0.15)] hover:text-[--color-primary] hover:shadow-[0_0_20px_rgba(255,70,0,0.2)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
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
    </motion.footer>
  );
}

export { Footer, type FooterProps };
