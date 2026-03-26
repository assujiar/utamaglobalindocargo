"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

type CTAVariant = "centered" | "split" | "immersive";

interface CTABandProps {
  locale: Locale;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
  variant?: CTAVariant;
  className?: string;
}

/* ── Variant 1: Centered (homepage) ──
   Gradient mesh bg, word-by-word clip reveal, pulsing glow orb */
function CTACentered({ heading, ctaLabel, ctaHref, trustLine, className }: Omit<CTABandProps, "locale" | "variant">) {
  const prefersReduced = useReducedMotion();
  const words = heading.split(" ");

  return (
    <section className={cn("py-36 sm:py-52 relative overflow-hidden section-gradient-mesh", className)}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[70vw] h-[70vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(var(--color-primary) 0, transparent 65%)",
            opacity: 0.06,
            animation: prefersReduced ? "none" : "pulse-glow 10s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center">
        <h2 className="text-display-lg sm:text-display-xl font-bold text-[--color-text-inverse] tracking-[-0.05em] max-w-5xl mx-auto">
          {prefersReduced ? (
            <span>{heading}</span>
          ) : (
            words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                >
                  {word}
                </motion.span>
              </span>
            ))
          )}
        </h2>
        <motion.p
          className="text-base sm:text-lg text-[--color-text-secondary] mt-6 sm:mt-8 max-w-lg mx-auto leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {trustLine}
        </motion.p>
        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <MagneticElement strength={0.25}>
            <Button href={ctaHref} size="lg">{ctaLabel}</Button>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Variant 2: Split (services overview) ──
   Elevated warm bg, heading left + CTA right, accent line divider */
function CTASplit({ heading, ctaLabel, ctaHref, trustLine, className }: Omit<CTABandProps, "locale" | "variant">) {
  return (
    <section className={cn("py-28 sm:py-40 relative overflow-hidden section-elevated-warm", className)}>
      <div className="absolute top-0 left-0 right-0 divider-warm-accent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          {/* Left: heading */}
          <div className="md:col-span-7">
            <SplitTextReveal
              as="h2"
              type="words"
              stagger={0.04}
              className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] tracking-[-0.04em]"
            >
              {heading}
            </SplitTextReveal>
          </div>
          {/* Right: trust line + CTA */}
          <div className="md:col-span-4 md:col-start-9">
            <ScrollReveal delay={200}>
              <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-6">
                {trustLine}
              </p>
              <MagneticElement strength={0.2}>
                <Button href={ctaHref} size="lg">{ctaLabel}</Button>
              </MagneticElement>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Variant 3: Immersive (service detail) ──
   Glass-intense bg, glass panel wrapping content, scale entrance, center-fade divider */
function CTAImmersive({ heading, ctaLabel, ctaHref, trustLine, className }: Omit<CTABandProps, "locale" | "variant">) {
  const prefersReduced = useReducedMotion();

  return (
    <section className={cn("py-32 sm:py-48 relative overflow-hidden section-glass-intense", className)}>
      <div className="absolute top-0 left-0 right-0 divider-center-fade" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-10">
        <motion.div
          className="glass-tinted p-10 sm:p-14 text-center"
          initial={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.04}
            className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-inverse] tracking-[-0.03em] mb-5"
          >
            {heading}
          </SplitTextReveal>
          <p className="text-sm sm:text-base text-[--color-text-secondary] leading-relaxed mb-8 max-w-md mx-auto">
            {trustLine}
          </p>
          <MagneticElement strength={0.2}>
            <Button href={ctaHref} size="lg">{ctaLabel}</Button>
          </MagneticElement>
        </motion.div>
      </div>
    </section>
  );
}

function CTABand({ variant = "centered", ...props }: CTABandProps) {
  return (
    <GSAPProvider>
      {variant === "centered" && <CTACentered {...props} />}
      {variant === "split" && <CTASplit {...props} />}
      {variant === "immersive" && <CTAImmersive {...props} />}
    </GSAPProvider>
  );
}

export { CTABand, type CTABandProps, type CTAVariant };
