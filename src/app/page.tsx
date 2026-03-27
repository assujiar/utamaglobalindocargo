import HeroSection from "@/components/layout/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — WebGL Globe + Tipografi GSAP */}
      <HeroSection />

      {/* Section Layanan Placeholder */}
      <section
        id="layanan"
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-carbon-dark tracking-tight">
            Jaringan <span className="text-logistics-orange">Global</span>
          </h2>
          <p className="mt-6 text-lg text-carbon-dark/60 max-w-xl mx-auto">
            Infrastruktur logistik terintegrasi untuk rantai pasok tingkat
            eksekutif.
          </p>
        </div>
      </section>

      {/* Section Operasi Placeholder */}
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
