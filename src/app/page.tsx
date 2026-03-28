import HeroSection from "@/components/layout/HeroSection";
import ServicesHorizontal from "@/components/sections/ServicesHorizontal";
import ClientLogos from "@/components/sections/ClientLogos";
import StatsCounter from "@/components/sections/StatsCounter";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — WebGL Globe + Tipografi GSAP */}
      <HeroSection />

      {/* Logo Klien Trust Bar */}
      <ClientLogos />

      {/* Horizontal Scroll Hijacking — Panel Layanan PAS Framework */}
      <ServicesHorizontal />

      {/* Statistik Animatif */}
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
            dan kami akan jujur sampaikan apakah — dan bagaimana — kami bisa membantu.
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm md:text-base uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Diskusikan Kebutuhan Anda
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
