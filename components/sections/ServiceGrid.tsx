"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { services, type ServiceData } from "@/lib/content/services";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

interface ServiceGridProps {
  locale: Locale;
  heading: string;
  exploreLabel: string;
  className?: string;
}

function ServiceItem({
  service,
  locale,
  index,
}: {
  service: ServiceData;
  locale: Locale;
  index: number;
}) {
  const name = locale === "id" ? service.name_id : service.name_en;
  const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
  const slug = locale === "id" ? service.slug_id : service.slug_en;
  const servicesPath = locale === "id" ? "layanan" : "services";
  const href = `/${locale}/${servicesPath}/${slug}`;
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
    >
      <Link
        href={href}
        data-cursor-text="VIEW"
        className="group block py-6 sm:py-8 border-b border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,70,0,0.15)] transition-colors duration-300"
      >
        <div className="flex items-start sm:items-center justify-between gap-4">
          {/* Left: number + name */}
          <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
            <span className="label-text text-[--color-text-muted] shrink-0 tabular-nums">
              {service.number}
            </span>
            <h3 className="text-heading-md sm:text-heading-lg text-[--color-text-primary] group-hover:text-[--color-text-inverse] transition-colors duration-300 truncate">
              {name}
            </h3>
          </div>

          {/* Right: arrow */}
          <div className="shrink-0 flex items-center gap-3">
            <span className="hidden md:block text-sm text-[--color-text-muted] group-hover:text-[--color-text-secondary] transition-colors duration-300 max-w-[280px] truncate">
              {tagline}
            </span>
            <ArrowRight
              className="size-5 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-1 transition-all duration-300"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceGrid({
  locale,
  heading,
  exploreLabel,
  className,
}: ServiceGridProps) {
  return (
    <GSAPProvider>
      <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark] relative", className)}>
        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Section header — asymmetric layout */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <motion.p
                className="label-text text-[--color-primary] mb-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {locale === "id" ? "Layanan Kami" : "Our Services"}
              </motion.p>
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.05}
                className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] max-w-2xl tracking-[-0.03em]"
              >
                {heading}
              </SplitTextReveal>
            </div>
          </div>

          {/* Service list — editorial numbered list, not card grid */}
          <div className="border-t border-[rgba(255,255,255,0.06)]">
            {services.map((service, i) => (
              <ServiceItem
                key={service.key}
                service={service}
                locale={locale}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ServiceGrid, type ServiceGridProps };
