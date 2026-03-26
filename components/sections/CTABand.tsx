"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

interface CTABandProps {
  locale: Locale;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
  className?: string;
}

function CTABand({
  heading,
  ctaLabel,
  ctaHref,
  trustLine,
  className,
}: CTABandProps) {
  const prefersReduced = useReducedMotion();
  const words = heading.split(" ");

  return (
    <GSAPProvider>
      <section
        className={cn(
          "py-36 sm:py-52 relative overflow-hidden section-gradient-mesh",
          className,
        )}
      >
        {/* Pulsing ambient glow */}
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

        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Ultra-large heading — word-by-word reveal, centered */}
          <h2 className="text-display-lg sm:text-display-xl font-bold text-[--color-text-inverse] tracking-[-0.05em] text-center max-w-5xl mx-auto">
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
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.04,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))
            )}
          </h2>

          <motion.p
            className="text-base sm:text-lg text-[--color-text-secondary] mt-6 sm:mt-8 max-w-lg mx-auto text-center leading-relaxed"
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <MagneticElement strength={0.25}>
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            </MagneticElement>
          </motion.div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { CTABand, type CTABandProps };
