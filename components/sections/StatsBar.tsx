"use client";

import { cn } from "@/lib/utils/cn";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
  return (
    <ScrollReveal>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8",
          className,
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label_en} className="text-center">
            <div className="stat-number text-4xl sm:text-5xl md:text-[56px] text-[--color-text-inverse]">
              <CounterAnimation
                target={stat.value}
                suffix={stat.suffix}
                className="text-[--color-text-inverse]"
              />
            </div>
            <p className="mt-3 label-text text-[--color-text-secondary]">
              {locale === "id" ? stat.label_id : stat.label_en}
            </p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

export { StatsBar, type StatsBarProps };
