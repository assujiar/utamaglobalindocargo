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
    <section className={cn("py-28 sm:py-36 bg-[--color-bg-dark-elevated]", className)}>
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] mb-4">
            {locale === "id" ? "Jelajahi Lainnya" : "Explore More"}
          </p>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] mb-14 sm:mb-18 tracking-[-0.03em]">
            {relatedHeading}
          </h2>
        </ScrollReveal>

        {/* Editorial list layout for related services */}
        <div className="border-t border-[rgba(255,255,255,0.06)] mb-14">
          {relatedServices.map((service, i) => {
            if (!service) return null;
            const name = locale === "id" ? service.name_id : service.name_en;
            const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
            const slug = locale === "id" ? service.slug_id : service.slug_en;
            const servicesPath = locale === "id" ? "layanan" : "services";
            const href = `/${locale}/${servicesPath}/${slug}`;

            return (
              <ScrollReveal key={service.key} delay={i * 60}>
                <Link
                  href={href}
                  className="group block py-6 sm:py-8 border-b border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,70,0,0.15)] transition-colors duration-300"
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                      <span className="label-text text-[--color-text-muted] shrink-0 tabular-nums">
                        {service.number}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-[--color-text-primary] group-hover:text-white transition-colors duration-200">
                          {name}
                        </h3>
                        <p className="text-sm text-[--color-text-secondary] mt-1 hidden sm:block">
                          {tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="size-5 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-1 transition-all duration-300 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
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
