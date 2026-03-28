"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/caseStudiesData";

interface CaseStudyModalProps {
  study: CaseStudy;
  onClose: () => void;
}

export default function CaseStudyModal({
  study,
  onClose,
}: CaseStudyModalProps) {
  const isDark = study.color === "dark";
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ESC to close + focus trap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={study.title}
      >
        <div className="min-h-full flex items-start justify-center p-4 md:p-8">
          <motion.article
            layoutId={`case-study-card-${study.id}`}
            className={`relative w-full max-w-5xl ${
              isDark ? "bg-carbon-dark" : "bg-white"
            }`}
            style={{ borderRadius: 0 }}
            transition={{
              layout: {
                duration: 0.7,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center group"
              aria-label="Tutup studi kasus"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-logistics-orange rotate-45 transition-transform group-hover:rotate-[135deg]" />
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-logistics-orange -rotate-45 transition-transform group-hover:rotate-[45deg]" />
              </div>
            </button>

            {/* Hero image area */}
            <motion.div
              layoutId={`case-study-hero-image-${study.id}`}
              className="relative w-full overflow-hidden"
              style={{ height: "45vh", minHeight: "300px" }}
            >
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? "bg-gradient-to-br from-carbon-dark via-carbon-dark/80 to-logistics-orange/20"
                    : "bg-gradient-to-br from-white via-gray-100 to-logistics-orange/10"
                }`}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-7xl md:text-9xl lg:text-[12rem] font-black text-logistics-orange leading-none">
                    {study.metric}
                  </span>
                  <span
                    className={`block mt-3 text-sm md:text-base font-bold uppercase tracking-[0.3em] ${
                      isDark ? "text-white/40" : "text-carbon-dark/40"
                    }`}
                  >
                    {study.metricLabel}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-8 md:left-12">
                <span
                  className={`text-xs font-bold uppercase tracking-[0.25em] ${
                    isDark ? "text-white/30" : "text-carbon-dark/30"
                  }`}
                >
                  Ilustratif / NDA Protected
                </span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-8 md:p-12 lg:p-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                  {study.industry}
                </span>
              </div>

              <motion.h2
                layoutId={`case-study-title-${study.id}`}
                className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight ${
                  isDark ? "text-white" : "text-carbon-dark"
                }`}
              >
                {study.title}
              </motion.h2>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {[
                  { label: "Tantangan", text: study.challenge },
                  { label: "Solusi", text: study.solution },
                  { label: "Hasil", text: study.result },
                ].map((col) => (
                  <div key={col.label}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-logistics-orange rotate-45" />
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.25em] ${
                          isDark ? "text-white/30" : "text-carbon-dark/30"
                        }`}
                      >
                        {col.label}
                      </span>
                    </div>
                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        isDark ? "text-white/60" : "text-carbon-dark/60"
                      }`}
                    >
                      {col.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-logistics-orange/20" />
                <div className="w-2 h-2 bg-logistics-orange rotate-45" />
                <div className="flex-1 h-[1px] bg-logistics-orange/20" />
              </div>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </>
  );
}
