"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Globe, Truck, Plane, Container } from "lucide-react";
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

// Hook to detect mobile
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
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
  const bgLayer = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const midLayer = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const shapeLayer = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Mouse spring
  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    mouseXSpring.set((x - 0.5) * 30);
    mouseYSpring.set((y - 0.5) * 30);
  }, [mouseXSpring, mouseYSpring]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReduced || isMobile) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReduced, isMobile]);

  // Word-based animation for mobile, character-based for desktop
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Background image layer with parallax (slowest layer) */}
      {!prefersReduced ? (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={isMobile ? undefined : { y: bgLayer }}
          aria-hidden="true"
        >
          {/* Placeholder: when real image is ready, use next/image here */}
          <div className="absolute inset-0 bg-[--color-bg-dark]" />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[--color-bg-dark]/80 via-[--color-bg-dark]/60 to-[--color-bg-dark]" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[--color-bg-dark]" />
        </div>
      )}

      {/* Gradient mesh background with parallax */}
      {!prefersReduced ? (
        <motion.div
          className="absolute inset-0 gradient-mesh-intense pointer-events-none"
          style={isMobile ? undefined : { y: midLayer }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 gradient-mesh pointer-events-none" aria-hidden="true" />
      )}

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Mouse-follow gradient spotlight (desktop only) */}
      {!prefersReduced && !isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 70, 0, 0.12), rgba(255, 171, 64, 0.05) 40%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Glow orbs with parallax (reduced opacity — supporting, not main visual) */}
      {!prefersReduced ? (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-[5%] left-[5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[--color-primary] opacity-[0.10] blur-[120px]"
            style={isMobile ? undefined : { y: midLayer }}
            animate={isMobile ? undefined : {
              x: [0, 60, -40, 20, 0],
              y: [0, -50, 30, -20, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[--color-accent-warm] opacity-[0.08] blur-[100px]"
            style={isMobile ? undefined : { y: shapeLayer }}
            animate={isMobile ? undefined : {
              x: [0, -50, 40, -30, 0],
              y: [0, 40, -30, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-[--color-primary] opacity-[0.08] blur-[120px]" />
        </div>
      )}

      {/* Floating visual icons (desktop only) - breaks "all text" monotony */}
      {!prefersReduced && !isMobile && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-[18%] right-[12%] p-3 rounded-xl bg-[rgba(255,70,0,0.08)] border border-[rgba(255,70,0,0.15)]"
            style={{ y: shapeLayer, x: mouseXSpring }}
            animate={{ rotate: [0, 5, -5, 0], y: [-10, 10, -10] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe className="size-6 text-[--color-primary] opacity-60" />
          </motion.div>
          <motion.div
            className="absolute bottom-[28%] left-[8%] p-3 rounded-xl bg-[rgba(255,171,64,0.06)] border border-[rgba(255,171,64,0.12)]"
            style={{ y: midLayer }}
            animate={{ rotate: [0, -3, 3, 0], y: [5, -15, 5] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            <Truck className="size-6 text-[--color-accent-warm] opacity-50" />
          </motion.div>
          <motion.div
            className="absolute top-[55%] right-[20%] p-2.5 rounded-lg bg-[rgba(255,61,0,0.06)] border border-[rgba(255,61,0,0.10)]"
            style={{ y: shapeLayer, x: mouseYSpring }}
            animate={{ rotate: [0, 8, -4, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <Plane className="size-5 text-[--color-accent-coral] opacity-50" />
          </motion.div>
          <motion.div
            className="absolute top-[30%] left-[18%] p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]"
            style={{ y: bgLayer }}
            animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <Container className="size-5 text-[--color-text-secondary] opacity-30" />
          </motion.div>

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-[15%] right-[35%] w-16 h-16 rounded-full border border-[rgba(255,70,0,0.12)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[30%] w-6 h-6 border border-[rgba(255,70,0,0.10)] rotate-45"
            animate={{ rotate: [45, 135, 225, 315, 405], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Mobile: simpler floating accents */}
      {!prefersReduced && isMobile && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-[12%] right-[8%] p-2.5 rounded-xl bg-[rgba(255,70,0,0.08)] border border-[rgba(255,70,0,0.15)]"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe className="size-5 text-[--color-primary] opacity-50" />
          </motion.div>
          <motion.div
            className="absolute bottom-[22%] left-[6%] p-2 rounded-lg bg-[rgba(255,171,64,0.06)] border border-[rgba(255,171,64,0.12)]"
            animate={{ y: [5, -10, 5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Truck className="size-4 text-[--color-accent-warm] opacity-40" />
          </motion.div>
        </div>
      )}

      {/* Content with scroll-linked zoom out + fade */}
      <motion.div
        className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center"
        style={
          prefersReduced || isMobile
            ? undefined
            : { scale: contentScale, opacity: contentOpacity, y: contentY }
        }
      >
        {/* Label */}
        <motion.p
          className="label-text text-[--color-primary] mb-6"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          PT Utama Globalindo Cargo
        </motion.p>

        {/* Headline - word-by-word on mobile, character-by-character on desktop */}
        <h1 className="font-display text-[40px] leading-[0.95] sm:text-[64px] md:text-[88px] lg:text-[112px] max-w-5xl mx-auto tracking-[-0.03em]">
          {prefersReduced ? (
            <span className="gradient-text-vivid">{headline}</span>
          ) : isMobile ? (
            // Mobile: word-by-word (fast, no lag)
            words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] last:mr-0 gradient-text-vivid"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1 + i * 0.06,
                }}
              >
                {word}
              </motion.span>
            ))
          ) : (
            // Desktop: character-by-character with blur
            (() => {
              let charIdx = 0;
              return words.map((word, wi) => {
                const chars = word.split("");
                const el = (
                  <span key={wi} className="inline-block mr-[0.25em] last:mr-0">
                    {chars.map((char, ci) => {
                      const idx = charIdx++;
                      return (
                        <motion.span
                          key={ci}
                          className="inline-block gradient-text-vivid"
                          initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                          transition={{
                            duration: 0.45,
                            ease: EASE_OUT_EXPO,
                            delay: 0.15 + idx * 0.02,
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
                charIdx++; // space
                return el;
              });
            })()
          )}
        </h1>

        <motion.p
          className="mt-7 text-base sm:text-lg md:text-xl text-[--color-text-secondary] max-w-2xl mx-auto leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: isMobile ? 0.5 : 0.8 }}
        >
          {subline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: isMobile ? 0.6 : 1.0 }}
        >
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
          <Button
            href={`/${locale}/${locale === "id" ? "layanan" : "services"}`}
            variant="tertiary"
            size="lg"
          >
            {locale === "id" ? "Lihat Layanan" : "View Services"}
          </Button>
        </motion.div>

        {/* Trust badges inline — staggered fade+scale entrance */}
        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-8">
          {[
            {
              color: "bg-[--color-success]",
              glow: "shadow-[0_0_8px_rgba(16,185,129,0.4)]",
              glowPulse: "0 0 8px rgba(16,185,129,0.4), 0 0 20px rgba(16,185,129,0.2)",
              label: locale === "id" ? "Sejak 1995" : "Since 1995",
              hideOnMobile: false,
            },
            {
              color: "bg-[--color-primary]",
              glow: "shadow-[0_0_8px_rgba(255,70,0,0.4)]",
              glowPulse: "0 0 8px rgba(255,70,0,0.4), 0 0 20px rgba(255,70,0,0.2)",
              label: locale === "id" ? "150+ Negara" : "150+ Countries",
              hideOnMobile: false,
            },
            {
              color: "bg-[--color-accent-warm]",
              glow: "shadow-[0_0_8px_rgba(255,171,64,0.4)]",
              glowPulse: "0 0 8px rgba(255,171,64,0.4), 0 0 20px rgba(255,171,64,0.2)",
              label: "WCA & IATA",
              hideOnMobile: true,
            },
          ].map((badge, i) => (
            <motion.div
              key={badge.label}
              className={cn(
                "flex items-center gap-2",
                badge.hideOnMobile && "hidden sm:flex",
              )}
              initial={prefersReduced ? undefined : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: EASE_OUT_EXPO,
                delay: (isMobile ? 0.8 : 1.3) + i * 0.12,
              }}
            >
              {i > 0 && (
                <div className={cn("w-px h-3 bg-[rgba(255,255,255,0.10)] mr-4 sm:mr-6", badge.hideOnMobile && "hidden sm:block")} />
              )}
              <motion.div
                className={cn("size-2 rounded-full", badge.color, badge.glow)}
                animate={prefersReduced ? undefined : {
                  boxShadow: [
                    badge.glowPulse.split(",")[0],
                    badge.glowPulse,
                    badge.glowPulse.split(",")[0],
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
              <span className="text-xs text-[--color-text-secondary]">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator - animated line only */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[--color-primary] via-[--color-accent-warm] to-transparent"
          animate={prefersReduced ? undefined : { scaleY: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom glow divider */}
      <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      {/* Sentinel for MobileBottomBar */}
      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
