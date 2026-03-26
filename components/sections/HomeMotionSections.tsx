"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ScrollVelocityText } from "@/components/motion/ScrollVelocityText";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { Button } from "@/components/ui/Button";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";

// ─── Value Proposition Section ───
// UNIQUE: Light cream bg, NO label, line-by-line scroll-scrub, horizontal metrics

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
        {/* NO divider — clean edge from Hero */}

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Full-width editorial text — no label, just text */}
          <TextRevealByLine
            as="p"
            className="text-heading-xl sm:text-display-sm font-light leading-[1.2] tracking-[-0.02em] max-w-5xl"
            staggerDelay={0.06}
          >
            {valueProp}
          </TextRevealByLine>

          {/* Metrics — horizontal pill layout with continuous scroll parallax */}
          <div className="mt-20 sm:mt-28 flex flex-wrap gap-x-12 sm:gap-x-20 gap-y-10">
            {metrics.map((item, i) => (
              <ParallaxDepth key={i} speed={0.04 + i * 0.02} direction="up" scrubSmooth={0.4}>
                <motion.div
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
              </ParallaxDepth>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

// ─── Velocity Marquee ───
// UNIQUE: Only section with infinite scroll motion, dark band with border-y

export function VelocityMarquee({ locale }: { locale: Locale }) {
  const text =
    locale === "id"
      ? "FREIGHT FORWARDING • KEPABEANAN • PERGUDANGAN • DISTRIBUSI • KARGO PROYEK • CHARTER •"
      : "FREIGHT FORWARDING • CUSTOMS CLEARANCE • WAREHOUSING • DISTRIBUTION • PROJECT CARGO • CHARTER •";

  return (
    <GSAPProvider>
      <div className="py-4 bg-[#060608] border-y border-[rgba(255,255,255,0.06)] overflow-hidden relative">
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

// ─── Editorial Heading (horizontal word slide) ───

function EditorialHeading({ heading }: { heading: string }) {
  const prefersReduced = useReducedMotion();
  const words = heading.split(" ");

  return (
    <h2 className="text-display-md sm:text-display-lg font-bold text-[--color-text-inverse] tracking-[-0.04em]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={prefersReduced ? undefined : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

// ─── Editorial Section ───
// UNIQUE: Reversed asymmetric with parallax depth layers, no divider

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
      <section className="py-28 sm:py-40 bg-[#0A0810] relative overflow-hidden">
        {/* Parallax gradient orb — unique depth layer */}
        <ParallaxDepth speed={-0.15} className="absolute inset-0 pointer-events-none" disabled={false}>
          <div
            className="absolute w-[50vw] h-[50vw] top-[10%] right-[-15%] rounded-full"
            style={{
              background: "radial-gradient(var(--color-primary) 0, transparent 70%)",
              opacity: 0.05,
            }}
          />
        </ParallaxDepth>

        {/* NO divider — clean transition from testimonials */}

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Reversed asymmetric — desc left 5col, heading right 7col */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            <div className="md:col-span-5 flex flex-col justify-between order-2 md:order-1">
              <ParallaxDepth speed={0.06} direction="up" scrubSmooth={0.5}>
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
              </ParallaxDepth>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MagneticElement strength={0.2}>
                  <Button
                    href={getLocalizedPath("services", locale)}
                    variant="secondary"
                  >
                    {ctaLabel}
                  </Button>
                </MagneticElement>
              </motion.div>
            </div>

            <div className="md:col-span-7 md:col-start-6 order-1 md:order-2">
              <ParallaxDepth speed={0.08} direction="down" scrubSmooth={0.5}>
                <EditorialHeading heading={heading} />
              </ParallaxDepth>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}
