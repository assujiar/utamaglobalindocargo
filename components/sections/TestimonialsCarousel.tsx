"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
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

  // Auto-advance
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
      className={cn("py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.04] blur-[160px]" />
      </div>

      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <motion.p
          className="label-text text-[--color-primary] text-center mb-4"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {locale === "id" ? "Kata Klien Kami" : "Client Testimonials"}
        </motion.p>

        {/* Quote icon */}
        <div className="flex justify-center mb-8">
          <Quote className="size-10 text-[--color-primary] opacity-20" strokeWidth={1} />
        </div>

        {/* Testimonial content with crossfade */}
        <div className="max-w-2xl mx-auto text-center min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="text-lg sm:text-xl md:text-2xl text-[--color-text-inverse] font-medium leading-relaxed mb-8">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-semibold text-[--color-text-primary]">
                  {role}
                </span>
                <span className="label-text text-[--color-primary] text-xs">
                  {industry}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "size-2.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "bg-[--color-primary] shadow-[0_0_12px_rgba(255,70,0,0.5)] scale-125"
                  : "bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.3)]",
              )}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { TestimonialsCarousel, type TestimonialsCarouselProps };
