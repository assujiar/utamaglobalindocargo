"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
const EASE_IN_OUT_EXPO: [number, number, number, number] = [0.77, 0, 0.175, 1];

function Hero({
  headline,
  subline,
  ctaLabel,
  ctaHref,
  className,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: glow orbs move slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Split headline into words for stagger animation
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[80vh] md:min-h-screen items-center justify-center overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />

      {/* Ambient glow orbs with parallax */}
      {!prefersReduced ? (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-[10%] left-[8%] w-[500px] h-[500px] rounded-full bg-[--color-primary] opacity-[0.10] blur-[140px]"
            style={{ y: orbY1 }}
            animate={{ x: [0, 20, -15, 0], y: [0, -30, 15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[12%] w-[400px] h-[400px] rounded-full bg-[--color-accent-warm] opacity-[0.07] blur-[120px]"
            style={{ y: orbY2 }}
            animate={{ x: [0, -25, 15, 0], y: [0, 20, -25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-[--color-accent-coral] opacity-[0.05] blur-[100px]"
            style={{ y: orbY3 }}
            animate={{ x: [0, 15, -10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ) : (
        /* Static orbs for reduced motion */
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[10%] left-[8%] w-[500px] h-[500px] rounded-full bg-[--color-primary] opacity-[0.10] blur-[140px]" />
          <div className="absolute bottom-[15%] right-[12%] w-[400px] h-[400px] rounded-full bg-[--color-accent-warm] opacity-[0.07] blur-[120px]" />
        </div>
      )}

      {/* Horizontal glow line accent */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.20)] to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center">
        {/* Label */}
        <motion.p
          className="label-text text-[--color-primary] mb-6"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          PT Utama Globalindo Cargo
        </motion.p>

        {/* Headline with word-split animation */}
        <h1 className="font-display text-[44px] leading-[0.95] sm:text-[72px] md:text-[96px] lg:text-[112px] text-[--color-text-inverse] max-w-5xl mx-auto tracking-[-0.02em]">
          {prefersReduced ? (
            headline
          ) : (
            words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] last:mr-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE_IN_OUT_EXPO,
                  delay: 0.15 + i * 0.08,
                }}
              >
                {word}
              </motion.span>
            ))
          )}
        </h1>

        <motion.p
          className="mt-7 text-lg sm:text-xl text-[--color-text-secondary] max-w-2xl mx-auto leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.5 }}
        >
          {subline}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.65 }}
        >
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <span className="label-text text-[--color-text-secondary] text-[10px]">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[--color-primary] to-transparent"
          animate={prefersReduced ? undefined : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Sentinel for MobileBottomBar IntersectionObserver */}
      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
