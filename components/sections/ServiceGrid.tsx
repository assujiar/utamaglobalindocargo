"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { services, type ServiceData } from "@/lib/content/services";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { ScrollPattern } from "@/components/motion/ScrollPattern";
import { ScrollDrivenText } from "@/components/motion/ScrollDrivenText";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

type ServiceGridVariant = "rows" | "cards";

interface ServiceGridProps {
  locale: Locale;
  heading: string;
  exploreLabel: string;
  variant?: ServiceGridVariant;
  className?: string;
}

/* ── Row Item (homepage: editorial portfolio list) ── */
function ServiceRow({
  service, locale, index,
}: { service: ServiceData; locale: Locale; index: number }) {
  const name = locale === "id" ? service.name_id : service.name_en;
  const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
  const slug = locale === "id" ? service.slug_id : service.slug_en;
  const servicesPath = locale === "id" ? "layanan" : "services";
  const href = `/${locale}/${servicesPath}/${slug}`;
  const prefersReduced = useReducedMotion();

  return (
    <ParallaxDepth speed={0.03 + index * 0.01} direction="up" scrubSmooth={0.5}>
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }}
    >
      <Link href={href} data-cursor-text="VIEW" className="service-row group">
        <span className="stat-number text-sm text-[--color-text-muted] tabular-nums w-8 shrink-0 group-hover:text-[--color-primary] transition-colors duration-300">
          {service.number}
        </span>
        <div className="flex-1 min-w-0">
          <span
            className="service-name mask-link text-heading-lg sm:text-heading-xl text-[--color-text-primary] block"
            data-text={name}
          >
            {name}
          </span>
          <span className="service-tagline text-sm text-[--color-text-secondary] block mt-1">
            {tagline}
          </span>
        </div>
        <div className="service-arrow shrink-0 ml-4">
          <ArrowUpRight className="size-6" strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
    </ParallaxDepth>
  );
}

/* ── Card Item (services overview: glass card grid with shine) ── */
function ServiceCard({
  service, locale, index,
}: { service: ServiceData; locale: Locale; index: number }) {
  const name = locale === "id" ? service.name_id : service.name_en;
  const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
  const slug = locale === "id" ? service.slug_id : service.slug_en;
  const servicesPath = locale === "id" ? "layanan" : "services";
  const href = `/${locale}/${servicesPath}/${slug}`;
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefersReduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty("--mouse-x", `${x}%`);
      cardRef.current.style.setProperty("--mouse-y", `${y}%`);
    },
    [prefersReduced],
  );

  return (
    <ParallaxDepth speed={0.03 + index * 0.012} direction="up" scrubSmooth={0.4}>
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.07 }}
    >
      <Link
        ref={cardRef}
        href={href}
        data-cursor-text="VIEW"
        onMouseMove={handleMouseMove}
        className="group block glass-dark card-shine p-6 sm:p-8 h-full"
      >
        <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
          <span className="label-text text-[--color-primary] tabular-nums">{service.number}</span>
          <div className="size-9 rounded-full border border-[rgba(255,255,255,0.12)] flex items-center justify-center group-hover:border-[--color-primary] group-hover:bg-[rgba(255,70,0,0.10)] transition-all duration-300">
            <ArrowRight className="size-4 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={1.5} />
          </div>
        </div>
        <h3
          className="relative z-10 text-heading-md text-[--color-text-primary] group-hover:text-white transition-colors duration-300 mb-3 mask-link"
          data-text={name}
        >
          {name}
        </h3>
        <p className="relative z-10 text-sm text-[--color-text-muted] group-hover:text-[--color-text-secondary] transition-colors duration-300 leading-relaxed">
          {tagline}
        </p>
      </Link>
    </motion.div>
    </ParallaxDepth>
  );
}

function ServiceGrid({
  locale, heading, exploreLabel, variant = "rows", className,
}: ServiceGridProps) {
  return (
    <GSAPProvider>
      <section className={cn(
        "relative overflow-hidden",
        variant === "rows" ? "py-28 sm:py-40 section-elevated" : "py-28 sm:py-36 section-deep",
        className,
      )}>
        <ScrollDrivenText
          text="SERVICES"
          className="absolute top-[35%] -translate-y-1/2 z-[1]"
          speed={0.2}
          direction="left"
        />
        <ScrollPattern variant={variant === "rows" ? "grid" : "dots"} count={12} speed={0.07} />
        {variant === "cards" && (
          <div className="absolute top-0 left-0 right-0 divider-subtle" aria-hidden="true" />
        )}

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Header */}
          {variant === "rows" ? (
            /* Rows variant: asymmetric heading split */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
              <div className="md:col-span-7">
                <SplitTextReveal
                  as="h2" type="words" stagger={0.04}
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
          ) : (
            /* Cards variant: centered heading — TextRevealByLine (unique: centered heading context, stagger 0.05) */
            <div className="mb-14 sm:mb-18">
              <TextRevealByLine
                as="h2" staggerDelay={0.05}
                className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-inverse] tracking-[-0.03em]"
              >
                {heading}
              </TextRevealByLine>
            </div>
          )}

          {/* Content */}
          {variant === "rows" ? (
            <div>
              {services.map((service, i) => (
                <ServiceRow key={service.key} service={service} locale={locale} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services.map((service, i) => (
                <ServiceCard key={service.key} service={service} locale={locale} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ServiceGrid, type ServiceGridProps, type ServiceGridVariant };
