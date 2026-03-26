"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { ScrollPattern } from "@/components/motion/ScrollPattern";
import { ScrollDrivenText } from "@/components/motion/ScrollDrivenText";
import { AnimatedDivider } from "@/components/motion/AnimatedDivider";
import type { Locale } from "@/lib/i18n/config";

interface StatItem {
  value: number;
  suffix: string;
  label_id: string;
  label_en: string;
}

const stats: StatItem[] = [
  {
    value: 25,
    suffix: "+",
    label_id: "Tahun Beroperasi",
    label_en: "Years Operating",
  },
  {
    value: 150,
    suffix: "+",
    label_id: "Negara Tujuan",
    label_en: "Destination Countries",
  },
  {
    value: 98,
    suffix: "%",
    label_id: "Ketepatan Waktu",
    label_en: "On-Time Rate",
  },
  {
    value: 34,
    suffix: "",
    label_id: "Provinsi Terjangkau",
    label_en: "Provinces Covered",
  },
];

interface StatsBarProps {
  locale: Locale;
  badgesLabel?: string;
  className?: string;
}

function StatsBar({ locale, className }: StatsBarProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className={cn("py-32 sm:py-44 bg-[#080604] relative overflow-hidden", className)}
      style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,70,0,0.06) 0%, transparent 70%)" }}
    >
      {/* Scroll-driven background text */}
      <ScrollDrivenText
        text="NUMBERS"
        className="absolute top-[40%] -translate-y-1/2 z-[1]"
        speed={0.2}
        direction="left"
      />
      {/* Scroll-driven pattern */}
      <ScrollPattern variant="grid" count={14} speed={0.09} />

      {/* Top divider — animated line with diamond endpoints */}
      <div className="absolute top-0 left-0 right-0 px-10 sm:px-20">
        <AnimatedDivider color="rgba(255,171,64,0.25)" endpointShape="diamond" />
      </div>

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        {/* Stats — massive numbers in a horizontal flex row */}
        <div className="flex flex-wrap justify-between gap-y-16">
          {stats.map((stat, i) => (
            <ParallaxDepth key={stat.label_en} speed={0.05 + i * 0.02} direction="up" scrubSmooth={0.4}>
              <motion.div
                className="relative w-1/2 lg:w-auto"
                initial={prefersReduced ? undefined : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.12,
                }}
              >
                {/* Giant number */}
                <div className="stat-number text-[--color-accent-warm] leading-none" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
                  <CounterAnimation
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                {/* Label below — small, quiet */}
                <p className="mt-3 text-xs sm:text-sm text-[--color-text-muted] tracking-wide">
                  {locale === "id" ? stat.label_id : stat.label_en}
                </p>
              </motion.div>
            </ParallaxDepth>
          ))}
        </div>
      </div>

      {/* Bottom divider — barely visible hairline, unique */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.03)]" aria-hidden="true" />
    </section>
  );
}

export { StatsBar, type StatsBarProps };
