"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// Data Panel Layanan — PAS Framework (Problem-Agitate-Solve)
// Tanpa spesifikasi fitur mati; fokus penceritaan psikologis B2B
// ============================================================
const panels = [
  {
    id: "pergudangan",
    number: "01",
    label: "Resolusi Pergudangan",
    headline: "Inventaris Statis Adalah Jebakan Modal Terperangkap.",
    description:
      "Setiap meter kubik yang tidak berputar adalah laba yang menguap. Arsitektur pergudangan kami mengkonversi aset diam menjadi simpul distribusi dinamis — kelincahan infrastruktur yang membebaskan arus kas operasional Anda dari gravitasi inefisiensi.",
    accent: "bg-logistics-orange",
    theme: "dark" as const,
  },
  {
    id: "angkutan",
    number: "02",
    label: "Manajemen Angkutan Perantara",
    headline:
      "Kekacauan Fragmentasi Komunikasi Menenggelamkan Jam Operasional Eksekutif Anda.",
    description:
      "Koordinasi multi-vendor tanpa orkestrasi terpusat menciptakan entropi yang mengkonsumsi bandwidth keputusan strategis. Platform penyatuan perutean algoritma kami memusatkan visibilitas dan mereduksi titik kontak fragmentasi hingga ke satu antarmuka komando tunggal.",
    accent: "bg-logistics-orange",
    theme: "light" as const,
  },
  {
    id: "kepabeanan",
    number: "03",
    label: "Akselerasi Kepabeanan",
    headline:
      "Regulasi Bergerak Lebih Cepat Dari Kemampuan Adaptasi Manual Tim Anda.",
    description:
      "Setiap keterlambatan kepabeanan adalah penalti finansial yang berganda secara eksponensial. Mesin kepatuhan regulasi kami mengantisipasi perubahan tarif dan klasifikasi harmonized system sebelum kontainer Anda berlabuh — presisi dokumen yang mengeliminasi demurrage.",
    accent: "bg-logistics-orange",
    theme: "dark" as const,
  },
  {
    id: "rantai-pasok",
    number: "04",
    label: "Orkestrasi Rantai Pasok",
    headline:
      "Visibilitas Parsial Adalah Ilusi Kontrol Yang Lebih Berbahaya Dari Kebutaan Total.",
    description:
      "Dashboard tradisional menampilkan data historis — kami menyajikan probabilitas masa depan. Telemetri prediktif end-to-end memproyeksikan titik kegagalan rantai pasok 72 jam sebelum terjadi, memberi Anda waktu eksekusi yang tidak dimiliki kompetitor.",
    accent: "bg-logistics-orange",
    theme: "light" as const,
  },
];

// ============================================================
// Komponen Panel Individual
// ============================================================
function ServicePanel({
  panel,
  index,
  total,
}: {
  panel: (typeof panels)[0];
  index: number;
  total: number;
}) {
  const isDark = panel.theme === "dark";

  return (
    <div
      className={`relative w-screen h-screen flex-shrink-0 flex items-center overflow-hidden ${
        isDark ? "bg-carbon-dark" : "bg-white"
      }`}
    >
      {/* Garis indikator progress vertikal — 1px #ff4600 */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 flex flex-col items-center">
        <div className="w-[1px] flex-1 bg-logistics-orange/20" />
        <span
          className={`my-4 text-xs font-mono tracking-widest ${
            isDark ? "text-white/30" : "text-carbon-dark/30"
          }`}
        >
          {panel.number}/{String(total).padStart(2, "0")}
        </span>
        <div className="w-[1px] flex-1 bg-logistics-orange/20" />
      </div>

      {/* Garis indikator horizontal bawah — progress rasio penyelesaian */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div
          className="h-full bg-logistics-orange"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Konten panel */}
      <div className="relative z-10 px-16 md:px-24 lg:px-32 xl:px-40 max-w-5xl">
        {/* Label layanan */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-logistics-orange" />
          <span className="text-logistics-orange text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
            {panel.label}
          </span>
        </div>

        {/* Nomor besar dekoratif */}
        <span
          className={`block text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter absolute -right-4 md:right-12 top-1/2 -translate-y-1/2 ${
            isDark ? "text-white/[0.03]" : "text-carbon-dark/[0.03]"
          }`}
        >
          {panel.number}
        </span>

        {/* Headline PAS — tipografi masif pemantik masalah */}
        <h3
          className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight ${
            isDark ? "text-white" : "text-carbon-dark"
          }`}
        >
          {panel.headline.split(" ").map((word, i) => {
            // Aksentuasi kata kunci dengan warna oranye
            const accentWords = [
              "Jebakan",
              "Terperangkap.",
              "Menenggelamkan",
              "Ilusi",
              "Berbahaya",
              "Kebutaan",
              "Lebih",
              "Regulasi",
            ];
            const isAccent = accentWords.includes(word);
            return (
              <span
                key={i}
                className={isAccent ? "text-logistics-orange" : ""}
              >
                {word}{" "}
              </span>
            );
          })}
        </h3>

        {/* Paragraf solusi */}
        <p
          className={`mt-8 md:mt-10 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl ${
            isDark ? "text-white/50" : "text-carbon-dark/50"
          }`}
        >
          {panel.description}
        </p>

        {/* Garis dekoratif horizontal bawah paragraf */}
        <div className="mt-10 flex items-center gap-4">
          <div className="w-20 h-[1px] bg-logistics-orange/40" />
          <div className="w-2 h-2 bg-logistics-orange rotate-45" />
        </div>
      </div>

      {/* Elemen geometris dekoratif — sudut kanan atas */}
      <div className="absolute top-8 right-8 md:top-16 md:right-16">
        <div
          className={`w-16 h-16 md:w-24 md:h-24 border ${
            isDark ? "border-white/10" : "border-carbon-dark/10"
          }`}
        />
        <div className="absolute top-2 right-2 w-3 h-3 bg-logistics-orange" />
      </div>
    </div>
  );
}

// ============================================================
// Komponen Utama — Horizontal Scroll Hijacking via ScrollTrigger
// ============================================================
export default function ServicesHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      // Animasi horizontal: xPercent bergeser -100 * (panels.length - 1)
      // Menterjemahkan scroll vertikal → pergerakan lateral panel
      gsap.to(trackRef.current, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: `+=${panels.length * 1000}`,
          // invalidateOnRefresh untuk responsivitas resize
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* Header transisi sebelum horizontal scroll */}
      <section className="relative py-32 md:py-48 bg-carbon-dark overflow-hidden">
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              Ekosistem Layanan
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
            Kami Tidak Menjual
            <br />
            <span className="text-logistics-orange">Logistik.</span>
            <br />
            <span className="text-white/40">Kami Mengeliminasi Gesekan.</span>
          </h2>
        </div>

        {/* Garis dekoratif diagonal */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-logistics-orange/10 origin-top-right rotate-12" />
      </section>

      {/* Kontainer pembajakan scroll horizontal */}
      {/* height: panels * 100vh untuk ruang penyerapan waktu gulir */}
      <div ref={sectionRef} className="relative" id="layanan">
        {/* Track baris fleksibel nowrap — lebar = panels * 100vw */}
        <div
          ref={trackRef}
          className="flex flex-nowrap"
          style={{ width: `${panels.length * 100}vw` }}
        >
          {panels.map((panel, index) => (
            <ServicePanel
              key={panel.id}
              panel={panel}
              index={index}
              total={panels.length}
            />
          ))}
        </div>
      </div>
    </>
  );
}
