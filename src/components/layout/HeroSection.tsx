"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import AbstractRouteField from "@/components/canvas/AbstractRouteField";

const TRUST_SIGNALS = [
  "Respons 1 hari kerja",
  "Satu titik koordinasi",
  "Domestik & internasional",
  "Customs clearance terintegrasi",
];

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
        gsap.set(reveals, { opacity: 0, y: 48 });
        gsap.to(reveals, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      if (fades) {
        gsap.set(fades, { opacity: 0, y: 16 });
        gsap.to(fades, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.9,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#0b0b0d]"
    >
      {/* Background */}
      <AbstractRouteField />

      {/* Geometric texture overlay — structural depth between bg and content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 pb-16 pt-28 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Pretitle */}
          <div data-reveal className="mb-6 md:mb-8 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 md:w-12 bg-logistics-orange/40" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              Freight &bull; Customs &bull; Warehouse &bull; Project Cargo
            </span>
            <span className="h-[1px] w-8 md:w-12 bg-logistics-orange/40" />
          </div>

          {/* Headline */}
          <h1 className="leading-[0.88] tracking-tighter">
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white/90"
              >
                Logistik
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-reveal
                className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white/90"
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
            className="mx-auto mt-6 md:mt-8 max-w-lg text-[15px] md:text-lg text-white/55 leading-relaxed"
          >
            Pengiriman dari asal sampai tujuan, domestik maupun internasional.
            Satu koordinator, status yang jelas, tanpa Anda harus ikut mikirin operasional.
          </p>

          {/* CTAs */}
          <div
            data-fade
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          >
            {/* Primary */}
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-logistics-orange px-8 md:px-10 py-4 text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
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
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary */}
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 px-5 py-4 text-white/40 text-sm font-semibold uppercase tracking-widest hover:text-white/70 transition-colors duration-300"
            >
              Lihat Layanan
            </a>
          </div>

          {/* Trust strip */}
          <div
            data-fade
            className="mx-auto mt-10 md:mt-14 max-w-2xl border-t border-white/[0.06] pt-5 md:pt-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 md:gap-x-7">
              {TRUST_SIGNALS.map((item) => (
                <span
                  key={item}
                  className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] text-white/22"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — line only, no label */}
      <div
        data-fade
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
