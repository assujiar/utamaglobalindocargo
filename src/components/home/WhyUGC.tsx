"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
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
      {/* Subtle chapter marker */}
      <div className="absolute top-8 right-6 lg:right-16 text-[10rem] lg:text-[16rem] font-black text-carbon-dark/[0.02] leading-none select-none pointer-events-none">
        &bull;
      </div>

      <Container>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.whyUgc.label}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1] max-w-3xl">
            {dict.whyUgc.heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
            {dict.whyUgc.subHeading}
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border-light">
          {dict.whyUgc.items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 0.08}>
              <div className="bg-white p-8 lg:p-10 h-full group">
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
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
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
