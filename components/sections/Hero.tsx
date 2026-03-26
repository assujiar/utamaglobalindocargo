"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function Hero({
  locale,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  className,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[100dvh] items-end pb-20 sm:pb-28 overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Single subtle ambient glow — no floating icons, no geometric shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-[--color-primary] opacity-[0.04] blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[--color-accent-warm] opacity-[0.03] blur-[140px]" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Content — bottom-aligned, left-aligned for editorial feel */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[--max-width-layout] px-5 sm:px-10"
        style={
          prefersReduced || isMobile
            ? undefined
            : { opacity: contentOpacity, y: contentY }
        }
      >
        {/* Label */}
        <motion.p
          className="label-text text-[--color-primary] mb-6 sm:mb-8"
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {locale === "id" ? "Freight Forwarder Sejak 1995" : "Freight Forwarder Since 1995"}
        </motion.p>

        {/* Headline — massive display type, left-aligned */}
        <h1 className="text-display-xl max-w-[900px]">
          {prefersReduced ? (
            <span className="text-[--color-text-inverse]">{headline}</span>
          ) : (
            words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em] last:mr-0 text-[--color-text-inverse]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: EASE,
                  delay: 0.1 + i * 0.04,
                }}
              >
                {word}
              </motion.span>
            ))
          )}
        </h1>

        {/* Subline */}
        <motion.p
          className="mt-6 sm:mt-8 text-base sm:text-lg text-[--color-text-secondary] max-w-lg leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: isMobile ? 0.4 : 0.6 }}
        >
          {subline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start gap-4"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: isMobile ? 0.5 : 0.8 }}
        >
          <MagneticElement strength={0.3}>
            <Button href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
          </MagneticElement>
          <Button
            href={`/${locale}/${locale === "id" ? "layanan" : "services"}`}
            variant="tertiary"
            size="lg"
          >
            {locale === "id" ? "Lihat Layanan" : "View Services"}
          </Button>
        </motion.div>

        {/* Trust badges — minimal, bottom row */}
        <motion.div
          className="mt-16 sm:mt-20 flex items-center gap-8 sm:gap-10"
          initial={prefersReduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: isMobile ? 0.6 : 1.0 }}
        >
          {[
            { label: locale === "id" ? "Sejak 1995" : "Since 1995" },
            { label: locale === "id" ? "150+ Negara" : "150+ Countries" },
            { label: "WCA & IATA", hideOnMobile: true },
          ].map((badge, i) => (
            <div
              key={badge.label}
              className={cn(
                "flex items-center gap-3",
                badge.hideOnMobile && "hidden sm:flex",
              )}
            >
              <div className="size-1.5 rounded-full bg-[--color-primary]" />
              <span className="text-xs text-[--color-text-muted] tracking-wide">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        className="absolute bottom-8 right-5 sm:right-10 z-10 flex flex-col items-center gap-3"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span className="label-text text-[10px] text-[--color-text-muted] [writing-mode:vertical-lr]">
          SCROLL
        </span>
        <motion.div
          className="w-px h-8 bg-[--color-text-muted]"
          animate={prefersReduced ? undefined : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
