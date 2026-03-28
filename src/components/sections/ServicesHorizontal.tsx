"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    id: "domestic",
    number: "01",
    label: "Domestic Distribution",
    href: "/services/domestic-distribution",
    headline: "Seluruh Indonesia, Satu Koordinasi.",
    description:
      "FTL, LTL, FCL, LCL, atau airfreight domestik. Apapun mode yang dibutuhkan, kami atur dari pickup sampai delivery. Satu titik koordinasi untuk seluruh distribusi nasional Anda.",
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
    theme: "light" as const,
  },
];

const ACCENT_WORDS = new Set([
  "Koordinasi.",
  "Jeda.",
  "Gudang",
  "Anda.",
  "Khusus.",
  "Terjamin,",
]);

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
      className={`service-panel relative w-screen h-screen flex-shrink-0 flex items-center overflow-hidden ${
        isDark ? "bg-carbon-dark" : "bg-white"
      }`}
    >
      {/* Vertical progress indicator */}
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

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div
          className="h-full bg-logistics-orange"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-16 md:px-24 lg:px-32 xl:px-40">
        <div className="max-w-3xl">
          {/* Service label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
              {panel.label}
            </span>
          </div>

          {/* Decorative large number */}
          <span
            className={`block text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter absolute right-8 md:right-16 top-1/2 -translate-y-1/2 select-none ${
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
            {panel.headline.split(" ").map((word, i) => (
              <span
                key={i}
                className={ACCENT_WORDS.has(word) ? "text-logistics-orange" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h3>

          {/* Description */}
          <p
            className={`mt-8 md:mt-10 text-base md:text-lg leading-relaxed max-w-2xl ${
              isDark ? "text-white/50" : "text-carbon-dark/50"
            }`}
          >
            {panel.description}
          </p>

          {/* Link */}
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
      </div>
    </div>
  );
}

// ─── Mobile: vertical card layout ───

function ServiceCardMobile({
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
      className={`relative px-6 py-16 ${isDark ? "bg-carbon-dark" : "bg-white"}`}
    >
      <div className="max-w-xl mx-auto">
        {/* Label + number */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-[11px] font-bold uppercase tracking-[0.25em]">
              {panel.label}
            </span>
          </div>
          <span
            className={`text-xs font-mono tracking-widest ${
              isDark ? "text-white/20" : "text-carbon-dark/20"
            }`}
          >
            {panel.number}/{String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Headline */}
        <h3
          className={`text-2xl sm:text-3xl font-black leading-[1.1] tracking-tight ${
            isDark ? "text-white" : "text-carbon-dark"
          }`}
        >
          {panel.headline.split(" ").map((word, i) => (
            <span
              key={i}
              className={ACCENT_WORDS.has(word) ? "text-logistics-orange" : ""}
            >
              {word}{" "}
            </span>
          ))}
        </h3>

        {/* Description */}
        <p
          className={`mt-5 text-sm leading-relaxed ${
            isDark ? "text-white/45" : "text-carbon-dark/45"
          }`}
        >
          {panel.description}
        </p>

        {/* Link */}
        <div className="mt-6">
          <Link
            href={panel.href}
            className={`inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-logistics-orange transition-colors duration-300 ${
              isDark ? "text-white/50" : "text-carbon-dark/50"
            }`}
          >
            Lihat Detail
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      {index < total - 1 && (
        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-logistics-orange/10" />
      )}
    </div>
  );
}

// ─── Main component ───

export default function ServicesHorizontal() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pinRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Calculate exact scroll distance: total track width minus one viewport
        const totalPanels = panels.length;
        const scrollDistance = (totalPanels - 1) * window.innerWidth;

        gsap.to(trackRef.current!, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 0.8,
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: pinRef }
  );

  return (
    <>
      {/* Section header */}
      <section className="relative py-24 md:py-40 bg-carbon-dark overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 md:w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              Layanan
            </span>
          </div>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] max-w-4xl">
            Dari Pengiriman Lokal
            <br />
            <span className="text-logistics-orange">Sampai Kargo Internasional.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/40 max-w-xl leading-relaxed">
            Satu partner, semua terurus. Scroll untuk melihat layanan kami.
          </p>
        </div>
      </section>

      {/* Desktop: horizontal scroll-pinned panels */}
      <div ref={pinRef} className="hidden md:block relative overflow-hidden" id="layanan">
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

      {/* Mobile: vertical stack */}
      <div className="md:hidden" id="layanan-mobile">
        {panels.map((panel, index) => (
          <ServiceCardMobile
            key={panel.id}
            panel={panel}
            index={index}
            total={panels.length}
          />
        ))}
      </div>
    </>
  );
}
