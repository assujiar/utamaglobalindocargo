"use client";

import { motion } from "framer-motion";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollVelocityText } from "@/components/motion/ScrollVelocityText";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";

// ─── Value Proposition Section ───

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
      <section className="py-28 sm:py-40 section-dark relative overflow-hidden">
        {/* Ambient depth */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle-warm absolute w-[60vw] h-[60vw] top-[-20%] right-[-20%]" />
        </div>
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Large editorial text with word reveal */}
          <TextRevealByLine
            as="p"
            className="text-heading-xl sm:text-display-sm text-[--color-text-primary] max-w-4xl leading-[1.15] font-light tracking-[-0.02em]"
          >
            {valueProp}
          </TextRevealByLine>

          {/* Metrics — elevated card row */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {metrics.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-elevated !p-5 sm:!p-6">
                  <span className="stat-number text-3xl sm:text-4xl gradient-text-vivid block">
                    {item.value}
                  </span>
                  <span className="text-xs text-[--color-text-muted] mt-2 block">
                    {item.label}
                  </span>
                </div>
              </ScrollReveal>
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
      ? "FREIGHT FORWARDING \u2022 KEPABEANAN \u2022 PERGUDANGAN \u2022 DISTRIBUSI \u2022 KARGO PROYEK \u2022 CHARTER \u2022"
      : "FREIGHT FORWARDING \u2022 CUSTOMS CLEARANCE \u2022 WAREHOUSING \u2022 DISTRIBUTION \u2022 PROJECT CARGO \u2022 CHARTER \u2022";

  return (
    <GSAPProvider>
      <div className="py-6 section-dark border-y border-[rgba(255,255,255,0.06)] overflow-hidden relative">
        {/* Subtle glow on track */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[30vw] h-[30vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />
        </div>
        <ScrollVelocityText
          baseVelocity={50}
          repeat={5}
          direction="left"
          className="text-[64px] sm:text-[100px] md:text-[140px] font-bold text-[rgba(255,255,255,0.04)] leading-none select-none font-display tracking-tighter"
        >
          {text}
        </ScrollVelocityText>
      </div>
    </GSAPProvider>
  );
}

// ─── Editorial Section ───

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
        {/* Rich ambient blur */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[50vw] h-[50vw] top-[20%] left-[-10%] opacity-[0.08]" />
          <div className="blur-circle-warm absolute w-[30vw] h-[30vw] bottom-[10%] right-[5%] opacity-[0.05]" />
        </div>
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Two-column editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Left: heading */}
            <div className="md:col-span-5">
              <motion.p
                className="label-text text-[--color-primary] mb-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {locale === "id" ? "Jangkauan" : "Coverage"}
              </motion.p>
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.05}
                className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] tracking-[-0.03em]"
              >
                {heading}
              </SplitTextReveal>
            </div>

            {/* Right: description + CTA */}
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <TextRevealByLine
                as="p"
                className="text-lg text-[--color-text-secondary] leading-relaxed mb-8"
                staggerDelay={0.06}
              >
                {description}
              </TextRevealByLine>
              <ScrollReveal delay={200}>
                <MagneticElement strength={0.2}>
                  <Button
                    href={getLocalizedPath("services", locale)}
                    variant="secondary"
                  >
                    {ctaLabel}
                  </Button>
                </MagneticElement>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}
