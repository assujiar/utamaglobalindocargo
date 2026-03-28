import Link from "next/link";
import HeroSection from "@/components/layout/HeroSection";
import ServicesHorizontal from "@/components/sections/ServicesHorizontal";
import StatsCounter from "@/components/sections/StatsCounter";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Abstract Route Field + GSAP reveal */}
      <HeroSection />

      {/* Company Intro — who we are, why trust us */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-logistics-orange" />
                <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                  Tentang Kami
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-carbon-dark tracking-tight leading-[0.95]">
                Freight Forwarder
                <br />
                <span className="text-logistics-orange">Berbasis di Jakarta.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base md:text-lg text-carbon-dark/50 leading-relaxed">
                PT Utama Globalindo Cargo adalah perusahaan freight forwarding
                dan logistik yang melayani distribusi domestik, freight
                internasional, customs brokerage, warehousing, dan project
                cargo. Satu titik koordinasi untuk seluruh kebutuhan logistik
                perusahaan Anda.
              </p>
              <div className="mt-6">
                <Link
                  href="/about"
                  className="text-sm font-bold uppercase tracking-widest text-carbon-dark/40 hover:text-logistics-orange transition-colors duration-300"
                >
                  Selengkapnya &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Hijacking - Panel Layanan */}
      <ServicesHorizontal />

      {/* Capabilities (formerly StatsCounter with fake numbers) */}
      <StatsCounter />

      {/* Section CTA Penutup */}
      <section className="py-32 md:py-48 bg-carbon-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
            Setiap Bisnis Punya
            <br />
            <span className="text-logistics-orange">Tantangan Berbeda.</span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Kami tidak menawarkan paket template. Ceritakan situasi Anda,
            dan kami akan sampaikan apakah dan bagaimana kami bisa membantu.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm md:text-base uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Diskusikan Kebutuhan Anda
            </Link>
            <Link
              href="/faq"
              className="inline-block px-10 py-4 border border-white/20 text-white/60 font-bold text-sm md:text-base uppercase tracking-widest hover:border-logistics-orange hover:text-logistics-orange transition-colors duration-300"
            >
              Lihat FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
