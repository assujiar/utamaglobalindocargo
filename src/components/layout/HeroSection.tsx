"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import AbstractRouteField from "@/components/canvas/AbstractRouteField";

const TRUST_ITEMS = [
  "Respons 1 hari kerja",
  "Tim operasional berpengalaman",
  "Domestik & internasional",
  "Konsultasi tanpa komitmen",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check reduced motion — skip animations if preferred
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        // Make everything visible immediately
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
        return;
      }

      const revealEls = contentRef.current?.querySelectorAll("[data-reveal]");
      if (!revealEls) return;

      // Initial state
      gsap.set(revealEls, { opacity: 0, y: 48 });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 20 });

      // Stagger headline reveal
      gsap.to(revealEls, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });

      // Fade-in secondary elements
      gsap.to("[data-hero-fade]", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.9,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0b0b0d]"
    >
      {/* ── Background: Abstract Route Field ── */}
      <AbstractRouteField />

      {/* ── Content Layer ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-0"
      >
        <div className="max-w-4xl">
          {/* ── Pretitle: service signal ── */}
          <div data-reveal className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 md:w-14 h-[1px] bg-logistics-orange/50" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-white/35">
              Freight &bull; Customs &bull; Warehouse &bull; Project Cargo
            </span>
          </div>

          {/* ── Headline ── */}
          <h1 className="leading-[0.88] tracking-tighter">
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white/90"
              >
                Logistik
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white/90"
              >
                Tanpa
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-logistics-orange"
              >
                Drama.
              </span>
            </span>
          </h1>

          {/* ── Supporting copy ── */}
          <p
            data-hero-fade
            className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-white/45 max-w-xl leading-relaxed"
          >
            Kami kelola pengiriman dari asal sampai tujuan — domestik maupun
            internasional — supaya Anda bisa fokus mengembangkan bisnis, bukan
            mengejar status kargo.
          </p>

          {/* ── CTA Group ── */}
          <div
            data-hero-fade
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          >
            {/* Primary CTA — direct business action */}
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-logistics-orange text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Diskusikan Kebutuhan Anda
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary CTA — lower commitment */}
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 px-6 py-4 text-white/50 font-bold text-sm uppercase tracking-widest hover:text-white/80 transition-colors duration-300"
            >
              <span className="w-4 h-[1px] bg-white/30" />
              Lihat Layanan
            </a>
          </div>

          {/* ── Trust strip ── */}
          <div
            data-hero-fade
            className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="text-[11px] md:text-xs font-medium uppercase tracking-[0.15em] text-white/25"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        data-hero-fade
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/15">
            Scroll
          </span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-logistics-orange/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
