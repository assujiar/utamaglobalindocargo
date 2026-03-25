"use client";

import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Locale } from "@/lib/i18n/config";

interface ClientStoryFeaturedProps {
  locale: Locale;
  className?: string;
}

// TODO: Replace with Supabase query when client_stories table is seeded
// Query: select * from client_stories where featured = true and status = 'published' limit 1
const placeholder = {
  industry_id: "FMCG & Distribusi",
  industry_en: "FMCG & Distribution",
  display_quote_id:
    "Distribusi multi-pulau ke 28 provinsi dalam 72 jam — dengan zero damage rate dan pelacakan real-time di setiap titik.",
  display_quote_en:
    "Multi-island distribution to 28 provinces within 72 hours — with zero damage rate and real-time tracking at every point.",
  result_id:
    "Efisiensi distribusi meningkat 40%, waktu transit berkurang dari 5 hari menjadi 3 hari rata-rata.",
  result_en:
    "Distribution efficiency improved by 40%, transit time reduced from 5 days to an average of 3 days.",
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

  return (
    <ScrollReveal>
      <div
        className={cn(
          "glass-dark p-6 sm:p-8 rounded-lg max-w-xl",
          className,
        )}
      >
        {/* Industry tag */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[--color-primary]/15 text-[--color-primary] mb-4">
          {industry}
        </span>

        {/* Pull quote */}
        <blockquote className="text-lg sm:text-xl font-medium text-[--color-text-inverse] leading-snug mb-4">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Result */}
        <p className="text-sm text-[--color-text-secondary] leading-relaxed">
          {result}
        </p>
      </div>
    </ScrollReveal>
  );
}

export { ClientStoryFeatured, type ClientStoryFeaturedProps };
