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
    <section className={cn("py-28 sm:py-36 section-dark relative overflow-hidden", className)}>
      {/* Ambient blur circle */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="blur-circle absolute w-[50vw] h-[50vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
      </div>

      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <motion.p
          className="label-text text-[--color-primary] mb-16 sm:mb-20"
          initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {locale === "id" ? "Dalam Angka" : "In Numbers"}
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 sm:gap-y-20 gap-x-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label_en}
              className="relative"
              initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
            >
              {/* Glow behind number */}
              <div
                className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[--color-primary] opacity-[0.06] blur-[60px] pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative stat-number text-display-lg gradient-text-vivid">
                <CounterAnimation
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              {/* Accent line */}
              <motion.div
                className="mt-4 mb-3 h-px w-10 bg-gradient-to-r from-[--color-primary] to-transparent"
                initial={prefersReduced ? undefined : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                style={{ transformOrigin: "left" }}
              />
              <p className="text-sm text-[--color-text-muted]">
                {locale === "id" ? stat.label_id : stat.label_en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StatsBar, type StatsBarProps };
