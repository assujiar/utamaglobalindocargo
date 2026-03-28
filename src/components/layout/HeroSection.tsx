export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0d]">
      {/* Static background — dark gradient with subtle orange accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
          }}
        />

        {/* Faint orange glow at lower center */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(255,70,0,0.06) 0%, transparent 55%)",
          }}
        />

        {/* Top/bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,13,0.3) 0%, transparent 25%, transparent 70%, rgba(10,10,13,0.4) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 pb-24 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          {/* Pretitle */}
          <div className="mb-5 md:mb-7 flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 md:w-10 bg-logistics-orange/40" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/35">
              Freight &bull; Customs &bull; Warehouse &bull; Project Cargo
            </span>
            <span className="h-[1px] w-6 md:w-10 bg-logistics-orange/40" />
          </div>

          {/* Headline */}
          <h1 className="leading-[0.88] tracking-tighter">
            <span className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white">
              Logistik
            </span>
            <span className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-white">
              Tanpa
            </span>
            <span className="block text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black uppercase text-logistics-orange">
              Drama.
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="mx-auto mt-6 md:mt-8 max-w-xl text-[15px] md:text-lg text-white/60 leading-relaxed">
            Pickup, freight, customs, warehousing — satu titik koordinasi
            dari asal sampai tujuan. Anda terima barang, bukan masalah.
          </p>

          {/* CTAs */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-logistics-orange px-8 md:px-10 py-4 text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
            >
              Kirim Permintaan
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center border border-white/15 px-7 py-4 text-white/55 text-sm font-bold uppercase tracking-widest hover:border-logistics-orange/40 hover:text-white/80 transition-all duration-300"
            >
              Lihat Layanan
            </a>
          </div>

          {/* Service scope */}
          <div className="mx-auto mt-12 md:mt-14 flex items-center justify-center gap-3">
            <span className="h-[1px] w-6 md:w-10 bg-white/10" />
            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">
              Domestik &bull; Internasional &bull; Customs &bull; Gudang &bull; Kargo Khusus
            </span>
            <span className="h-[1px] w-6 md:w-10 bg-white/10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
