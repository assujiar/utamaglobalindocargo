"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
  const relatedServices = relatedServiceKeys
    .map((key) => services.find((s) => s.key === key))
    .filter(Boolean);

  return (
    <section className={cn("py-28 sm:py-36 section-elevated relative overflow-hidden", className)}>
      {/* Ambient depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blur-circle absolute w-[35vw] h-[35vw] bottom-[-10%] left-[20%] opacity-[0.05]" />
      </div>

      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] mb-4">
            {locale === "id" ? "Jelajahi Lainnya" : "Explore More"}
          </p>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] mb-14 sm:mb-18 tracking-[-0.03em]">
            {relatedHeading}
          </h2>
        </ScrollReveal>

        {/* Related service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mb-14">
          {relatedServices.map((service, i) => {
            if (!service) return null;
            const name = locale === "id" ? service.name_id : service.name_en;
            const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
            const slug = locale === "id" ? service.slug_id : service.slug_en;
            const servicesPath = locale === "id" ? "layanan" : "services";
            const href = `/${locale}/${servicesPath}/${slug}`;

            return (
              <ScrollReveal key={service.key} delay={i * 80}>
                <Link
                  href={href}
                  className="group block card-elevated card-shine h-full"
                >
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                    <span className="label-text text-[--color-primary]">{service.number}</span>
                    <ArrowRight
                      className="size-4 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-1 transition-all duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="relative z-10 text-base font-semibold text-[--color-text-primary] group-hover:text-white transition-colors duration-200 mb-2">
                    {name}
                  </h3>
                  <p className="relative z-10 text-sm text-[--color-text-muted] group-hover:text-[--color-text-secondary] transition-colors duration-300 leading-relaxed">
                    {tagline}
                  </p>
                </Link>
              </ScrollReveal>
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
          <Button href={quoteHref} size="lg">
            {quoteLabel}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { RecirculationModule, type RecirculationModuleProps };
