"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";

// ─── Services Hero Section ───

interface ServicesHeroProps {
  headline: string;
  subline: string;
  breadcrumbItems: readonly { label: string; href?: string }[];
}

export function ServicesHero({
  headline,
  subline,
  breadcrumbItems,
}: ServicesHeroProps) {
  return (
    <GSAPProvider>
      <section className="pt-8 pb-24 sm:pt-12 sm:pb-32 bg-[--color-bg-dark] relative overflow-hidden">
        <div
          className="absolute inset-0 gradient-mesh-intense pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 grain-overlay pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb items={breadcrumbItems as { label: string; href?: string }[]} />
          <div className="mt-8 max-w-3xl mx-auto text-center">
            <SplitTextReveal
              as="h1"
              type="words"
              stagger={0.06}
              className="font-display text-heading-xl sm:text-display-sm font-bold gradient-text-vivid mb-5 tracking-[-0.03em]"
            >
              {headline}
            </SplitTextReveal>
            <TextRevealByLine
              as="p"
              className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed"
              staggerDelay={0.08}
            >
              {subline}
            </TextRevealByLine>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent"
          aria-hidden="true"
        />
      </section>
    </GSAPProvider>
  );
}

// ─── Cross-Service Value Section ───

interface CrossValueSectionProps {
  label: string;
  heading: string;
  points: readonly string[];
}

function CrossValueHeading({ heading }: { heading: string }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.h2
      className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-12 tracking-[-0.02em]"
      initial={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {heading}
    </motion.h2>
  );
}

export function CrossValueSection({
  label,
  heading,
  points,
}: CrossValueSectionProps) {
  return (
    <GSAPProvider>
      <section
        className="py-24 sm:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #09090B 0%, #0f0805 50%, #09090B 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 right-0 w-[400px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[720px] px-5 sm:px-10">
          <p className="label-text text-[--color-primary] text-center mb-4">
            {label}
          </p>
          <CrossValueHeading heading={heading} />

          <ul className="space-y-5">
            {points.map((point, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-2 rounded-full bg-[--color-primary] shrink-0 shadow-[0_0_10px_rgba(255,70,0,0.4)]" />
                  <p className="text-[--color-text-secondary] leading-relaxed text-lg">
                    {point}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </GSAPProvider>
  );
}
