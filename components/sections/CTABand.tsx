"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
    <section
      className={cn(
        "py-24 sm:py-32 bg-[--color-bg-dark] text-center relative overflow-hidden",
        className,
      )}
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[--color-primary] opacity-[0.04] blur-[200px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[--color-accent-warm] opacity-[0.03] blur-[160px]" />
      </div>

      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.15)] to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-inverse] mb-4 tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-[--color-text-secondary] mb-10 max-w-xl mx-auto leading-relaxed">
            {trustLine}
          </p>
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { CTABand, type CTABandProps };
