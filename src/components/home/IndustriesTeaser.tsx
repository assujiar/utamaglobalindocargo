"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { industries } from "@/data/industries";

interface IndustriesTeaserProps {
  locale: Locale;
  dict: Dictionary;
}

const industryIcons: Record<string, React.ReactNode> = {
  factory: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  mining: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  package: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  ),
  thermometer: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  bolt: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
};

export default function IndustriesTeaser({ locale, dict }: IndustriesTeaserProps) {
  const prefix = `/${locale}`;

  return (
    <section className="section-light py-20 lg:py-28 relative overflow-hidden">
      {/* Chapter marker */}
      <div className="absolute top-8 right-6 lg:right-16 text-[10rem] lg:text-[16rem] font-black text-carbon-dark/[0.02] leading-none select-none pointer-events-none">
        05
      </div>

      {/* Geometric cross */}
      <div className="absolute top-24 left-12 text-logistics-orange/[0.07] font-mono text-4xl font-light hidden lg:block select-none pointer-events-none">
        +
      </div>

      <Container>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-logistics-orange animate-line-grow" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.industries}
            </span>
          </div>
        </AnimateOnScroll>

        <TextReveal
          as="h2"
          variant="word"
          className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1] max-w-3xl"
        >
          {dict.industriesTeaser.heading}
        </TextReveal>

        <AnimateOnScroll delay={0.15}>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
            {dict.industriesTeaser.subHeading}
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.06}>
          {industries.map((industry) => (
            <StaggerItem key={industry.slug}>
              <Link
                href={`${prefix}/industries/${industry.slug}`}
                className="group block p-6 bg-white border border-border-light hover:border-logistics-orange/30 text-center transition-all duration-300 h-full hover-lift"
              >
                <div className="w-10 h-10 mx-auto mb-3 bg-carbon-dark/5 text-carbon-dark flex items-center justify-center group-hover:bg-logistics-orange/10 group-hover:text-logistics-orange transition-colors">
                  {industryIcons[industry.icon] || industryIcons.factory}
                </div>
                <span className="text-xs font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors">
                  {industry.name[locale]}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href={`${prefix}/industries`}
              className="inline-flex items-center gap-2 text-sm font-bold text-logistics-orange hover:text-carbon-dark transition-colors"
            >
              {dict.industriesTeaser.cta}
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
