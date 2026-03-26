"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
  return (
    <GSAPProvider>
      <section
        className={cn(
          "py-28 sm:py-36 text-center relative overflow-hidden bg-[--color-bg-dark]",
          className,
        )}
      >
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[--color-primary] opacity-[0.04] blur-[200px]" />
        </div>

        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.04}
            className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] mb-6 tracking-[-0.03em]"
          >
            {heading}
          </SplitTextReveal>

          <ScrollReveal delay={200}>
            <p className="text-base sm:text-lg text-[--color-text-secondary] mb-10 max-w-md mx-auto leading-relaxed">
              {trustLine}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <MagneticElement strength={0.25}>
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            </MagneticElement>
          </ScrollReveal>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { CTABand, type CTABandProps };
