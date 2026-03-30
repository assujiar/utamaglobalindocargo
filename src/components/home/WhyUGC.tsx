"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface WhyUGCProps {
  locale: Locale;
  dict: Dictionary;
}

export default function WhyUGC({ locale, dict }: WhyUGCProps) {
  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Dot grid ornament */}
      <div className="absolute bottom-0 left-0 w-40 h-40 ornament-dots" />

      {/* Subtle geometric cross */}
      <div className="absolute top-20 right-16 text-logistics-orange/[0.07] font-mono text-4xl font-light hidden lg:block select-none pointer-events-none">
        +
      </div>

      <Container>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-logistics-orange animate-line-grow" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.whyUgc.label}
            </span>
          </div>
        </AnimateOnScroll>

        <TextReveal
          as="h2"
          variant="word"
          className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1] max-w-3xl"
        >
          {dict.whyUgc.heading}
        </TextReveal>

        <AnimateOnScroll delay={0.15}>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
            {dict.whyUgc.subHeading}
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border-light" stagger={0.1}>
          {dict.whyUgc.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-white p-8 lg:p-10 h-full group hover-lift">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-carbon-dark text-white flex items-center justify-center font-bold text-sm group-hover:bg-logistics-orange transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-carbon-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange-dark transition-colors"
            >
              {dict.whyUgc.cta}
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
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
