"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
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
    <section className="section-dark py-20 lg:py-28">
      <Container>
        <AnimateOnScroll>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-logistics-orange" />
              <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                {dict.common.illustrativeScenario}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              {dict.proof.heading}
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
              {dict.proof.subHeading}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((cs, i) => (
            <AnimateOnScroll key={cs.slug} delay={i * 0.12}>
              <Link
                href={`${prefix}/case-studies/${cs.slug}`}
                className="block p-8 lg:p-10 border border-white/10 hover:border-logistics-orange/30 transition-colors group h-full"
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
            </AnimateOnScroll>
          ))}
        </div>

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
