import Link from "next/link";

export interface SubService {
  name: string;
  shortName: string;
  description: string;
  bestFor: string[];
  keyPoints: string[];
}

interface ServicePageLayoutProps {
  label: string;
  title: string;
  titleAccent: string;
  intro: string;
  subServices: SubService[];
  ctaText?: string;
}

export default function ServicePageLayout({
  label,
  title,
  titleAccent,
  intro,
  subServices,
  ctaText = "Diskusikan Kebutuhan Anda",
}: ServicePageLayoutProps) {
  return (
    <main className="bg-carbon-dark min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {label}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
            {title}
            <br />
            <span className="text-logistics-orange">{titleAccent}</span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/40 max-w-3xl leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      {/* Sub-services */}
      <section className="px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto space-y-0">
          {subServices.map((sub, index) => {
            const isDark = index % 2 === 0;
            return (
              <div
                key={sub.name}
                className={`p-8 md:p-12 lg:p-16 ${
                  isDark ? "bg-carbon-dark" : "bg-white"
                } ${index > 0 ? (isDark ? "" : "border-t border-carbon-dark/5") : ""}`}
              >
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <span
                    className={`text-5xl md:text-7xl font-black leading-none tracking-tighter ${
                      isDark ? "text-white/[0.06]" : "text-carbon-dark/[0.06]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2
                      className={`text-2xl md:text-4xl font-black tracking-tight ${
                        isDark ? "text-white" : "text-carbon-dark"
                      }`}
                    >
                      {sub.name}
                      {sub.shortName !== sub.name && (
                        <span className="text-logistics-orange"> ({sub.shortName})</span>
                      )}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-base md:text-lg leading-relaxed max-w-3xl mb-10 ${
                    isDark ? "text-white/50" : "text-carbon-dark/50"
                  }`}
                >
                  {sub.description}
                </p>

                {/* Two columns: key points + best for */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-[1px] bg-logistics-orange" />
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          isDark ? "text-white/30" : "text-carbon-dark/30"
                        }`}
                      >
                        Yang Termasuk
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {sub.keyPoints.map((point) => (
                        <li
                          key={point}
                          className={`flex items-start gap-3 text-sm md:text-base leading-relaxed ${
                            isDark ? "text-white/60" : "text-carbon-dark/60"
                          }`}
                        >
                          <div className="w-1.5 h-1.5 bg-logistics-orange rotate-45 mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-[1px] bg-logistics-orange" />
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.2em] ${
                          isDark ? "text-white/30" : "text-carbon-dark/30"
                        }`}
                      >
                        Cocok Untuk
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {sub.bestFor.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 text-sm md:text-base leading-relaxed ${
                            isDark ? "text-white/60" : "text-carbon-dark/60"
                          }`}
                        >
                          <div className="w-1.5 h-1.5 bg-logistics-orange/40 rotate-45 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-20 h-[1px] bg-logistics-orange/20" />
                  <div className="w-2 h-2 bg-logistics-orange rotate-45" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto text-center py-16">
          <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-8">
            Butuh bantuan menentukan layanan yang paling sesuai? Kami bisa bantu evaluasi berdasarkan kebutuhan spesifik Anda.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-logistics-orange text-white font-bold text-sm md:text-base uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
          >
            {ctaText}
          </Link>
        </div>
      </section>
    </main>
  );
}
