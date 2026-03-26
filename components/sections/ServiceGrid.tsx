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
import { services, type ServiceData } from "@/lib/content/services";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
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
  index,
}: {
  service: ServiceData;
  locale: Locale;
  exploreLabel: string;
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

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 60, scale: 0.85, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
    >
      <MagneticElement strength={0.1}>
        <Link
          ref={cardRef}
          href={href}
          data-cursor-text="VIEW"
          className={cn(
            "group relative flex flex-col glass-dark card-shine p-6 sm:p-7",
            "[transition:transform_250ms_ease-out,border-color_300ms_ease-out,box-shadow_300ms_ease-out,background_300ms_ease-out]",
            "hover:-translate-y-1.5 hover:border-[rgba(255,70,0,0.35)] hover:shadow-[0_0_60px_rgba(255,70,0,0.15),0_8px_40px_rgba(255,70,0,0.08)] hover:bg-[rgba(255,255,255,0.07)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
            "h-full",
          )}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated gradient border overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none gradient-border" />

          {/* Giant watermark icon */}
          {Icon && (
            <div className="absolute -bottom-4 -right-4 pointer-events-none" aria-hidden="true">
              <Icon className="size-32 sm:size-40 text-[--color-primary] opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500" />
            </div>
          )}

          {/* Small icon badge + number row */}
          <div className="relative z-10 flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center size-11 rounded-xl bg-[rgba(255,70,0,0.10)] group-hover:bg-[rgba(255,70,0,0.18)] group-hover:shadow-[0_0_24px_rgba(255,70,0,0.25)] transition-all duration-300">
              {Icon && <Icon className="size-5 text-[--color-primary]" />}
            </div>
            <span className="label-text text-[--color-text-secondary]">
              {service.number}
            </span>
          </div>

          {/* Name */}
          <h3 className="relative z-10 text-lg font-semibold text-[--color-text-primary] mb-2 group-hover:text-white transition-colors duration-200">
            {name}
          </h3>

          {/* Tagline */}
          <p className="relative z-10 text-sm text-[--color-text-secondary] mb-auto group-hover:text-[--color-text-primary] transition-colors duration-300">{tagline}</p>

          {/* Explore link with arrow slide-in */}
          <span className="relative z-10 mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,70,0,0.15)] inline-flex items-center gap-2 text-sm font-semibold text-[--color-primary] transition-all duration-300 w-full">
            {exploreLabel}
            <ArrowRight className="size-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" aria-hidden="true" />
          </span>
        </Link>
      </MagneticElement>
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
      <section className={cn("py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden", className)}>
        {/* Dot grid pattern background */}
        <div className="absolute inset-0 dot-grid-subtle pointer-events-none" aria-hidden="true" />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <motion.p
            className="label-text text-[--color-primary] text-center mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            {locale === "id" ? "Layanan Kami" : "Our Services"}
          </motion.p>
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="text-heading-lg sm:text-heading-xl font-bold gradient-text text-center max-w-3xl mx-auto mb-16 sm:mb-20 tracking-[-0.03em]"
          >
            {heading}
          </SplitTextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.key}
                service={service}
                locale={locale}
                exploreLabel={exploreLabel}
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
