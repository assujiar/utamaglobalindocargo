import type { Metadata } from "next";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Studi Kasus — Utama Globalindo Cargo",
  description:
    "Cerita nyata dari klien yang sudah merasakan bedanya bekerja dengan partner logistik yang benar-benar paham.",
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
            Mereka Punya
            <br />
            <span className="text-logistics-orange">Masalah Nyata.</span>
            <br />
            <span className="text-white/30">Ini Cara Kami Bantu.</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-2xl leading-relaxed">
            Bukan teori, bukan simulasi. Ini cerita dari klien yang sudah
            merasakan langsung bedanya — lengkap dengan angka yang bisa
            Anda verifikasi.
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
