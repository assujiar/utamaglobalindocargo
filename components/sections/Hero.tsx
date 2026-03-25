"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Hero({
  locale,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  className,
}: HeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className={cn(
        "relative flex min-h-[70vh] md:min-h-screen items-center justify-center overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Ambient floating gradient shapes — desktop only */}
      {!prefersReduced && (
        <div className="absolute inset-0 hidden md:block pointer-events-none" aria-hidden="true">
          <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-[--color-primary]/8 blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-[--color-primary]/5 blur-[100px] animate-[float_16s_ease-in-out_infinite_reverse]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center">
        <motion.h1
          className="font-display text-[48px] leading-[1.0] sm:text-[72px] md:text-[96px] text-[--color-text-inverse] max-w-4xl mx-auto"
          initial={prefersReduced ? undefined : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-[--color-text-secondary] max-w-2xl mx-auto"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          {subline}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-[--color-text-secondary]">
          Scroll
        </span>
        <ChevronDown
          className="size-5 text-[--color-text-secondary] animate-bounce"
          aria-hidden="true"
        />
      </div>

      {/* Sentinel for MobileBottomBar IntersectionObserver */}
      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
