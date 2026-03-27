import HeroSection from "@/components/layout/HeroSection";
import ServicesHorizontal from "@/components/sections/ServicesHorizontal";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — WebGL Globe + Tipografi GSAP */}
      <HeroSection />

      {/* Horizontal Scroll Hijacking — Panel Layanan PAS Framework */}
      <ServicesHorizontal />

      {/* Section Penutup */}
      <section className="min-h-screen flex items-center justify-center bg-carbon-dark">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Operasi <span className="text-logistics-orange">Presisi</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Manajemen pengiriman end-to-end dengan telemetri real-time.
          </p>
        </div>
      </section>
    </div>
  );
}
