"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/caseStudiesData";

interface CaseStudyCardProps {
  study: CaseStudy;
  onSelect: (id: string) => void;
}

export default function CaseStudyCard({ study, onSelect }: CaseStudyCardProps) {
  const isDark = study.color === "dark";

  return (
    <motion.article
      layoutId={`case-study-card-${study.id}`}
      onClick={() => onSelect(study.id)}
      className={`group relative cursor-pointer overflow-hidden ${
        isDark ? "bg-carbon-dark" : "bg-white border border-carbon-dark/10"
      } ${
        study.gridSpan === "tall"
          ? "row-span-2"
          : study.gridSpan === "wide"
            ? "md:col-span-2"
            : ""
      }`}
      style={{ borderRadius: 0 }}
      transition={{
        layout: {
          duration: 0.7,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      }}
    >
      {/* Zona gambar dengan hover scaling - dinonaktifkan di mobile */}
      <motion.div
        layoutId={`case-study-hero-image-${study.id}`}
        className="relative w-full overflow-hidden"
        style={{
          height: study.gridSpan === "tall" ? "60%" : "55%",
          minHeight: "200px",
        }}
      >
        {/* Latar visual generatif - gradient sebagai pengganti foto */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-out
            md:group-hover:scale-110
            ${
              isDark
                ? "bg-gradient-to-br from-carbon-dark via-carbon-dark/80 to-logistics-orange/20"
                : "bg-gradient-to-br from-white via-gray-100 to-logistics-orange/10"
            }`}
        />

        {/* Metrik overlay besar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-black text-logistics-orange leading-none">
              {study.metric}
            </span>
            <span
              className={`block mt-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] ${
                isDark ? "text-white/40" : "text-carbon-dark/40"
              }`}
            >
              {study.metricLabel}
            </span>
          </div>
        </div>

        {/* Garis dekoratif diagonal */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-logistics-orange/20 origin-top-right rotate-12" />
      </motion.div>

      {/* Konten kartu */}
      <div className="p-6 md:p-8">
        {/* Label industri */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-logistics-orange" />
          <span className="text-logistics-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
            {study.industry}
          </span>
        </div>

        {/* Judul studi kasus */}
        <motion.h3
          layoutId={`case-study-title-${study.id}`}
          className={`text-lg md:text-xl lg:text-2xl font-black leading-tight tracking-tight ${
            isDark ? "text-white" : "text-carbon-dark"
          }`}
        >
          {study.title}
        </motion.h3>

        {/* Ringkasan */}
        <p
          className={`mt-3 text-sm leading-relaxed line-clamp-3 ${
            isDark ? "text-white/40" : "text-carbon-dark/40"
          }`}
        >
          {study.summary}
        </p>

        {/* Indikator buka */}
        <div className="mt-6 flex items-center gap-2">
          <div className="w-6 h-[1px] bg-logistics-orange transition-all duration-300 group-hover:w-12" />
          <span className="text-logistics-orange text-xs font-bold uppercase tracking-widest">
            Baca
          </span>
        </div>
      </div>
    </motion.article>
  );
}
