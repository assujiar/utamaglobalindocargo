"use client";

import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Locale } from "@/lib/i18n/config";

interface ClientStoryFeaturedProps {
  locale: Locale;
  className?: string;
}

// TODO: Replace with Supabase query when client_stories table is seeded
const placeholder = {
  industry_id: "FMCG & Distribusi",
  industry_en: "FMCG & Distribution",
  display_quote_id:
    "Distribusi multi-pulau ke 28 provinsi dalam 72 jam, dengan zero damage rate dan pelacakan real-time di setiap titik.",
  display_quote_en:
    "Multi-island distribution to 28 provinces within 72 hours, with zero damage rate and real-time tracking at every point.",
  result_id:
    "Efisiensi distribusi meningkat 40%, waktu transit berkurang dari 5 hari menjadi 3 hari rata-rata.",
  result_en:
    "Distribution efficiency improved by 40%, transit time reduced from 5 days to an average of 3 days.",
  resultLabel_id: "Hasil",
  resultLabel_en: "Result",
};

function ClientStoryFeatured({
  locale,
  className,
}: ClientStoryFeaturedProps) {
  const industry =
    locale === "id" ? placeholder.industry_id : placeholder.industry_en;
  const quote =
    locale === "id"
      ? placeholder.display_quote_id
      : placeholder.display_quote_en;
  const result =
    locale === "id" ? placeholder.result_id : placeholder.result_en;
  const resultLabel =
    locale === "id" ? placeholder.resultLabel_id : placeholder.resultLabel_en;

  return (
    <section className={cn("py-16 bg-[--color-bg-dark] relative", className)}>
      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 flex justify-center">
        <ScrollReveal variant="clip">
          <div className="glass-tinted p-8 sm:p-10 max-w-xl relative overflow-hidden">
            {/* Glow accent behind quote */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[80px] pointer-events-none" aria-hidden="true" />

            {/* Industry tag */}
            <span className="relative z-10 label-text text-[--color-primary] mb-5 block">
              {industry}
            </span>

            {/* Pull quote */}
            <blockquote className="relative z-10 text-lg sm:text-xl font-medium text-[--color-text-inverse] leading-snug mb-5">
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Result */}
            <div className="relative z-10 flex items-start gap-2">
              <span className="label-text text-[--color-primary] shrink-0 mt-0.5">{resultLabel}</span>
              <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                {result}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { ClientStoryFeatured, type ClientStoryFeaturedProps };
