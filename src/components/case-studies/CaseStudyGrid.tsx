"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { caseStudies } from "@/lib/caseStudiesData";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyModal from "./CaseStudyModal";

// ============================================================
// Offset margin vertikal per kolom — menciptakan ilusi
// mengambang bebas di angkasa (kisi asimetris)
// ============================================================
const COLUMN_OFFSETS = [
  "mt-0",        // Kolom 1: flush atas
  "mt-16 md:mt-24", // Kolom 2: offset ke bawah
  "mt-8 md:mt-12",  // Kolom 3: offset menengah
  "mt-20 md:mt-32", // Kolom 4: offset maksimal
];

export default function CaseStudyGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStudy = caseStudies.find((s) => s.id === selectedId);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    // Kunci scroll body saat modal terbuka
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <LayoutGroup>
      {/* Kisi asimetris — variasi margin vertikal per kartu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {caseStudies.map((study, index) => (
          <div key={study.id} className={COLUMN_OFFSETS[index % COLUMN_OFFSETS.length]}>
            <CaseStudyCard study={study} onSelect={handleSelect} />
          </div>
        ))}
      </div>

      {/* AnimatePresence — memantau mount/unmount modal */}
      <AnimatePresence>
        {selectedId && selectedStudy && (
          <CaseStudyModal
            key={selectedId}
            study={selectedStudy}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
