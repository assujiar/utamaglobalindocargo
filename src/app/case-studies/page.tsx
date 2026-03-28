import type { Metadata } from "next";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Studi Kasus | Utama Globalindo Cargo",
  description:
    "Contoh ilustratif bagaimana pendekatan logistik yang tepat dapat menyelesaikan tantangan operasional di berbagai industri.",
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
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-2xl leading-relaxed">
            Contoh ilustratif bagaimana pendekatan logistik yang terstruktur
            dapat menyelesaikan tantangan operasional di berbagai industri.
            Skenario di bawah menggambarkan pola umum yang kami tangani.
          </p>

          {/* Illustrative notice */}
          <div className="mt-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-logistics-orange/40 rotate-45 flex-shrink-0" />
            <p className="text-xs md:text-sm text-white/25 leading-relaxed">
              Skenario bersifat ilustratif berdasarkan pola operasional umum
              di industri logistik. Nama perusahaan dan detail spesifik tidak
              ditampilkan.
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
