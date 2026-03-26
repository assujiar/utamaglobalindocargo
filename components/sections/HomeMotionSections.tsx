"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollVelocityText } from "@/components/motion/ScrollVelocityText";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";

// ─── Value Proposition Section (LIGHT BACKGROUND — contrast break) ───

export function ValuePropSection({
  locale,
  valueProp,
  metrics,
}: {
  locale: Locale;
  valueProp: string;
  metrics: readonly { value: string; label: string }[];
}) {
  const prefersReduced = useReducedMotion();

  return (
    <GSAPProvider>
      <section className="py-32 sm:py-44 section-light relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Full-width editorial text — no label, just massive text */}
          <TextRevealByLine
            as="p"
            className="text-heading-xl sm:text-display-sm font-light leading-[1.2] tracking-[-0.02em] max-w-5xl"
            staggerDelay={0.06}
          >
            {valueProp}
          </TextRevealByLine>

          {/* Metrics row — clean horizontal layout */}
          <div className="mt-20 sm:mt-28 flex flex-wrap gap-x-12 sm:gap-x-20 gap-y-10">
            {metrics.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.08 }}
              >
                <span className="stat-number text-4xl sm:text-5xl text-[--color-primary] block leading-none">
                  {item.value}
                </span>
                <span className="text-xs text-[--color-text-secondary] mt-2 block tracking-wide uppercase">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

// ─── Velocity Marquee ───

export function VelocityMarquee({ locale }: { locale: Locale }) {
  const text =
    locale === "id"
      ? "FREIGHT FORWARDING • KEPABEANAN • PERGUDANGAN • DISTRIBUSI • KARGO PROYEK • CHARTER •"
      : "FREIGHT FORWARDING • CUSTOMS CLEARANCE • WAREHOUSING • DISTRIBUTION • PROJECT CARGO • CHARTER •";

  return (
    <GSAPProvider>
      <div className="py-4 section-dark border-y border-[rgba(255,255,255,0.06)] overflow-hidden relative">
        <ScrollVelocityText
          baseVelocity={50}
          repeat={5}
          direction="left"
          className="text-[64px] sm:text-[100px] md:text-[140px] font-bold text-[rgba(255,255,255,0.03)] leading-none select-none font-display tracking-tighter"
        >
          {text}
        </ScrollVelocityText>
      </div>
    </GSAPProvider>
  );
}

// ─── Editorial Section (reversed layout, dark) ───

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
      <section className="py-28 sm:py-40 section-dark relative overflow-hidden">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-[60vw] h-[60vw] top-[10%] right-[-20%] rounded-full"
            style={{
              background: "radial-gradient(var(--color-primary) 0, transparent 70%)",
              opacity: 0.04,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Reversed asymmetric — description left, heading right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Left: description + CTA (narrower) */}
            <div className="md:col-span-4 flex flex-col justify-between order-2 md:order-1">
              <div>
                <motion.p
                  className="label-text text-[--color-primary] mb-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {locale === "id" ? "Jangkauan" : "Coverage"}
                </motion.p>
                <TextRevealByLine
                  as="p"
                  className="text-base sm:text-lg text-[--color-text-secondary] leading-relaxed"
                  staggerDelay={0.06}
                >
                  {description}
                </TextRevealByLine>
              </div>
              <ScrollReveal delay={200}>
                <div className="mt-8">
                  <MagneticElement strength={0.2}>
                    <Button
                      href={getLocalizedPath("services", locale)}
                      variant="secondary"
                    >
                      {ctaLabel}
                    </Button>
                  </MagneticElement>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: big heading (wider) */}
            <div className="md:col-span-7 md:col-start-6 order-1 md:order-2">
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.05}
                className="text-display-md sm:text-display-lg font-bold text-[--color-text-inverse] tracking-[-0.04em]"
              >
                {heading}
              </SplitTextReveal>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}
