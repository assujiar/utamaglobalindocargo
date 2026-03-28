"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Data layanan
const panels = [
  {
    id: "domestic",
    number: "01",
    label: "Domestic Distribution",
    href: "/services/domestic-distribution",
    headline: "Seluruh Indonesia, Satu Koordinasi.",
    description:
      "FTL, LTL, FCL, LCL, atau airfreight domestik. Apapun mode yang dibutuhkan, kami atur dari pickup sampai delivery. Satu titik koordinasi untuk seluruh distribusi nasional Anda.",
    accent: "bg-logistics-orange",
    theme: "dark" as const,
  },
  {
    id: "international",
    number: "02",
    label: "International Freight",
    href: "/services/international-freight",
    headline: "Impor dan Ekspor Tanpa Jeda.",
    description:
      "FCL, LCL, dan airfreight untuk ekspor maupun impor. Kami tangani dari booking carrier, dokumentasi, sampai barang tiba di tujuan. Yang sering jadi bottleneck bukan jalurnya, tapi koordinasi di antara titik-titik transit. Di situ kami bekerja.",
    accent: "bg-logistics-orange",
    theme: "light" as const,
  },
  {
    id: "import-dtd",
    number: "03",
    label: "Import DTD & Customs",
    href: "/services/import-dtd",
    headline: "Dari Negara Asal Langsung ke Gudang Anda.",
    description:
      "Import door-to-door artinya Anda tidak perlu urus apapun di tengah jalan. Kami jemput dari origin, tangani customs clearance termasuk klasifikasi HS dan dokumen LARTAS, lalu antarkan sampai ke lokasi Anda.",
    accent: "bg-logistics-orange",
    theme: "dark" as const,
  },
  {
    id: "warehouse",
    number: "04",
    label: "Warehousing & Fulfillment",
    href: "/services/warehousing",
    headline: "Gudang yang Bekerja, Bukan Sekadar Menyimpan.",
    description:
      "Penyimpanan saja tidak cukup. Kami kelola inventory, atur penempatan barang untuk efisiensi picking, dan handle fulfillment per order. Gudang yang terkelola dengan benar bisa memangkas waktu dan biaya operasional secara signifikan.",
    accent: "bg-logistics-orange",
    theme: "light" as const,
  },
  {
    id: "project-cargo",
    number: "05",
    label: "Project Cargo",
    href: "/services/project-cargo",
    headline: "Muatan Khusus Butuh Penanganan Khusus.",
    description:
      "Alat berat, komponen oversized, atau material sensitif. Pengiriman seperti ini tidak bisa pakai template standar. Kami rancang solusi per proyek: survei rute, perizinan khusus, alat angkut yang tepat, sampai penempatan di lokasi tujuan.",
    accent: "bg-logistics-orange",
    theme: "dark" as const,
  },
  {
    id: "blocspace",
    number: "06",
    label: "Blocspace & Charter",
    href: "/services/blocspace",
    headline: "Kapasitas Terjamin, Bukan Sekadar Tersedia.",
    description:
      "Ketika volume Anda butuh jaminan ruang atau jadwal reguler tidak mencukupi, kami sediakan blocspace dan airfreight charter. Untuk peak season, peluncuran produk, atau kebutuhan mendesak yang tidak bisa menunggu slot berikutnya.",
    accent: "bg-logistics-orange",
    theme: "light" as const,
  },
];

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
      className={`relative w-full md:w-screen min-h-[80vh] md:h-screen flex-shrink-0 flex items-center overflow-hidden ${
        isDark ? "bg-carbon-dark" : "bg-white"
      }`}
    >
      {/* Garis indikator progress vertikal - 1px #ff4600 */}
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

      {/* Garis indikator horizontal bawah - progress rasio penyelesaian */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div
          className="h-full bg-logistics-orange"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Konten panel */}
      <div className="relative z-10 px-8 py-12 md:py-0 md:px-24 lg:px-32 xl:px-40 max-w-5xl">
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

        {/* Headline */}
        <h3
          className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight ${
            isDark ? "text-white" : "text-carbon-dark"
          }`}
        >
          {panel.headline.split(" ").map((word, i) => {
            // Aksentuasi kata kunci dengan warna oranye
            const accentWords = [
              "Koordinasi.",
              "Jeda.",
              "Gudang",
              "Anda.",
              "Khusus.",
              "Terjamin,",
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

        {/* Link ke halaman detail */}
        <div className="mt-10 flex items-center gap-4">
          <Link
            href={panel.href}
            className={`text-sm font-bold uppercase tracking-widest hover:text-logistics-orange transition-colors duration-300 ${
              isDark ? "text-white/60" : "text-carbon-dark/60"
            }`}
          >
            Lihat Detail
          </Link>
          <div className="w-12 h-[1px] bg-logistics-orange/40" />
          <div className="w-2 h-2 bg-logistics-orange rotate-45" />
        </div>
      </div>

      {/* Elemen geometris dekoratif - sudut kanan atas */}
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

export default function ServicesHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      // Hanya aktifkan horizontal scroll di desktop (>= 768px)
      // Di mobile, panel akan stack vertikal secara alami
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(trackRef.current!, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: `+=${panels.length * 1000}`,
            invalidateOnRefresh: true,
          },
        });
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
              Layanan
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
            Dari Pengiriman Lokal
            <br />
            <span className="text-logistics-orange">Sampai Kargo Internasional.</span>
            <br />
            <span className="text-white/40">Satu Partner, Semua Terurus.</span>
          </h2>
        </div>

        {/* Garis dekoratif diagonal */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-logistics-orange/10 origin-top-right rotate-12" />
      </section>

      {/* Kontainer pembajakan scroll horizontal */}
      {/* height: panels * 100vh untuk ruang penyerapan waktu gulir */}
      <div ref={sectionRef} className="relative" id="layanan">
        {/* Track baris fleksibel nowrap - lebar = panels * 100vw */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap"
          style={{ width: undefined }}
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
