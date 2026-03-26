"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

function ServiceRow({
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
      initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        delay: index * 0.06,
      }}
    >
      <Link
        href={href}
        data-cursor-text="VIEW"
        className="service-row group"
      >
        {/* Number */}
        <span className="stat-number text-sm text-[--color-text-muted] tabular-nums w-8 shrink-0 group-hover:text-[--color-primary] transition-colors duration-300">
          {service.number}
        </span>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <span className="service-name text-heading-lg sm:text-heading-xl text-[--color-text-primary] block">
            {name}
          </span>
          <span className="service-tagline text-sm text-[--color-text-secondary] block mt-1">
            {tagline}
          </span>
        </div>

        {/* Arrow */}
        <div className="service-arrow shrink-0 ml-4">
          <ArrowUpRight className="size-6" strokeWidth={1.5} />
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
      <section className={cn("py-28 sm:py-40 section-elevated relative", className)}>
        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Header — asymmetric split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
            <div className="md:col-span-7">
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.05}
                className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] tracking-[-0.03em]"
              >
                {heading}
              </SplitTextReveal>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <motion.p
                className="text-sm text-[--color-text-muted] leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {locale === "id"
                  ? "Enam layanan terintegrasi untuk seluruh kebutuhan rantai pasok Anda."
                  : "Six integrated services for your complete supply chain needs."}
              </motion.p>
            </div>
          </div>

          {/* Service list — editorial portfolio rows */}
          <div>
            {services.map((service, i) => (
              <ServiceRow
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
