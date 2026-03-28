import type { Metadata } from "next";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Studi Kasus — Utama Globalindo Cargo",
  description:
    "Bagaimana kami membantu perusahaan dari berbagai industri menyelesaikan tantangan logistik mereka. Studi kasus dengan data terverifikasi.",
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
              Studi Kasus
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
            Situasi Berbeda,
            <br />
            <span className="text-logistics-orange">Pendekatan Berbeda.</span>
            <br />
            <span className="text-white/30">Hasil Terukur.</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-2xl leading-relaxed">
            Setiap klien datang dengan tantangan yang unik. Berikut beberapa
            contoh bagaimana kami merancang solusi spesifik dan hasil
            yang tercapai.
          </p>

          {/* NDA Notice */}
          <div className="mt-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-logistics-orange/40 rotate-45 flex-shrink-0" />
            <p className="text-xs md:text-sm text-white/25 leading-relaxed">
              Kami menjunjung tinggi privasi klien dan kesepakatan NDA.
              Nama perusahaan dan identitas spesifik klien tidak ditampilkan.
            </p>
          </div>
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
