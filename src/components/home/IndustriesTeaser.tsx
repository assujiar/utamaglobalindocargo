"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { industries } from "@/data/industries";

interface IndustriesTeaserProps {
  locale: Locale;
  dict: Dictionary;
}

export default function IndustriesTeaser({ locale, dict }: IndustriesTeaserProps) {
  const prefix = `/${locale}`;

  return (
    <section className="section-light py-20 lg:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            title={dict.industriesTeaser.heading}
            subtitle={dict.industriesTeaser.subHeading}
          />
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, i) => (
            <AnimateOnScroll key={industry.slug} delay={i * 0.06}>
              <Link
                href={`${prefix}/industries/${industry.slug}`}
                className="group block p-6 bg-white border border-border-light hover:border-logistics-orange/30 text-center transition-all duration-300 hover:shadow-md h-full"
              >
                <div className="w-10 h-10 mx-auto mb-3 bg-carbon-dark/5 text-carbon-dark flex items-center justify-center group-hover:bg-logistics-orange/10 group-hover:text-logistics-orange transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors">
                  {industry.name[locale]}
                </span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

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
