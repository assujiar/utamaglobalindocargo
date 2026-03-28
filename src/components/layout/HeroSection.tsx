"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

// Dynamic import untuk HeroGlobe - SSR disabled (WebGL hanya client-side)
const HeroGlobe = dynamic(() => import("@/components/canvas/HeroGlobe"), {
  ssr: false,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // GSAP reveal animation - tipografi bermunculan frasa demi frasa
  useGSAP(
    () => {
      const lines = headlineRef.current?.querySelectorAll("[data-reveal]");
      if (!lines) return;

      // Set initial state - opasitas nol, translasi ke bawah
      gsap.set(lines, {
        opacity: 0,
        y: 80,
        rotateX: 15,
      });

      // Stagger reveal - frasa demi frasa
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Subtitle fade in
      gsap.fromTo(
        "[data-subtitle]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 1.4,
        }
      );

      // CTA button reveal
      gsap.fromTo(
        "[data-cta]",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.8,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon-dark"
    >
      {/* WebGL Canvas - latar belakang z-index terendah */}
      <div className="absolute inset-0 z-0">
        <HeroGlobe />
      </div>

      {/* Pola SVG hexagon - kedalaman visual lapisan dekoratif */}
      <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z"
                fill="none"
                stroke="#ff4600"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Gradient overlay untuk keterbacaan teks */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-carbon-dark/40 via-transparent to-carbon-dark/80" />

      {/* Tipografi lapisan teratas DOM */}
      <div
        ref={headlineRef}
        className="relative z-[3] text-center px-6 max-w-6xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {/* Headline berskala masif - efek clip reveal overflow-hidden */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-black uppercase leading-[0.82] tracking-tighter">
          <span className="block overflow-hidden">
            <span data-reveal className="block text-white/90">
              Logistik
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-reveal className="block text-logistics-orange">
              Tanpa Drama
            </span>
          </span>
        </h1>

        {/* Sub-headline - baris kecil di bawah hero */}
        <div className="mt-6 md:mt-10 flex items-center justify-center gap-4">
          <div className="w-12 h-[1px] bg-logistics-orange/40" />
          <span data-reveal className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">
            Freight &bull; Customs &bull; Warehouse &bull; Project Cargo
          </span>
          <div className="w-12 h-[1px] bg-logistics-orange/40" />
        </div>

        {/* Subtitle */}
        <p
          data-subtitle
          className="mt-6 md:mt-10 text-base md:text-xl lg:text-2xl text-white/50 font-light max-w-2xl mx-auto tracking-wide leading-relaxed"
        >
          Logistik yang baik tidak perlu Anda pikirkan setiap hari.
          Dari pengiriman domestik sampai impor door-to-door,
          kami kelola supaya Anda bisa fokus mengembangkan bisnis.
        </p>

        {/* CTA Button */}
        <div data-cta className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#layanan"
            className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm md:text-base uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
          >
            Layanan Kami
          </a>
          <a
            href="/contact"
            className="inline-block px-10 py-4 border border-white/20 text-white/60 font-bold text-sm md:text-base uppercase tracking-widest hover:border-logistics-orange hover:text-logistics-orange transition-colors duration-300"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]">
        <div className="w-[1px] h-16 bg-gradient-to-b from-logistics-orange to-transparent animate-pulse" />
      </div>
    </section>
  );
}
