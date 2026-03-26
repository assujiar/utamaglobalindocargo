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

function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();
  const alternateLocale: Locale = locale === "id" ? "en" : "id";
  const prefersReduced = useReducedMotion();
  const copyright = dictionary.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="section-dark text-[--color-text-inverse] relative overflow-hidden">
      {/* LET'S TALK CTA with rich ambient */}
      <GSAPProvider>
        <div className="relative border-t border-[rgba(255,255,255,0.06)]">
          {/* Ambient blur */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="blur-circle absolute w-[50vw] h-[50vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 py-24 sm:py-32">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <SplitTextReveal
                as="p"
                type="words"
                stagger={0.04}
                className="text-display-md sm:text-display-lg font-bold text-[--color-text-inverse] tracking-[-0.04em]"
              >
                {locale === "id" ? "Mari Bicara." : "Let's Talk."}
              </SplitTextReveal>
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                <MagneticElement strength={0.3}>
                  <Button href={getLocalizedPath("quote", locale)} size="lg">
                    {locale === "id" ? "Minta Penawaran" : "Request a Quote"}
                  </Button>
                </MagneticElement>
              </motion.div>
            </div>
          </div>
        </div>
      </GSAPProvider>

      {/* Footer grid */}
      <div className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Col 1: Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <span className="text-base font-semibold text-[--color-text-inverse]">
                UGC Logistics
              </span>
              <p className="mt-2 text-xs text-[--color-text-muted]">
                PT Utama Globalindo Cargo
              </p>
              <p className="mt-4 text-sm text-[--color-text-secondary] leading-relaxed">
                {dictionary.footer.tagline}
              </p>

              {/* Social links */}
              <div className="flex gap-4 mt-5">
                {[
                  { label: "WhatsApp", href: "https://wa.me/6281284596614" },
                  { label: "LinkedIn", href: "https://linkedin.com/company/utamaglobalindocargo" },
                  { label: "Instagram", href: "https://instagram.com/ugclogistics" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-xs text-[--color-text-muted] hover:text-[--color-primary] transition-colors duration-200 animated-underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h3 className="label-text text-[--color-text-muted] mb-4">
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
            </div>

            {/* Col 3: Company */}
            <div>
              <h3 className="label-text text-[--color-text-muted] mb-4">
                {locale === "id" ? "Perusahaan" : "Company"}
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <AnimatedLink href={getLocalizedPath("about", locale)} className="text-sm">
                    {dictionary.nav.about}
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink href={getLocalizedPath("contact", locale)} className="text-sm">
                    {dictionary.nav.contact}
                  </AnimatedLink>
                </li>
                <li>
                  <span className="text-sm text-[--color-text-muted]/50 cursor-default">
                    {dictionary.nav.insights}
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Resources */}
            <div>
              <h3 className="label-text text-[--color-text-muted] mb-4">
                {locale === "id" ? "Sumber Daya" : "Resources"}
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <AnimatedLink href={getLocalizedPath("track", locale)} className="text-sm">
                    {dictionary.nav.track}
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink href={getLocalizedPath("quote", locale)} className="text-sm">
                    {dictionary.nav.quote}
                  </AnimatedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[--color-text-muted]">{copyright}</p>

          <div className="flex items-center gap-6">
            <Link
              href={getLocalizedPath("privacy", locale)}
              className="text-xs text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors duration-200"
            >
              {locale === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <Link
              href={getLocalizedPath("terms", locale)}
              className="text-xs text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors duration-200"
            >
              {locale === "id" ? "Syarat & Ketentuan" : "Terms of Service"}
            </Link>
            <Link
              href={`/${alternateLocale}`}
              className="text-xs font-medium text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors duration-200 uppercase"
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
