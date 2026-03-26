"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
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
    label_id: "tahun beroperasi sejak 1995",
    label_en: "years of continuous operation since 1995",
  },
  {
    value: 150,
    suffix: "+",
    label_id: "negara tujuan melalui jaringan global",
    label_en: "destination countries via global network",
  },
  {
    value: 98,
    suffix: "%",
    label_id: "tingkat ketepatan waktu pengiriman",
    label_en: "on-time delivery rate",
  },
  {
    value: 34,
    suffix: "",
    label_id: "provinsi terjangkau di seluruh Indonesia",
    label_en: "provinces covered across Indonesia",
  },
];

interface StatsBarProps {
  locale: Locale;
  className?: string;
}

function StatsBar({ locale, className }: StatsBarProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label_en}
          className="relative text-center"
          initial={prefersReduced ? undefined : { opacity: 0, scale: 0.5, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.7,
            ease: [0.34, 1.56, 0.64, 1], // spring bounce
            delay: i * 0.12,
          }}
        >
          {/* Radial glow behind number */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[--color-primary] opacity-[0.10] blur-[60px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative stat-number text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] gradient-text-vivid overflow-visible">
            <CounterAnimation
              target={stat.value}
              suffix={stat.suffix}
            />
          </div>

          {/* Animated accent line under number */}
          <motion.div
            className="mx-auto mt-3 mb-3 h-0.5 bg-gradient-to-r from-transparent via-[--color-primary] to-transparent"
            initial={prefersReduced ? { width: 40 } : { width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.12 }}
          />

          <p className="relative label-text text-[--color-text-secondary]">
            {locale === "id" ? stat.label_id : stat.label_en}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export { StatsBar, type StatsBarProps };
