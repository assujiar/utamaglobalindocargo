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
    <section className={cn("py-20 sm:py-24 bg-white", className)}>
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-10 sm:mb-12">
            {relatedHeading}
          </h2>
        </ScrollReveal>

        <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
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
                className="group flex flex-col border border-[--color-border] rounded-md p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  {Icon && (
                    <Icon className="size-5 text-[--color-text-secondary] group-hover:text-[--color-primary] transition-colors duration-200" />
                  )}
                  <h3 className="text-base font-semibold text-[--color-text-primary]">
                    {name}
                  </h3>
                </div>
                <p className="text-sm text-[--color-text-secondary] mb-3 leading-relaxed">
                  {tagline}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[--color-primary]">
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
