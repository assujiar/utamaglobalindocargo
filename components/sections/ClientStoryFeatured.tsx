"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
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

// UNIQUE: Warm tinted bg (#F5F0EB), centered pull-quote, SplitTextReveal on quote,
//         divider-dots separator, typography-as-design layout

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
    <GSAPProvider>
      <section className={cn("py-32 sm:py-48 section-warm relative overflow-hidden", className)}>
        {/* Unique: dot divider at top */}
        <div className="absolute top-8 left-0 right-0 divider-dots" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Industry tag */}
            <motion.div
              className="mb-10 sm:mb-14"
              initial={prefersReduced ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="label-text text-[--color-primary]">
                {locale === "id" ? "Cerita Klien" : "Client Story"}
              </span>
              <span className="mx-3 text-[--color-text-muted]">/</span>
              <span className="label-text text-[--color-text-muted]">
                {industry}
              </span>
            </motion.div>

            {/* Big pull-quote — SplitTextReveal */}
            <SplitTextReveal
              as="p"
              type="words"
              stagger={0.03}
              className="text-heading-xl sm:text-display-sm font-light leading-[1.15] tracking-[-0.02em]"
            >
              {`\u201C${quote}\u201D`}
            </SplitTextReveal>

            {/* Result with accent line */}
            <motion.div
              className="mt-12 sm:mt-16 inline-flex items-center gap-4 text-left"
              initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="w-8 h-px bg-[--color-primary]" />
              <div>
                <span className="label-text text-[--color-primary] block">{resultLabel}</span>
                <span className="text-sm text-[--color-text-secondary] mt-1 block">
                  {result}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ClientStoryFeatured, type ClientStoryFeaturedProps };
