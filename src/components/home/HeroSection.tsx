import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const prefix = `/${locale}`;

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-carbon-dark overflow-hidden"
      aria-label={locale === "id" ? "Hero utama" : "Main hero"}
    >
      {/* Grid pattern: subtle movement/route reference */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      {/* Route line motif */}
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-logistics-orange/0 via-logistics-orange/20 to-logistics-orange/0 translate-x-[-120px] lg:translate-x-[-200px]" />
      <div className="absolute bottom-0 left-1/4 w-full h-[1px] bg-gradient-to-r from-logistics-orange/0 via-logistics-orange/10 to-logistics-orange/0" />

      {/* Large faded number */}
      <div className="absolute top-16 right-6 lg:right-16 text-[12rem] lg:text-[20rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
        01
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="max-w-3xl">
          {/* Brand marker */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="w-16 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              UGC Logistics
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] animate-fade-in-up opacity-0 delay-100">
            {dict.hero.headline}
          </h1>

          {/* Sub-headline */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl animate-fade-in-up opacity-0 delay-200">
            {dict.hero.subHeadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 delay-300">
            <Link
              href={`${prefix}/contact`}
              className="group inline-flex items-center justify-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
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
            <Link
              href={`${prefix}/services`}
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>

          {/* Quick proof line */}
          <div className="mt-14 flex items-center gap-4 animate-fade-in-up opacity-0 delay-400">
            <div className="w-2 h-2 bg-logistics-orange rotate-45" />
            <p className="text-xs text-white/30 uppercase tracking-wider">
              {dict.hero.proofLine}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-logistics-orange/20 to-transparent" />
    </section>
  );
}
