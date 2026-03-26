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
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

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
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-[100dvh] items-end pb-16 sm:pb-24 overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Ambient blur circles with scroll-linked parallax */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ParallaxDepth speed={0.15} direction="down" scrubSmooth={0.6}>
          <div
            className="absolute w-[70vw] h-[70vw] top-[-20%] left-[-15%] rounded-full"
            style={{
              background: "radial-gradient(var(--color-primary) 0, rgba(255,70,0,0) 70%)",
              opacity: 0.06,
              animation: prefersReduced ? "none" : "float-slow 25s ease-in-out infinite",
            }}
          />
        </ParallaxDepth>
        <ParallaxDepth speed={0.1} direction="up" scrubSmooth={0.6}>
          <div
            className="absolute w-[40vw] h-[40vw] bottom-[10%] right-[-5%] rounded-full"
            style={{
              background: "radial-gradient(var(--color-accent-warm) 0, rgba(255,171,64,0) 70%)",
              opacity: 0.04,
              animation: prefersReduced ? "none" : "float-slow 30s ease-in-out infinite reverse",
            }}
          />
        </ParallaxDepth>
      </div>

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Content */}
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
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {locale === "id" ? "Freight Forwarder Sejak 1995" : "Freight Forwarder Since 1995"}
        </motion.p>

        {/* Headline — clip-path word reveal */}
        <h1 className="text-display-xl max-w-[1000px]">
          {prefersReduced ? (
            <span className="text-[--color-text-inverse]">{headline}</span>
          ) : (
            words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
                <motion.span
                  className="inline-block text-[--color-text-inverse]"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + i * 0.04,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))
          )}
        </h1>

        {/* Subline */}
        <motion.p
          className="mt-6 sm:mt-8 text-base sm:text-lg text-[--color-text-secondary] max-w-xl leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: isMobile ? 0.4 : 0.7 }}
        >
          {subline}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start gap-5"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: isMobile ? 0.5 : 0.9 }}
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

        {/* Trust badges — inline */}
        <motion.div
          className="mt-14 sm:mt-20 flex items-center gap-8 sm:gap-12"
          initial={prefersReduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: isMobile ? 0.6 : 1.2 }}
        >
          {[
            { label: locale === "id" ? "Sejak 1995" : "Since 1995" },
            { label: locale === "id" ? "150+ Negara" : "150+ Countries" },
            { label: "WCA & IATA", hideOnMobile: true },
          ].map((badge) => (
            <div
              key={badge.label}
              className={cn(
                "flex items-center gap-3",
                badge.hideOnMobile && "hidden sm:flex",
              )}
            >
              <div className="size-1.5 rounded-full bg-[--color-primary] shadow-[0_0_8px_rgba(255,70,0,0.5)]" />
              <span className="text-xs text-[--color-text-muted] tracking-wide">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 right-5 sm:right-10 z-10 flex flex-col items-center gap-3"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <span className="label-text text-[10px] text-[--color-text-muted] [writing-mode:vertical-lr]">
          SCROLL
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[--color-primary] to-transparent"
          animate={prefersReduced ? undefined : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* Bottom glow divider */}
      <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
