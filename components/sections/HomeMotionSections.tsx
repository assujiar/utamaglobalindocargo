"use client";

import { motion } from "framer-motion";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollVelocityText } from "@/components/motion/ScrollVelocityText";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import {
  Package,
  Compass,
  Globe,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";

// ─── Icon map for metric cards ───
const metricIcons = [Globe, MapPin, Clock, Layers];

// ─── Value Proposition Section (GSAP: TextRevealByLine + MagneticElement) ───

export function ValuePropSection({
  locale,
  valueProp,
  metrics,
}: {
  locale: Locale;
  valueProp: string;
  metrics: readonly { value: string; label: string }[];
}) {
  return (
    <GSAPProvider>
      <section className="py-24 sm:py-32 bg-[--color-bg-dark] relative overflow-hidden">
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
          <TextRevealByLine
            as="p"
            className="text-xl sm:text-2xl md:text-3xl text-[--color-text-secondary] text-center max-w-3xl mx-auto leading-relaxed font-light mb-16"
          >
            {valueProp}
          </TextRevealByLine>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((item, i) => {
              const Icon = metricIcons[i] || Globe;
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <MagneticElement strength={0.2}>
                    <div className="glass-dark p-5 sm:p-6 text-center">
                      <Icon
                        className="size-5 text-[--color-primary] mx-auto mb-3"
                        strokeWidth={1.5}
                      />
                      <span className="stat-number text-3xl sm:text-4xl gradient-text block mb-1">
                        {item.value}
                      </span>
                      <span className="label-text text-[--color-text-secondary] text-[10px] block">
                        {item.label}
                      </span>
                    </div>
                  </MagneticElement>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

// ─── Velocity Marquee (GSAP: ScrollVelocityText) ───

export function VelocityMarquee({ locale }: { locale: Locale }) {
  const text =
    locale === "id"
      ? "FREIGHT FORWARDING \u2022 KEPABEANAN \u2022 PERGUDANGAN \u2022 DISTRIBUSI \u2022 KARGO PROYEK \u2022 CHARTER \u2022"
      : "FREIGHT FORWARDING \u2022 CUSTOMS CLEARANCE \u2022 WAREHOUSING \u2022 DISTRIBUTION \u2022 PROJECT CARGO \u2022 CHARTER \u2022";

  const textSecondary =
    locale === "id"
      ? "IMPOR \u2022 EKSPOR \u2022 DOOR-TO-DOOR \u2022 SEWA GUDANG \u2022 HEAVY LIFT \u2022 BERSERTIFIKASI WCA & IATA \u2022"
      : "IMPORT \u2022 EXPORT \u2022 DOOR-TO-DOOR \u2022 WAREHOUSE LEASE \u2022 HEAVY LIFT \u2022 WCA & IATA CERTIFIED \u2022";

  return (
    <GSAPProvider>
      <div className="py-6 bg-[--color-bg-dark] border-y border-[rgba(255,255,255,0.04)] overflow-hidden space-y-2">
        <ScrollVelocityText
          baseVelocity={60}
          repeat={5}
          direction="left"
          className="text-[80px] sm:text-[120px] md:text-[160px] font-black text-[rgba(255,255,255,0.025)] leading-none select-none font-display tracking-tight"
        >
          {text}
        </ScrollVelocityText>
        <ScrollVelocityText
          baseVelocity={40}
          repeat={5}
          direction="right"
          className="text-[48px] sm:text-[72px] md:text-[96px] font-black text-[rgba(255,70,0,0.03)] leading-none select-none font-display tracking-tight"
        >
          {textSecondary}
        </ScrollVelocityText>
      </div>
    </GSAPProvider>
  );
}

// ─── Editorial Section (GSAP: SplitTextReveal, ParallaxDepth, MagneticElement) ───

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
              <motion.p
                className="label-text text-[--color-primary] mb-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              >
                Spotlight
              </motion.p>
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
