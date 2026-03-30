"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import TextReveal from "@/components/ui/TextReveal";
import MagneticWrap from "@/components/ui/MagneticWrap";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import { motion } from "framer-motion";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const prefix = `/${locale}`;

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-carbon-dark overflow-hidden noise-overlay"
      aria-label={locale === "id" ? "Hero utama" : "Main hero"}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      {/* Dot grid ornament (top-right area) */}
      <div className="absolute top-20 right-10 w-48 h-48 ornament-dots lg:w-64 lg:h-64" />

      {/* Parallax accent lines */}
      <ParallaxLayer speed={-30} className="absolute top-0 right-0 w-[2px] h-full translate-x-[-120px] lg:translate-x-[-200px]">
        <div className="w-full h-full bg-gradient-to-b from-logistics-orange/0 via-logistics-orange/20 to-logistics-orange/0" />
      </ParallaxLayer>

      <ParallaxLayer speed={20} className="absolute bottom-0 left-1/4 w-full h-[1px]">
        <div className="w-full h-full bg-gradient-to-r from-logistics-orange/0 via-logistics-orange/10 to-logistics-orange/0" />
      </ParallaxLayer>

      {/* Geometric cross markers */}
      <ParallaxLayer speed={-15} className="absolute top-32 right-20 hidden lg:block">
        <span className="text-logistics-orange/10 font-mono text-3xl font-light">+</span>
      </ParallaxLayer>
      <ParallaxLayer speed={10} className="absolute bottom-40 right-1/3 hidden lg:block">
        <span className="text-logistics-orange/8 font-mono text-2xl font-light">+</span>
      </ParallaxLayer>

      {/* Large faded number */}
      <ParallaxLayer speed={-40} className="absolute top-16 right-6 lg:right-16">
        <div className="text-[12rem] lg:text-[20rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
          01
        </div>
      </ParallaxLayer>

      {/* Diagonal corner ornament */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-logistics-orange/[0.06] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full z-10">
        <div className="max-w-3xl">
          {/* Brand marker with animated line */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-16 h-[2px] bg-logistics-orange animate-line-grow" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              UGC Logistics
            </span>
          </motion.div>

          {/* Headline with clip-path reveal */}
          <TextReveal
            as="h1"
            variant="clip"
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]"
          >
            {dict.hero.headline}
          </TextReveal>

          {/* Sub-headline with word stagger */}
          <TextReveal
            as="p"
            variant="word"
            delay={0.4}
            className="mt-6 text-base md:text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl"
          >
            {dict.hero.subHeadline}
          </TextReveal>

          {/* CTAs with magnetic effect */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MagneticWrap strength={0.15}>
              <Link
                href={`${prefix}/contact`}
                className="group inline-flex items-center justify-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider transition-colors animate-glow-pulse hover-sweep-fill"
              >
                {dict.hero.ctaPrimary}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </MagneticWrap>
            <MagneticWrap strength={0.15}>
              <Link
                href={`${prefix}/services`}
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:border-white/40 transition-colors hover-shine"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </MagneticWrap>
          </motion.div>

          {/* Proof line with diamond */}
          <motion.div
            className="mt-14 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="w-2 h-2 bg-logistics-orange rotate-45" />
            <p className="text-xs text-white/30 uppercase tracking-wider">
              {dict.hero.proofLine}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom transition with gradient + line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-logistics-orange/20 to-transparent" />
        <div className="h-16 bg-gradient-to-t from-white/[0.02] to-transparent" />
      </div>
    </section>
  );
}
