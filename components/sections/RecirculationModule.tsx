"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import {
  Truck,
  Globe,
  FileCheck,
  Plane,
  Warehouse,
  Container,
  ArrowRight,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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

function RelatedServiceCard({
  service,
  locale,
  index,
}: {
  service: { key: string; name_id: string; name_en: string; tagline_id: string; tagline_en: string; slug_id: string; slug_en: string; icon: string };
  locale: Locale;
  index: number;
}) {
  const name = locale === "id" ? service.name_id : service.name_en;
  const tagline = locale === "id" ? service.tagline_id : service.tagline_en;
  const slug = locale === "id" ? service.slug_id : service.slug_en;
  const servicesPath = locale === "id" ? "layanan" : "services";
  const href = `/${locale}/${servicesPath}/${slug}`;
  const Icon = iconMap[service.icon];
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <Link
        ref={cardRef}
        href={href}
        className="group glass-dark card-shine p-5 sm:p-6 flex flex-col [transition:transform_200ms_ease-out,border-color_300ms,box-shadow_300ms,background_300ms] hover:border-[rgba(255,70,0,0.30)] hover:shadow-[0_0_50px_rgba(255,70,0,0.12)] hover:bg-[rgba(255,255,255,0.07)] h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative z-10 flex items-center gap-3 mb-3">
          {Icon && (
            <div className="flex items-center justify-center size-9 rounded-lg bg-[rgba(255,70,0,0.10)] group-hover:bg-[rgba(255,70,0,0.20)] group-hover:shadow-[0_0_20px_rgba(255,70,0,0.15)] transition-all duration-300">
              <Icon className="size-4.5 text-[--color-primary]" />
            </div>
          )}
          <h3 className="relative z-10 text-base font-semibold text-[--color-text-primary] group-hover:text-white transition-colors duration-200">
            {name}
          </h3>
        </div>
        <p className="relative z-10 text-sm text-[--color-text-secondary] mb-4 leading-relaxed group-hover:text-[--color-text-primary] transition-colors duration-300">
          {tagline}
        </p>
        <span className="relative z-10 mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[--color-primary] group-hover:gap-3 transition-all duration-300">
          {locale === "id" ? "Jelajahi" : "Explore"}
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
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
    <section className={cn("py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden", className)}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid-subtle pointer-events-none" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] text-center mb-4">
            {locale === "id" ? "Layanan Terkait" : "Related Services"}
          </p>
          <h2 className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-14 sm:mb-18 tracking-[-0.02em]">
            {relatedHeading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
          {relatedServices.map((service, i) => {
            if (!service) return null;
            return (
              <RelatedServiceCard
                key={service.key}
                service={service}
                locale={locale}
                index={i}
              />
            );
          })}
        </div>

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
