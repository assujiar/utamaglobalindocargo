"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    headline: "Domestik & Internasional",
    description: "Distribusi ke seluruh Indonesia dan freight forwarding lintas negara",
  },
  {
    headline: "Customs & Compliance",
    description: "Customs brokerage, klasifikasi HS, dan pengurusan dokumen LARTAS",
  },
  {
    headline: "Warehouse & Fulfillment",
    description: "Penyimpanan, inventory management, dan fulfillment per order",
  },
  {
    headline: "Project & Special Cargo",
    description: "Muatan khusus, oversized, heavy-lift, dan airfreight charter",
  },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-stat]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-logistics-orange/30" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-carbon-dark/30">
              Kapabilitas
            </span>
            <div className="w-12 h-[1px] bg-logistics-orange/30" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-carbon-dark tracking-tight">
            Satu Partner,{" "}
            <span className="text-logistics-orange">Semua Terurus.</span>
          </h2>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {CAPABILITIES.map((cap) => (
            <div key={cap.headline} data-stat className="text-center">
              <span className="block text-lg md:text-xl font-black text-logistics-orange leading-tight tracking-tight">
                {cap.headline}
              </span>
              <span className="block mt-3 text-sm text-carbon-dark/40 leading-relaxed">
                {cap.description}
              </span>
              <div className="mt-4 mx-auto w-8 h-[1px] bg-logistics-orange/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
