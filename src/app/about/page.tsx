import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "PT Utama Globalindo Cargo — freight forwarder dan mitra logistik berbasis di Jakarta. Melayani distribusi domestik, freight internasional, customs brokerage, warehousing, dan project cargo.",
  alternates: {
    canonical: "https://utamaglobalindocargo.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-carbon-dark min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              Tentang Kami
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
            Mitra Logistik
            <br />
            <span className="text-logistics-orange">yang Bisa Diandalkan.</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-3xl leading-relaxed">
            PT Utama Globalindo Cargo adalah perusahaan freight forwarding dan
            logistik berbasis di Jakarta, Indonesia. Kami melayani perusahaan
            dari berbagai industri yang membutuhkan partner logistik untuk
            distribusi domestik, freight internasional, customs brokerage,
            warehousing, dan project cargo.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-logistics-orange" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  Apa yang Kami Kerjakan
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Koordinasi logistik{" "}
                <span className="text-logistics-orange">dari awal sampai tujuan.</span>
              </h2>
              <p className="mt-6 text-base text-white/40 leading-relaxed">
                Kami mengelola proses pengiriman dari titik asal sampai tujuan
                akhir — termasuk pemilihan mode transportasi, dokumentasi,
                customs clearance, dan penyimpanan. Satu titik koordinasi
                untuk seluruh kebutuhan logistik Anda.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-logistics-orange" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  Siapa yang Kami Layani
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Perusahaan yang butuh{" "}
                <span className="text-logistics-orange">keandalan, bukan janji.</span>
              </h2>
              <p className="mt-6 text-base text-white/40 leading-relaxed">
                Klien kami berasal dari berbagai sektor — manufacturing,
                commodities, FMCG, e-commerce, farmasi, dan energi. Yang
                menyatukan mereka: kebutuhan akan partner logistik yang bisa
                diajak bicara langsung, responsif, dan tidak menghilang saat
                ada masalah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Summary */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-logistics-orange" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-carbon-dark/30">
              Lingkup Layanan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Distribusi Domestik",
                desc: "FTL, LTL, FCL, LCL, airfreight ke seluruh Indonesia",
                href: "/services/domestic-distribution",
              },
              {
                title: "International Freight",
                desc: "Ekspor dan impor via laut dan udara",
                href: "/services/international-freight",
              },
              {
                title: "Import Door-to-Door",
                desc: "Dari negara asal langsung ke gudang Anda",
                href: "/services/import-dtd",
              },
              {
                title: "Customs Brokerage",
                desc: "Pengurusan bea cukai dan dokumen LARTAS",
                href: "/services/import-dtd",
              },
              {
                title: "Warehousing & Fulfillment",
                desc: "Penyimpanan, inventory management, fulfillment",
                href: "/services/warehousing",
              },
              {
                title: "Project Cargo",
                desc: "Muatan khusus, oversized, dan heavy-lift",
                href: "/services/project-cargo",
              },
            ].map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group block p-6 border border-carbon-dark/10 hover:border-logistics-orange/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-black text-carbon-dark tracking-tight group-hover:text-logistics-orange transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="mt-2 text-sm text-carbon-dark/40 leading-relaxed">
                  {svc.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-logistics-orange" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Pendekatan Kami
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Satu Titik Koordinasi",
                desc: "Anda bicara dengan satu tim. Bukan dilempar dari satu departemen ke departemen lain. Setiap pengiriman punya penanggung jawab yang jelas.",
              },
              {
                title: "Transparan dan Responsif",
                desc: "Kami update status proaktif. Kalau ada masalah, kami informasikan beserta solusinya — bukan menunggu Anda yang harus mengejar.",
              },
              {
                title: "Tidak Ada Template",
                desc: "Setiap klien punya kebutuhan berbeda. Kami evaluasi dulu, baru sampaikan apakah dan bagaimana kami bisa membantu. Bukan langsung kirim proposal generik.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 w-8 h-[1px] bg-logistics-orange/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto text-center py-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Ada Kebutuhan Logistik?
          </h2>
          <p className="mt-6 text-base text-white/40 max-w-xl mx-auto leading-relaxed">
            Ceritakan situasi Anda. Kami akan evaluasi dan sampaikan
            rekomendasi yang sesuai.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
