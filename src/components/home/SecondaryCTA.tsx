"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import MagneticWrap from "@/components/ui/MagneticWrap";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface SecondaryCTAProps {
  locale: Locale;
  dict: Dictionary;
}

export default function SecondaryCTA({ locale, dict }: SecondaryCTAProps) {
  return (
    <section className="section-dark py-20 lg:py-28 relative overflow-hidden noise-overlay">
      {/* Top transition line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-logistics-orange/20 to-transparent" />

      {/* Parallax cross markers */}
      <ParallaxLayer speed={-15} className="absolute top-20 left-16 hidden lg:block">
        <span className="text-logistics-orange/10 font-mono text-3xl font-light">+</span>
      </ParallaxLayer>
      <ParallaxLayer speed={10} className="absolute bottom-20 right-24 hidden lg:block">
        <span className="text-logistics-orange/8 font-mono text-2xl font-light">+</span>
      </ParallaxLayer>

      {/* Dot grid ornament */}
      <div className="absolute bottom-0 right-0 w-32 h-32 ornament-dots" />

      <Container className="text-center relative z-10">
        <AnimateOnScroll>
          <div className="w-2 h-2 bg-logistics-orange rotate-45 mx-auto mb-8" />
        </AnimateOnScroll>

        <TextReveal
          as="h2"
          variant="clip"
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]"
        >
          {dict.secondaryCta.heading}
        </TextReveal>

        <AnimateOnScroll delay={0.2}>
          <p className="mt-5 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
            {dict.secondaryCta.subHeading}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.35}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticWrap strength={0.15}>
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 bg-logistics-orange text-white px-10 py-5 font-bold text-sm uppercase tracking-wider transition-colors animate-glow-pulse hover-sweep-fill"
              >
                {dict.secondaryCta.cta}
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
            <p className="text-xs text-white/30">
              {dict.contact.responseTime}
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-logistics-orange/20 to-transparent" />
      </div>
    </section>
  );
}
