"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { ScrollDrivenText } from "@/components/motion/ScrollDrivenText";
import { ScrollPattern } from "@/components/motion/ScrollPattern";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
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

/**
 * Draggable testimonial slider — Buzzworthy-style.
 * Users can click and drag horizontally to navigate between testimonials.
 * Each card has its own scroll-driven parallax depth.
 * Includes momentum snap and drag cursor feedback.
 */
function TestimonialsCarousel({ locale, className }: TestimonialsCarouselProps) {
  const prefersReduced = useReducedMotion();
  const constraintRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Calculate overflow width for drag constraints
  useEffect(() => {
    if (!trackRef.current || !constraintRef.current) return;
    const calcWidth = () => {
      const track = trackRef.current!;
      const container = constraintRef.current!;
      setTrackWidth(track.scrollWidth - container.offsetWidth);
    };
    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, []);

  // Per-card opacity based on drag position
  const cardOpacities = testimonials.map((_, i) => {
    const cardWidth = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.85, 700) : 700;
    const start = -(i * (cardWidth + 32));
    return useTransform(x, [start + cardWidth, start, start - cardWidth], [0.4, 1, 0.4]);
  });

  // Per-card scale based on drag position
  const cardScales = testimonials.map((_, i) => {
    const cardWidth = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.85, 700) : 700;
    const start = -(i * (cardWidth + 32));
    return useTransform(x, [start + cardWidth, start, start - cardWidth], [0.95, 1, 0.95]);
  });

  // Snap to nearest card on drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    if (!trackRef.current) return;

    const cardWidth = trackRef.current.children[0]?.clientWidth ?? 700;
    const gap = 32;
    const step = cardWidth + gap;
    const currentX = x.get();
    const snapIndex = Math.round(-currentX / step);
    const clampedIndex = Math.max(0, Math.min(snapIndex, testimonials.length - 1));

    controls.start({
      x: -(clampedIndex * step),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };

  return (
    <GSAPProvider>
      <section
        className={cn("py-28 sm:py-40 bg-[#0C0908] relative overflow-hidden", className)}
      >
        {/* Scroll-driven background text */}
        <ScrollDrivenText
          text="TESTIMONIALS"
          className="absolute top-[35%] -translate-y-1/2 z-[1]"
          speed={0.2}
          direction="right"
        />
        <ScrollPattern variant="dots" count={10} speed={0.07} />

        {/* Unique divider: shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px shimmer-line" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Label */}
          <ParallaxDepth speed={0.05} direction="down" scrubSmooth={0.5}>
            <div className="flex items-center justify-between mb-10 sm:mb-14">
              <p className="label-text text-[--color-text-muted]">
                {locale === "id" ? "Kata Klien" : "Testimonials"}
              </p>
              <p className="text-xs text-[--color-text-muted] hidden sm:block">
                {locale === "id" ? "Geser untuk melihat" : "Drag to explore"} →
              </p>
            </div>
          </ParallaxDepth>

          {/* Draggable slider container */}
          <div
            ref={constraintRef}
            className={cn(
              "overflow-hidden",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
          >
            <motion.div
              ref={trackRef}
              className="flex gap-8 will-change-transform"
              drag="x"
              dragConstraints={{ left: -trackWidth, right: 0 }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{ x }}
            >
              {testimonials.map((testimonial, i) => {
                const quote = locale === "id" ? testimonial.quote_id : testimonial.quote_en;
                const role = locale === "id" ? testimonial.role_id : testimonial.role_en;
                const industry = locale === "id" ? testimonial.industry_id : testimonial.industry_en;

                return (
                  <motion.div
                    key={i}
                    className={cn(
                      "flex-shrink-0 w-[85vw] max-w-[700px]",
                      "p-8 sm:p-12 rounded-2xl",
                      "bg-[rgba(255,255,255,0.02)]",
                      "border border-[rgba(255,255,255,0.06)]",
                      "backdrop-blur-sm",
                      "select-none",
                    )}
                    style={{
                      opacity: prefersReduced ? 1 : cardOpacities[i],
                      scale: prefersReduced ? 1 : cardScales[i],
                    }}
                  >
                    <blockquote className="text-heading-md sm:text-heading-lg md:text-heading-xl text-[--color-text-primary] font-light leading-[1.2] tracking-[-0.02em]">
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
                );
              })}
            </motion.div>
          </div>

          {/* Drag progress indicator */}
          <div className="mt-10 flex items-center gap-2">
            {testimonials.map((_, i) => {
              const cardWidth = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.85, 700) : 700;
              const step = cardWidth + 32;
              const dotOpacity = useTransform(
                x,
                [-(i * step) - step / 2, -(i * step), -(i * step) + step / 2],
                [0.15, 1, 0.15],
              );
              const dotWidth = useTransform(
                x,
                [-(i * step) - step / 2, -(i * step), -(i * step) + step / 2],
                [24, 48, 24],
              );

              return (
                <motion.div
                  key={i}
                  className="h-px bg-[--color-primary]"
                  style={{ opacity: dotOpacity, width: dotWidth }}
                />
              );
            })}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { TestimonialsCarousel, type TestimonialsCarouselProps };
