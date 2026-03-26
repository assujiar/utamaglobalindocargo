"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";

interface Testimonial {
  quote_id: string;
  quote_en: string;
  role_id: string;
  role_en: string;
  industry_id: string;
  industry_en: string;
}

const testimonials: Testimonial[] = [
  {
    quote_id:
      "Distribusi ke 28 provinsi dalam 72 jam. UGC memahami kompleksitas logistik multi-pulau yang tidak bisa ditangani operator biasa.",
    quote_en:
      "Distribution to 28 provinces within 72 hours. UGC understands the multi-island logistics complexity that ordinary operators cannot handle.",
    role_id: "Direktur Supply Chain",
    role_en: "Supply Chain Director",
    industry_id: "FMCG & Distribusi",
    industry_en: "FMCG & Distribution",
  },
  {
    quote_id:
      "Proses kepabeanan yang biasanya memakan 5 hari kerja, dengan UGC selesai dalam 2 hari. Efisiensi yang langsung terasa di bottom line.",
    quote_en:
      "Customs clearance that typically takes 5 business days is completed in 2 days with UGC. Efficiency that directly impacts the bottom line.",
    role_id: "Manajer Operasional",
    role_en: "Operations Manager",
    industry_id: "Manufaktur Otomotif",
    industry_en: "Automotive Manufacturing",
  },
  {
    quote_id:
      "Pengiriman alat berat 200 ton ke remote site di Kalimantan, tepat waktu dan zero damage. Tim proyek UGC benar-benar berpengalaman.",
    quote_en:
      "200-ton heavy equipment delivery to a remote site in Kalimantan, on time and zero damage. UGC's project team is truly experienced.",
    role_id: "Project Manager",
    role_en: "Project Manager",
    industry_id: "Pertambangan & Energi",
    industry_en: "Mining & Energy",
  },
];

interface TestimonialsCarouselProps {
  locale: Locale;
  className?: string;
}

function TestimonialsCarousel({ locale, className }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReduced) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, prefersReduced]);

  const current = testimonials[activeIndex];
  const quote = locale === "id" ? current.quote_id : current.quote_en;
  const role = locale === "id" ? current.role_id : current.role_en;
  const industry = locale === "id" ? current.industry_id : current.industry_en;

  return (
    <section
      className={cn("py-28 sm:py-40 bg-[#0C0908] relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Unique divider: shimmer line (different from glow-divider-full) */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        {/* Full-width centered testimonial */}
        <div className="max-w-4xl">
          {/* Label */}
          <p className="label-text text-[--color-text-muted] mb-10 sm:mb-14">
            {locale === "id" ? "Kata Klien" : "Testimonials"}
          </p>

          {/* Quote with blur transition */}
          <div className="min-h-[240px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={prefersReduced ? undefined : { opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-heading-lg sm:text-heading-xl md:text-display-sm text-[--color-text-primary] font-light leading-[1.2] tracking-[-0.02em]">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-[--color-primary]" />
                  <span className="text-sm font-medium text-[--color-text-primary]">
                    {role}
                  </span>
                  <span className="text-xs text-[--color-text-muted]">
                    {industry}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots — minimal */}
          <div className="mt-12 flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className="group p-1"
              >
                <div
                  className={cn(
                    "h-px transition-all duration-500",
                    i === activeIndex
                      ? "w-12 bg-[--color-primary] shadow-[0_0_8px_rgba(255,70,0,0.4)]"
                      : "w-6 bg-[rgba(255,255,255,0.12)] group-hover:bg-[rgba(255,255,255,0.30)] group-hover:w-8",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsCarousel, type TestimonialsCarouselProps };
