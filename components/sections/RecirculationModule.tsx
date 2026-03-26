"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { services } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/config";

interface RecirculationModuleProps {
  locale: Locale;
  relatedServiceKeys: string[];
  quoteHref: string;
  quoteLabel: string;
  relatedHeading: string;
  insightPlaceholder?: string;
  className?: string;
}

function RecirculationModule({
  locale,
  relatedServiceKeys,
  quoteHref,
  quoteLabel,
  relatedHeading,
  insightPlaceholder,
  className,
}: RecirculationModuleProps) {
  const prefersReduced = useReducedMotion();
  const relatedServices = relatedServiceKeys
    .map((key) => services.find((s) => s.key === key))
    .filter(Boolean);

  return (
    <GSAPProvider>
      <section className={cn("py-28 sm:py-40 section-deep relative overflow-hidden", className)}>
        {/* Unique divider: dots */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-0" aria-hidden="true">
          <div className="divider-dots" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="mb-14 sm:mb-18">
            <SplitTextReveal
              as="h2"
              type="words"
              stagger={0.05}
              className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] tracking-[-0.03em]"
            >
              {relatedHeading}
            </SplitTextReveal>
          </div>

          {/* Glass-tinted cards — unique from ServiceGrid's glass-dark cards and rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mb-14">
            {relatedServices.map((service, i) => {
              if (!service) return null;
              const name = locale === "id" ? service.name_id : service.name_en;
              const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
              const slug = locale === "id" ? service.slug_id : service.slug_en;
              const servicesPath = locale === "id" ? "layanan" : "services";
              const href = `/${locale}/${servicesPath}/${slug}`;

              return (
                <motion.div
                  key={service.key}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 24, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
                >
                  <Link href={href} className="group block glass-tinted p-6 sm:p-7 h-full">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="label-text text-[--color-primary]">{service.number}</span>
                      <ArrowRight
                        className="size-4 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-1.5 transition-all duration-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-[--color-text-primary] group-hover:text-white transition-colors duration-200 mb-2 mask-link" data-text={name}>
                      {name}
                    </h3>
                    <p className="text-sm text-[--color-text-muted] group-hover:text-[--color-text-secondary] transition-colors duration-300 leading-relaxed">
                      {tagline}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {insightPlaceholder && (
            <motion.p
              className="text-sm text-[--color-text-secondary] mb-8"
              initial={prefersReduced ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {insightPlaceholder}
            </motion.p>
          )}

          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MagneticElement strength={0.2}>
              <Button href={quoteHref} size="lg">{quoteLabel}</Button>
            </MagneticElement>
          </motion.div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { RecirculationModule, type RecirculationModuleProps };
