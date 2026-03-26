"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
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
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      <Link
        ref={cardRef}
        href={href}
        data-cursor-text="VIEW"
        onMouseMove={handleMouseMove}
        className="group block card-elevated card-shine p-6 sm:p-8 h-full"
      >
        <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
          <span className="label-text text-[--color-primary] tabular-nums">
            {service.number}
          </span>
          <div className="circle-cta !w-10 !h-10 !shadow-none opacity-50 group-hover:opacity-100 group-hover:!shadow-[0_0_20px_rgba(255,70,0,0.25)] transition-all duration-300">
            <ArrowRight
              className="size-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
              strokeWidth={2}
            />
          </div>
        </div>
        <h3 className="relative z-10 text-heading-md text-[--color-text-primary] group-hover:text-white transition-colors duration-300 mb-3">
          {name}
        </h3>
        <p className="relative z-10 text-sm text-[--color-text-muted] group-hover:text-[--color-text-secondary] transition-colors duration-300 leading-relaxed">
          {tagline}
        </p>
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
      <section className={cn("py-28 sm:py-36 section-elevated relative", className)}>
        {/* Ambient depth */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[40vw] h-[40vw] top-[10%] right-[-10%] opacity-[0.06]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Section header */}
          <div className="mb-16 sm:mb-20">
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
              className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] max-w-3xl tracking-[-0.03em]"
            >
              {heading}
            </SplitTextReveal>
          </div>

          {/* Service grid — elevated cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
