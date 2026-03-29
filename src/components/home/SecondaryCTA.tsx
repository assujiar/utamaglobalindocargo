import Link from "next/link";
import Container from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface SecondaryCTAProps {
  locale: Locale;
  dict: Dictionary;
}

export default function SecondaryCTA({ locale, dict }: SecondaryCTAProps) {
  return (
    <section className="section-dark py-20 lg:py-28 relative overflow-hidden">
      {/* Route accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-logistics-orange/20 to-transparent" />

      <Container className="text-center relative">
        <div className="w-2 h-2 bg-logistics-orange rotate-45 mx-auto mb-8" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
          {dict.secondaryCta.heading}
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
          {dict.secondaryCta.subHeading}
        </p>
        <div className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-3 bg-logistics-orange text-white px-10 py-5 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
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
        </div>
      </Container>
    </section>
  );
}
