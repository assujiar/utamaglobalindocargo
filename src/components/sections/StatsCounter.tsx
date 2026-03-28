"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 14, suffix: "+", label: "Negara Tujuan Aktif", prefix: "" },
  { value: 340, suffix: "+", label: "Kontainer Dikelola / Bulan", prefix: "" },
  { value: 99.7, suffix: "%", label: "On-Time Delivery Rate", prefix: "" },
  { value: 4.7, suffix: "M", label: "Efisiensi Biaya Klien / Tahun", prefix: "$" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
  triggered,
}: {
  value: number;
  suffix: string;
  prefix: string;
  triggered: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplay(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [triggered, value]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toLocaleString()
    : display.toFixed(1);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  const handleTrigger = useCallback(() => setTriggered(true), []);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: handleTrigger,
      });

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
              Track Record
            </span>
            <div className="w-12 h-[1px] bg-logistics-orange/30" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-carbon-dark tracking-tight">
            Bukan Klaim. <span className="text-logistics-orange">Ini Data.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="text-center">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-logistics-orange leading-none tracking-tight">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  triggered={triggered}
                />
              </span>
              <span className="block mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-carbon-dark/30">
                {stat.label}
              </span>
              {/* Garis dekoratif */}
              <div className="mt-4 mx-auto w-8 h-[1px] bg-logistics-orange/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
