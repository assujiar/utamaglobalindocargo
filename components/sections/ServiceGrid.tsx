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
import { services, type ServiceData } from "@/lib/content/services";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import type { Locale } from "@/lib/i18n/config";

interface ServiceGridProps {
  locale: Locale;
  heading: string;
  exploreLabel: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Globe,
  FileCheck,
  Plane,
  Warehouse,
  Container,
};

function ServiceCard({
  service,
  locale,
  exploreLabel,
  large,
}: {
  service: ServiceData;
  locale: Locale;
  exploreLabel: string;
  large?: boolean;
}) {
  const name = locale === "id" ? service.name_id : service.name_en;
  const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
  const description =
    locale === "id" ? service.description_id : service.description_en;
  const slug = locale === "id" ? service.slug_id : service.slug_en;
  const servicesPath = locale === "id" ? "layanan" : "services";
  const href = `/${locale}/${servicesPath}/${slug}`;

  const Icon = iconMap[service.icon];

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col glass-dark p-6 sm:p-7",
        "transition-all duration-250 ease-out",
        "hover:-translate-y-1.5 hover:border-[rgba(255,70,0,0.20)] hover:shadow-[0_0_40px_rgba(255,70,0,0.06)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
        large && "md:col-span-3",
      )}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between mb-5">
        <span className="label-text text-[--color-primary]">
          {service.number}
        </span>
        {Icon && (
          <Icon className="size-6 text-[--color-text-secondary] group-hover:text-[--color-primary] transition-colors duration-200" />
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1.5">
        {name}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-[--color-text-secondary] mb-3">{tagline}</p>

      {/* Hover preview: desktop only */}
      <p className="hidden md:block text-sm text-[--color-text-secondary] leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 ease-out mb-auto">
        {description}
      </p>

      {/* Explore link */}
      <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-[--color-primary] group-hover:gap-3 transition-all duration-200">
        {exploreLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function ServiceGrid({
  locale,
  heading,
  exploreLabel,
  className,
}: ServiceGridProps) {
  return (
    <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark]", className)}>
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] text-center max-w-3xl mx-auto mb-14 sm:mb-20 tracking-[-0.02em]">
            {heading}
          </h2>
        </ScrollReveal>

        <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <ServiceCard
              key={service.key}
              service={service}
              locale={locale}
              exploreLabel={exploreLabel}
              large={i < 2}
            />
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
}

export { ServiceGrid, type ServiceGridProps };
