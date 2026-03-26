"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <section className={cn("py-28 sm:py-40 section-elevated relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

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

          {/* Related services — portfolio list rows */}
          <div className="mb-14">
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
                  initial={prefersReduced ? undefined : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
                >
                  <Link href={href} className="service-row group">
                    <span className="stat-number text-sm text-[--color-text-muted] tabular-nums w-8 shrink-0 group-hover:text-[--color-primary] transition-colors duration-300">
                      {service.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="service-name text-heading-md sm:text-heading-lg text-[--color-text-primary] block">
                        {name}
                      </span>
                      <span className="service-tagline text-sm text-[--color-text-secondary] block mt-1">
                        {tagline}
                      </span>
                    </div>
                    <div className="service-arrow shrink-0 ml-4">
                      <ArrowUpRight className="size-5" strokeWidth={1.5} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Insight placeholder */}
          {insightPlaceholder && (
            <ScrollReveal>
              <p className="text-sm text-[--color-text-secondary] mb-8">
                {insightPlaceholder}
              </p>
            </ScrollReveal>
          )}

          {/* Quote CTA */}
          <ScrollReveal>
            <MagneticElement strength={0.2}>
              <Button href={quoteHref} size="lg">
                {quoteLabel}
              </Button>
            </MagneticElement>
          </ScrollReveal>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { RecirculationModule, type RecirculationModuleProps };
