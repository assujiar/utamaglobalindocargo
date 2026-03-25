"use client";

import Link from "next/link";
import {
  Truck,
  Globe,
  FileCheck,
  Plane,
  Warehouse,
  Container,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import { services } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Globe,
  FileCheck,
  Plane,
  Warehouse,
  Container,
};

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

  const servicesPath = locale === "id" ? "layanan" : "services";

  return (
    <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark] relative", className)}>
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[--color-primary] opacity-[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] text-center mb-4">
            {locale === "id" ? "Layanan Terkait" : "Related Services"}
          </p>
          <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-12 sm:mb-16 tracking-[-0.02em]">
            {relatedHeading}
          </h2>
        </ScrollReveal>

        <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-12">
          {relatedServices.map((service) => {
            if (!service) return null;
            const name = locale === "id" ? service.name_id : service.name_en;
            const tagline =
              locale === "id" ? service.tagline_id : service.tagline_en;
            const slug = locale === "id" ? service.slug_id : service.slug_en;
            const href = `/${locale}/${servicesPath}/${slug}`;
            const Icon = iconMap[service.icon];

            return (
              <Link
                key={service.key}
                href={href}
                className="group glass-dark p-5 sm:p-6 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[rgba(255,70,0,0.20)] hover:shadow-[0_0_30px_rgba(255,70,0,0.08)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  {Icon && (
                    <div className="flex items-center justify-center size-9 rounded-lg bg-[rgba(255,70,0,0.08)] group-hover:bg-[rgba(255,70,0,0.15)] transition-colors duration-200">
                      <Icon className="size-4.5 text-[--color-primary]" />
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-[--color-text-primary]">
                    {name}
                  </h3>
                </div>
                <p className="text-sm text-[--color-text-secondary] mb-4 leading-relaxed">
                  {tagline}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[--color-primary] group-hover:gap-2.5 transition-all duration-200">
                  {locale === "id" ? "Jelajahi" : "Explore"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </StaggeredReveal>

        {/* Insight placeholder */}
        {insightPlaceholder && (
          <ScrollReveal>
            <p className="text-center text-sm text-[--color-text-secondary] mb-8">
              {insightPlaceholder}
            </p>
          </ScrollReveal>
        )}

        {/* Quote CTA */}
        <ScrollReveal>
          <div className="text-center">
            <Button href={quoteHref} size="lg">
              {quoteLabel}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { RecirculationModule, type RecirculationModuleProps };
