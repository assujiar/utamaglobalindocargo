"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

// Dynamic import untuk HeroGlobe — SSR disabled (WebGL hanya client-side)
const HeroGlobe = dynamic(() => import("@/components/canvas/HeroGlobe"), {
  ssr: false,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // GSAP reveal animation — tipografi bermunculan frasa demi frasa
  useGSAP(
    () => {
      const lines = headlineRef.current?.querySelectorAll("[data-reveal]");
      if (!lines) return;

      // Set initial state — opasitas nol, translasi ke bawah
      gsap.set(lines, {
        opacity: 0,
        y: 80,
        rotateX: 15,
      });

      // Stagger reveal — frasa demi frasa
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
      {/* WebGL Canvas — latar belakang z-index terendah */}
      <div className="absolute inset-0 z-0">
        <HeroGlobe />
      </div>

      {/* Gradient overlay untuk keterbacaan teks */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-carbon-dark/40 via-transparent to-carbon-dark/80" />

      {/* Tipografi lapisan teratas DOM */}
      <div
        ref={headlineRef}
        className="relative z-[2] text-center px-6 max-w-6xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {/* Headline berskala masif — sans-serif tebal */}
        <h1 className="text-5xl md:text-7xl lg:text-[8rem] xl:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter">
          <span data-reveal className="block text-white/90">
            Seni Mendikte
          </span>
          <span data-reveal className="block text-logistics-orange">
            Waktu &amp; Jarak
          </span>
        </h1>

        {/* Subtitle manifesto B2B */}
        <p
          data-subtitle
          className="mt-8 md:mt-12 text-base md:text-xl lg:text-2xl text-white/50 font-light max-w-2xl mx-auto tracking-wide"
        >
          Sinkronisasi Resolusi Pasokan Asimetris — Infrastruktur logistik
          korporat untuk presisi rantai pasok tingkat eksekutif.
        </p>

        {/* CTA Button */}
        <div data-cta className="mt-10 md:mt-14">
          <a
            href="#layanan"
            className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm md:text-base uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
          >
            Jelajahi Kapabilitas
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
        <div className="w-[1px] h-16 bg-gradient-to-b from-logistics-orange to-transparent animate-pulse" />
      </div>
    </section>
  );
}
