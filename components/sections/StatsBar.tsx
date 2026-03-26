"use client";

import { cn } from "@/lib/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { Shield } from "lucide-react";
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
    label_id: "Tahun Beroperasi Sejak 1995",
    label_en: "Years of Continuous Operation Since 1995",
  },
  {
    value: 150,
    suffix: "+",
    label_id: "Negara Tujuan Melalui Jaringan Global",
    label_en: "Destination Countries via Global Network",
  },
  {
    value: 98,
    suffix: "%",
    label_id: "Tingkat Ketepatan Waktu Pengiriman",
    label_en: "On-Time Delivery Rate",
  },
  {
    value: 34,
    suffix: "",
    label_id: "Provinsi Terjangkau di Seluruh Indonesia",
    label_en: "Provinces Covered Across Indonesia",
  },
];

interface StatsBarProps {
  locale: Locale;
  badgesLabel?: string;
  className?: string;
}

function StatsBar({ locale, badgesLabel, className }: StatsBarProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className={cn("py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden", className)}>
      {/* Giant watermark */}
      <div className="absolute top-[5%] right-[-3%] pointer-events-none" aria-hidden="true">
        <Shield className="size-[240px] sm:size-[380px] text-[--color-primary] opacity-[0.02] rotate-[-8deg]" strokeWidth={0.4} />
      </div>

      <div className="absolute inset-0 radial-burst pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        {/* Section label with entrance animation */}
        <motion.p
          className="label-text text-[--color-primary] text-center mb-12"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {locale === "id" ? "Rekam Jejak Kami" : "Our Track Record"}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label_en}
              className="relative text-center"
              initial={prefersReduced ? undefined : { opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
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

        {/* Badges area */}
        {badgesLabel && (
          <motion.div
            className="text-center"
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="label-text text-[--color-text-secondary]">
              {badgesLabel}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { StatsBar, type StatsBarProps };
