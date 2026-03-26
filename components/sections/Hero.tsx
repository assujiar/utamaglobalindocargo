"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
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

function Hero({
  headline,
  subline,
  ctaLabel,
  ctaHref,
  className,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Scroll-linked transforms: content zooms out + fades as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  // Parallax layers: different speeds
  const bgLayer = useTransform(scrollYProgress, [0, 1], [0, 150]); // background moves DOWN (parallax)
  const midLayer = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const shapeLayer = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Spring for smooth mouse tracking
  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  // Mouse-follow gradient spotlight
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
    if (!el || prefersReduced) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReduced]);

  // Split headline into characters for character-by-character reveal
  const words = headline.split(" ");
  let charIndex = 0;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-[--color-bg-dark]",
        className,
      )}
    >
      {/* Gradient mesh background - intense, parallax */}
      {!prefersReduced ? (
        <motion.div
          className="absolute inset-0 gradient-mesh-intense pointer-events-none"
          style={{ y: bgLayer }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 gradient-mesh pointer-events-none" aria-hidden="true" />
      )}

      {/* Grain overlay for cinematic feel */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Mouse-follow gradient spotlight */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 70, 0, 0.12), rgba(255, 171, 64, 0.05) 40%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Ambient glow orbs with heavy parallax + orbit */}
      {!prefersReduced ? (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute top-[5%] left-[5%] w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.20] blur-[120px]"
            style={{ y: midLayer }}
            animate={{
              x: [0, 60, -40, 20, 0],
              y: [0, -50, 30, -20, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[--color-accent-warm] opacity-[0.15] blur-[100px]"
            style={{ y: shapeLayer }}
            animate={{
              x: [0, -50, 40, -30, 0],
              y: [0, 40, -30, 50, 0],
              scale: [1, 0.9, 1.12, 0.95, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full bg-[--color-accent-coral] opacity-[0.12] blur-[90px]"
            style={{ y: midLayer }}
            animate={{
              x: [0, 30, -20, 0],
              rotate: [0, 5, -3, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.15] blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[--color-accent-warm] opacity-[0.10] blur-[100px]" />
        </div>
      )}

      {/* Floating geometric shapes with parallax */}
      {!prefersReduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Floating circle */}
          <motion.div
            className="absolute top-[15%] right-[18%] w-20 h-20 rounded-full border border-[rgba(255,70,0,0.15)]"
            style={{ y: shapeLayer, x: mouseXSpring }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Floating line */}
          <motion.div
            className="absolute bottom-[25%] left-[15%] w-32 h-px bg-gradient-to-r from-transparent via-[rgba(255,171,64,0.30)] to-transparent"
            style={{ y: midLayer }}
            animate={{ x: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating diamond */}
          <motion.div
            className="absolute top-[60%] right-[10%] w-8 h-8 border border-[rgba(255,70,0,0.12)] rotate-45"
            style={{ y: shapeLayer, x: mouseYSpring }}
            animate={{ rotate: [45, 135, 225, 315, 405], scale: [1, 1.2, 1, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating dot */}
          <motion.div
            className="absolute top-[25%] left-[30%] w-3 h-3 rounded-full bg-[--color-primary] opacity-30"
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Large ring */}
          <motion.div
            className="absolute top-[50%] left-[70%] w-40 h-40 rounded-full border border-[rgba(255,255,255,0.04)]"
            style={{ y: bgLayer }}
            animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Content with scroll-linked zoom out + fade */}
      <motion.div
        className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 text-center"
        style={
          prefersReduced
            ? undefined
            : { scale: contentScale, opacity: contentOpacity, y: contentY }
        }
      >
        {/* Label */}
        <motion.p
          className="label-text text-[--color-primary] mb-6"
          initial={prefersReduced ? undefined : { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          PT Utama Globalindo Cargo
        </motion.p>

        {/* Headline with character-by-character reveal */}
        <h1 className="font-display text-[44px] leading-[0.95] sm:text-[72px] md:text-[96px] lg:text-[112px] max-w-5xl mx-auto tracking-[-0.03em]">
          {prefersReduced ? (
            <span className="gradient-text-vivid">{headline}</span>
          ) : (
            words.map((word, wi) => {
              const chars = word.split("");
              const wordElement = (
                <span key={wi} className="inline-block mr-[0.25em] last:mr-0">
                  {chars.map((char, ci) => {
                    const currentCharIndex = charIndex++;
                    return (
                      <motion.span
                        key={ci}
                        className="inline-block gradient-text-vivid"
                        initial={{ opacity: 0, y: 50, filter: "blur(12px)", scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE_OUT_EXPO,
                          delay: 0.2 + currentCharIndex * 0.025,
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
              if (wi < words.length - 1) charIndex++; // account for space
              return wordElement;
            })
          )}
        </h1>

        <motion.p
          className="mt-8 text-lg sm:text-xl text-[--color-text-secondary] max-w-2xl mx-auto leading-relaxed"
          initial={prefersReduced ? undefined : { opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.8 }}
        >
          {subline}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={prefersReduced ? undefined : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 1.0 }}
        >
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - pulsing line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span className="label-text text-[--color-text-secondary] text-[10px]">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[--color-primary] via-[--color-accent-warm] to-transparent"
          animate={prefersReduced ? undefined : { scaleY: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom glow divider */}
      <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      {/* Sentinel for MobileBottomBar IntersectionObserver */}
      <div data-hero-sentinel className="absolute bottom-0 h-px w-full" aria-hidden="true" />
    </section>
  );
}

export { Hero, type HeroProps };
