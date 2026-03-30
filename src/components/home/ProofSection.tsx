"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { caseStudies } from "@/data/caseStudies";

interface ProofSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ProofSection({ locale, dict }: ProofSectionProps) {
  const prefix = `/${locale}`;
  const featured = caseStudies.slice(0, 2);

  return (
    <section className="section-dark py-20 lg:py-28 relative overflow-hidden noise-overlay">
      {/* Chapter marker */}
      <ParallaxLayer speed={-20} className="absolute top-8 right-6 lg:right-16">
        <div className="text-[10rem] lg:text-[16rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
          04
        </div>
      </ParallaxLayer>

      {/* Geometric cross */}
      <ParallaxLayer speed={15} className="absolute bottom-32 right-20 hidden lg:block">
        <span className="text-logistics-orange/10 font-mono text-3xl font-light">+</span>
      </ParallaxLayer>

      {/* Dot grid ornament */}
      <div className="absolute top-0 left-0 w-40 h-40 ornament-dots" />

      <Container className="relative z-10">
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-logistics-orange animate-line-grow" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.common.illustrativeScenario}
            </span>
          </div>
        </AnimateOnScroll>

        <TextReveal
          as="h2"
          variant="clip"
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]"
        >
          {dict.proof.heading}
        </TextReveal>

        <AnimateOnScroll delay={0.15}>
          <p className="mt-4 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
            {dict.proof.subHeading}
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.12}>
          {featured.map((cs, i) => (
            <StaggerItem key={cs.slug}>
              <Link
                href={`${prefix}/case-studies/${cs.slug}`}
                className="block p-8 lg:p-10 border border-white/10 hover:border-logistics-orange/30 transition-colors group h-full hover-lift"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[2px] bg-logistics-orange/40" />
                  <span className="text-[10px] uppercase tracking-wider text-white/30 font-bold">
                    {dict.common.challengeLabel}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-logistics-orange transition-colors">
                  {cs.title[locale]}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  {cs.challenge[locale]}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-logistics-orange/40" />
                  <span className="text-[10px] uppercase tracking-wider text-white/30 font-bold">
                    {dict.common.solutionLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                  {cs.solution[locale]}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-logistics-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  {dict.common.readMore}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-10">
            <Link
              href={`${prefix}/case-studies`}
              className="inline-flex items-center gap-3 text-sm font-bold text-logistics-orange hover:text-white transition-colors"
            >
              {dict.proof.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
