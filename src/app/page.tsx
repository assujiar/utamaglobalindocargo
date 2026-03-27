export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Placeholder */}
      <section className="min-h-screen flex items-center justify-center bg-carbon-dark">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none">
            Utama Global
            <br />
            <span className="text-logistics-orange">Indo Cargo</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
            Solusi Logistik Korporat B2B Berkinerja Tinggi
          </p>
        </div>
      </section>

      {/* Scroll Test Section */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-carbon-dark tracking-tight">
            Jaringan <span className="text-logistics-orange">Global</span>
          </h2>
          <p className="mt-6 text-lg text-carbon-dark/60 max-w-xl mx-auto">
            Infrastruktur logistik terintegrasi untuk rantai pasok tingkat eksekutif.
          </p>
        </div>
      </section>

      {/* Third Section for scroll testing */}
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
