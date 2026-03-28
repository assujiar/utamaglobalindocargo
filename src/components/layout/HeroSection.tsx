"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CityLoopHero from "@/components/canvas/CityLoopHero";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const reveals = contentRef.current?.querySelectorAll("[data-reveal]");
      const fades = contentRef.current?.querySelectorAll("[data-fade]");

      if (prefersReduced) {
        if (reveals) gsap.set(reveals, { opacity: 1, y: 0 });
        if (fades) gsap.set(fades, { opacity: 1, y: 0 });
        return;
      }

      if (reveals) {
        gsap.set(reveals, { opacity: 0, y: 50 });
        gsap.to(reveals, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.4,
        });
      }

      if (fades) {
        gsap.set(fades, { opacity: 0, y: 14 });
        gsap.to(fades, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 1.0,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#08080a]"
    >
      {/* 3D Scene Background */}
      <CityLoopHero />

      {/* Readability veil — darkens the upper content zone */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(8,8,10,0.55) 0%, transparent 55%),
            linear-gradient(to bottom, rgba(8,8,10,0.35) 0%, transparent 25%, transparent 65%, rgba(8,8,10,0.45) 100%)
          `,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 pb-20 pt-28 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Pretitle */}
          <div data-reveal className="mb-5 md:mb-7 flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 md:w-10 bg-logistics-orange/40" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              Freight &bull; Customs &bull; Warehouse &bull; Project Cargo
            </span>
            <span className="h-[1px] w-6 md:w-10 bg-logistics-orange/40" />
          </div>

          {/* Headline */}
          <h1 className="leading-[0.88] tracking-tighter">
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white"
              >
                Logistik
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white"
              >
                Tanpa
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-logistics-orange"
              >
                Drama.
              </span>
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            data-fade
            className="mx-auto mt-6 md:mt-8 max-w-xl text-[15px] md:text-lg text-white/60 leading-relaxed"
          >
            Pickup, freight, customs, warehousing — satu titik koordinasi
            dari asal sampai tujuan. Anda terima barang, bukan masalah.
          </p>

          {/* CTAs */}
          <div
            data-fade
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-logistics-orange px-8 md:px-10 py-4 text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Kirim Permintaan
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center border border-white/12 px-7 py-4 text-white/50 text-sm font-bold uppercase tracking-widest hover:border-white/25 hover:text-white/75 transition-all duration-300"
            >
              Lihat Layanan
            </a>
          </div>

          {/* Service capability line */}
          <div
            data-fade
            className="mx-auto mt-12 md:mt-16 flex items-center justify-center gap-3"
          >
            <span className="h-[1px] w-5 md:w-8 bg-white/8" />
            <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.15em] text-white/22">
              Distribusi domestik &bull; Freight internasional &bull; Customs &bull; Gudang &bull; Kargo khusus
            </span>
            <span className="h-[1px] w-5 md:w-8 bg-white/8" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-fade
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>
  );
}
