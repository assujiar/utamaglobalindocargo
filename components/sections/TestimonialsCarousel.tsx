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
      className={cn("py-28 sm:py-36 section-elevated relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blur-circle absolute w-[40vw] h-[40vw] bottom-[-10%] left-[-10%] opacity-[0.06]" />
      </div>

      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left: label + navigation */}
          <div className="md:col-span-3">
            <p className="label-text text-[--color-primary] mb-6">
              {locale === "id" ? "Kata Klien" : "Testimonials"}
            </p>

            {/* Navigation lines */}
            <div className="flex md:flex-col items-start gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="relative group h-px md:h-px transition-all duration-500"
                  aria-label={`Testimonial ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                >
                  <div
                    className={cn(
                      "h-px transition-all duration-500",
                      i === activeIndex
                        ? "w-14 bg-[--color-primary] shadow-[0_0_8px_rgba(255,70,0,0.4)]"
                        : "w-8 bg-[rgba(255,255,255,0.12)] group-hover:bg-[rgba(255,255,255,0.30)] group-hover:w-10",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: quote content */}
          <div className="md:col-span-8 md:col-start-5 min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={prefersReduced ? undefined : { opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-xl sm:text-2xl md:text-3xl text-[--color-text-primary] font-light leading-snug tracking-[-0.01em] mb-8">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[--color-text-primary]">
                    {role}
                  </span>
                  <span className="w-6 h-px bg-[--color-primary] opacity-40" />
                  <span className="text-sm text-[--color-text-muted]">
                    {industry}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsCarousel, type TestimonialsCarouselProps };
