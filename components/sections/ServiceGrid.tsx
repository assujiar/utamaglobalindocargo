"use client";

import Link from "next/link";
import {
  Truck,
  Globe,
  FileCheck,
  Plane,
  Warehouse,
  Container,
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
        "group relative flex flex-col bg-white border border-[--color-border] rounded-md",
        "p-5 sm:p-6 transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-md",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
        large && "md:col-span-3",
      )}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-sm font-medium text-[--color-primary]">
          {service.number}
        </span>
        {Icon && (
          <Icon className="size-6 text-[--color-text-secondary] group-hover:text-[--color-primary] transition-colors duration-200" />
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1">
        {name}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-[--color-text-secondary] mb-3">{tagline}</p>

      {/* Hover preview — desktop only, hidden by default */}
      <p className="hidden md:block text-sm text-[--color-text-secondary] leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 ease-out mb-auto">
        {description}
      </p>

      {/* Explore link */}
      <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-medium text-[--color-primary] group-hover:gap-2 transition-all duration-150">
        {exploreLabel}
        <span aria-hidden="true">→</span>
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
    <section className={cn("py-20 sm:py-24 bg-[--color-bg-light]", className)}>
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
