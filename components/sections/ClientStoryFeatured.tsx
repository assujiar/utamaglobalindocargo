"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

interface ClientStoryFeaturedProps {
  locale: Locale;
  className?: string;
}

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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ClientStoryFeatured({
  locale,
  className,
}: ClientStoryFeaturedProps) {
  const prefersReduced = useReducedMotion();
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
    <section className={cn("py-20 sm:py-28 bg-[--color-bg-dark] relative", className)}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left: label */}
          <div className="md:col-span-3">
            <motion.p
              className="label-text text-[--color-primary]"
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {locale === "id" ? "Cerita Klien" : "Client Story"}
            </motion.p>
            <motion.p
              className="mt-2 text-sm text-[--color-text-muted]"
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            >
              {industry}
            </motion.p>
          </div>

          {/* Right: quote + result */}
          <div className="md:col-span-8 md:col-start-5">
            <motion.blockquote
              className="text-xl sm:text-2xl md:text-3xl text-[--color-text-primary] leading-snug font-light tracking-[-0.01em]"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              &ldquo;{quote}&rdquo;
            </motion.blockquote>

            <motion.div
              className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]"
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
            >
              <span className="label-text text-[--color-primary] mr-3">{resultLabel}</span>
              <span className="text-sm text-[--color-text-secondary]">
                {result}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ClientStoryFeatured, type ClientStoryFeaturedProps };
