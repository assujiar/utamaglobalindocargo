import type { Metadata } from "next";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Studi Kasus — Utama Global Indo Cargo",
  description:
    "Bukti operasional: studi kasus transformasi logistik B2B dari klien enterprise di seluruh Asia Pasifik.",
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-carbon-dark min-h-screen">
      {/* Header halaman */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              Bukti Operasional
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
            Kami Tidak Berbicara
            <br />
            <span className="text-logistics-orange">Tentang Hasil.</span>
            <br />
            <span className="text-white/30">Kami Membuktikannya.</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-2xl leading-relaxed">
            Setiap studi kasus merepresentasikan transformasi operasional nyata —
            bukan proyeksi teoretis. Data yang ditampilkan adalah hasil
            terverifikasi dari implementasi langsung.
          </p>
        </div>
      </section>

      {/* Grid studi kasus */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <CaseStudyGrid />
        </div>
      </section>
    </main>
  );
}
