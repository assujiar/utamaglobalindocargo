"use client";

import { useEffect, useState } from "react";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollVelocityText } from "@/components/motion/ScrollVelocityText";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  Package,
  Shield,
  Compass,
  Globe,
  Truck,
  Ship,
  Plane,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/content/services";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";

interface HomeMotionSectionsProps {
  locale: Locale;
  content: {
    valueProp: string;
    serviceGrid: { heading: string; exploreLabel: string };
    proof: { badgesLabel: string };
    editorial: { heading: string; description: string; ctaLabel: string };
    ctaBand: {
      heading: string;
      ctaLabel: string;
      trustLine: string;
    };
  };
}

const serviceIcons: Record<string, React.ElementType> = {
  "distribusi-domestik": Truck,
  "domestic-distribution": Truck,
  "freight-internasional": Globe,
  "international-freight": Globe,
  "import-door-to-door": Ship,
  "import-dtd": Ship,
  "blockspace-charter": Plane,
  "blockspace-and-charter": Plane,
  "pergudangan-3pl": Warehouse,
  "warehousing-3pl": Warehouse,
  "kargo-proyek": Package,
  "project-cargo": Package,
};

export function ValuePropSection({
  locale,
  valueProp,
}: {
  locale: Locale;
  valueProp: string;
}) {
  return (
    <GSAPProvider>
      <section className="py-24 sm:py-32 bg-[--color-bg-dark] relative overflow-hidden">
        {/* Giant watermark with parallax */}
        <ParallaxDepth speed={0.15} direction="down">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          >
            <Package
              className="size-[300px] sm:size-[450px] text-[--color-primary] opacity-[0.015]"
              strokeWidth={0.3}
            />
          </div>
        </ParallaxDepth>

        <div
          className="absolute inset-0 dot-grid-subtle pointer-events-none"
          aria-hidden="true"
        />
        <ParallaxDepth speed={0.1} direction="up">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-accent-warm] opacity-[0.05] blur-[160px]" />
          </div>
        </ParallaxDepth>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Text reveal with GSAP split text */}
          <TextRevealByLine
            as="p"
            className="text-xl sm:text-2xl md:text-3xl text-[--color-text-secondary] text-center max-w-3xl mx-auto leading-relaxed font-light mb-16"
          >
            {valueProp}
          </TextRevealByLine>

          {/* Metric cards with magnetic hover */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🌏",
                value: "150+",
                label: locale === "id" ? "Negara Tujuan" : "Countries",
              },
              {
                icon: "🏝️",
                value: "34",
                label: locale === "id" ? "Provinsi" : "Provinces",
              },
              {
                icon: "📦",
                value: "25+",
                label: locale === "id" ? "Tahun" : "Years",
              },
              {
                icon: "✈️",
                value: "6",
                label: locale === "id" ? "Layanan" : "Services",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <MagneticElement strength={0.2}>
                  <div className="glass-dark p-4 sm:p-5 text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <span className="stat-number text-2xl sm:text-3xl gradient-text block">
                      {item.value}
                    </span>
                    <span className="label-text text-[--color-text-secondary] text-[10px] mt-1 block">
                      {item.label}
                    </span>
                  </div>
                </MagneticElement>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export function ServiceGridGSAP({
  locale,
  heading,
  exploreLabel,
}: {
  locale: Locale;
  heading: string;
  exploreLabel: string;
}) {
  return (
    <GSAPProvider>
      <section className="py-28 sm:py-36 bg-[--color-bg-dark-elevated] relative overflow-hidden">
        <div
          className="absolute inset-0 dot-grid-subtle pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 glow-divider-full"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <SplitTextReveal
            as="h2"
            type="words"
            className="text-heading-lg sm:text-heading-xl font-bold text-center mb-16 tracking-[-0.02em] text-[--color-text-primary]"
          >
            {heading}
          </SplitTextReveal>

          {/* Horizontal scroll service cards on desktop */}
          <div className="hidden md:block">
            <HorizontalScroll
              className="min-h-[70vh]"
              panelClassName="items-center gap-6 px-10"
            >
              {services.map((service) => {
                const slug = locale === "id" ? service.slug_id : service.slug_en;
                const Icon = serviceIcons[slug] || Package;
                return (
                  <MagneticElement
                    key={service.key}
                    strength={0.15}
                    className="shrink-0 w-[400px]"
                  >
                    <a
                      href={`/${locale}/${locale === "id" ? "layanan" : "services"}/${slug}`}
                      className="glass-dark p-8 block h-full relative group"
                    >
                      <div className="absolute top-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300">
                        <Icon className="size-24" strokeWidth={0.5} />
                      </div>
                      <p className="label-text text-[--color-primary] mb-3">
                        {locale === "id" ? service.name_id : service.name_en}
                      </p>
                      <h3 className="text-xl font-semibold text-[--color-text-primary] mb-3">
                        {locale === "id"
                          ? service.tagline_id
                          : service.tagline_en}
                      </h3>
                      <p className="text-[--color-text-secondary] text-sm leading-relaxed mb-6">
                        {locale === "id"
                          ? service.description_id
                          : service.description_en}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm text-[--color-primary] font-medium group-hover:gap-3 transition-all duration-200">
                        {exploreLabel}
                        <ArrowRight className="size-4" />
                      </span>
                    </a>
                  </MagneticElement>
                );
              })}
            </HorizontalScroll>
          </div>

          {/* Mobile: vertical stacked cards */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {services.map((service, i) => {
              const slug = locale === "id" ? service.slug_id : service.slug_en;
              const Icon = serviceIcons[slug] || Package;
              return (
                <ScrollReveal key={service.key} delay={i * 60}>
                  <a
                    href={`/${locale}/${locale === "id" ? "layanan" : "services"}/${slug}`}
                    className="glass-dark p-6 block relative group"
                  >
                    <div className="absolute top-3 right-3 opacity-[0.04]">
                      <Icon className="size-16" strokeWidth={0.5} />
                    </div>
                    <p className="label-text text-[--color-primary] mb-2 text-[10px]">
                      {locale === "id" ? service.name_id : service.name_en}
                    </p>
                    <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">
                      {locale === "id"
                        ? service.tagline_id
                        : service.tagline_en}
                    </h3>
                    <p className="text-[--color-text-secondary] text-sm leading-relaxed mb-4">
                      {locale === "id"
                        ? service.description_id
                        : service.description_en}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[--color-primary] font-medium">
                      {exploreLabel}
                      <ArrowRight className="size-4" />
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export function VelocityMarquee({ locale }: { locale: Locale }) {
  const text =
    locale === "id"
      ? "FREIGHT FORWARDING \u2022 KEPABEANAN \u2022 PERGUDANGAN \u2022 DISTRIBUSI \u2022 KARGO PROYEK \u2022 CHARTER \u2022"
      : "FREIGHT FORWARDING \u2022 CUSTOMS CLEARANCE \u2022 WAREHOUSING \u2022 DISTRIBUTION \u2022 PROJECT CARGO \u2022 CHARTER \u2022";

  return (
    <GSAPProvider>
      <div className="py-8 bg-[--color-bg-dark] border-y border-[rgba(255,255,255,0.04)] overflow-hidden">
        <ScrollVelocityText
          baseVelocity={60}
          repeat={5}
          className="text-[80px] sm:text-[120px] md:text-[160px] font-black text-[rgba(255,255,255,0.025)] leading-none select-none font-display tracking-tight"
        >
          {text}
        </ScrollVelocityText>
      </div>
    </GSAPProvider>
  );
}

export function EditorialSection({
  locale,
  heading,
  description,
  ctaLabel,
}: {
  locale: Locale;
  heading: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <GSAPProvider>
      <section
        className="py-28 sm:py-36 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #09090B 0%, #0f0805 50%, #09090B 100%)",
        }}
      >
        {/* Giant watermark with parallax */}
        <ParallaxDepth speed={0.2} direction="up" rotate={{ from: 10, to: 25 }}>
          <div
            className="absolute bottom-[5%] left-[3%] pointer-events-none"
            aria-hidden="true"
          >
            <Compass
              className="size-[200px] sm:size-[300px] text-[--color-accent-warm] opacity-[0.02]"
              strokeWidth={0.4}
            />
          </div>
        </ParallaxDepth>

        <div
          className="absolute top-0 left-0 right-0 glow-divider-full"
          aria-hidden="true"
        />
        <ParallaxDepth speed={0.12} direction="down">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[180px]" />
          </div>
        </ParallaxDepth>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <MagneticElement strength={0.08}>
            <div className="glass-tinted p-10 sm:p-14 max-w-2xl mx-auto text-center">
              <p className="label-text text-[--color-primary] mb-4">
                Spotlight
              </p>
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.06}
                className="text-heading-md sm:text-heading-lg font-bold gradient-text mb-5 tracking-[-0.02em]"
              >
                {heading}
              </SplitTextReveal>
              <TextRevealByLine
                as="p"
                className="text-[--color-text-secondary] mb-8 leading-relaxed text-lg"
                staggerDelay={0.08}
              >
                {description}
              </TextRevealByLine>
              <ScrollReveal delay={300}>
                <Button
                  href={getLocalizedPath("services", locale)}
                  variant="secondary"
                >
                  {ctaLabel}
                </Button>
              </ScrollReveal>
            </div>
          </MagneticElement>
        </div>
      </section>
    </GSAPProvider>
  );
}

export function CTABandGSAP({
  locale,
  heading,
  ctaLabel,
  ctaHref,
  trustLine,
}: {
  locale: Locale;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
}) {
  return (
    <GSAPProvider>
      <section className="py-28 sm:py-36 relative overflow-hidden bg-[--color-bg-dark]">
        {/* Animated gradient orbs with parallax */}
        <ParallaxDepth speed={0.2} direction="up">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[--color-primary] opacity-[0.08] blur-[140px] animate-[glow-pulse-intense_4s_ease-in-out_infinite]" />
          </div>
        </ParallaxDepth>
        <ParallaxDepth speed={0.15} direction="down">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[--color-accent-warm] opacity-[0.06] blur-[120px] animate-[glow-pulse-intense_5s_ease-in-out_infinite_1s]" />
          </div>
        </ParallaxDepth>

        <div
          className="absolute top-0 left-0 right-0 glow-divider-full"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 grain-overlay pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center">
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.05}
            className="text-heading-lg sm:text-heading-xl font-bold gradient-text-vivid mb-8 tracking-[-0.02em]"
          >
            {heading}
          </SplitTextReveal>

          <ScrollReveal delay={200}>
            <p className="text-[--color-text-secondary] mb-10 text-lg max-w-xl mx-auto">
              {trustLine}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <MagneticElement strength={0.25}>
              <Button href={ctaHref} variant="primary" size="lg">
                {ctaLabel}
              </Button>
            </MagneticElement>
          </ScrollReveal>
        </div>
      </section>
    </GSAPProvider>
  );
}
