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
    <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark] relative", className)}>
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 sm:gap-y-16 gap-x-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label_en}
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
            >
              <div className="stat-number text-display-lg gradient-text-vivid">
                <CounterAnimation
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-3 text-sm text-[--color-text-muted]">
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
