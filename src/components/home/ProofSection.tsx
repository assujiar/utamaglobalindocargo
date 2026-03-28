"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
          <SectionHeading
            title={dict.proof.heading}
            subtitle={dict.proof.subHeading}
            dark
          />
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((cs, i) => (
            <AnimateOnScroll key={cs.slug} delay={i * 0.12}>
              <article className="p-8 lg:p-10 border border-white/10 hover:border-logistics-orange/30 transition-colors group h-full">
                {cs.isPlaceholder && (
                  <span className="inline-block mb-4 text-[10px] uppercase tracking-wider text-logistics-orange/60 bg-logistics-orange/10 px-2 py-1">
                    Placeholder
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-logistics-orange transition-colors">
                  {cs.title[locale]}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {cs.challenge[locale]}
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  {cs.solution[locale]}
                </p>
              </article>
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
