"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  "Manufacturing",
  "Pharmaceutical",
  "E-Commerce & Retail",
  "Commodities Trading",
  "FMCG",
  "Energy & Mining",
  "Automotive",
  "Technology",
];

export default function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-logo]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white border-y border-carbon-dark/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-logistics-orange/30" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-carbon-dark/30">
            Dipercaya Lintas Industri
          </span>
          <div className="w-12 h-[1px] bg-logistics-orange/30" />
        </div>

        {/* Logo grid - placeholder teks karena belum ada aset gambar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {CLIENTS.map((client) => (
            <div
              key={client}
              data-logo
              className="flex items-center justify-center h-16 md:h-20 border border-carbon-dark/5 group hover:border-logistics-orange/20 transition-colors duration-300"
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-carbon-dark/20 group-hover:text-carbon-dark/40 transition-colors duration-300">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
