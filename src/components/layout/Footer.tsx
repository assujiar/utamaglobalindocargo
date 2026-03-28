import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Layanan",
    links: [
      { label: "Pergudangan Dinamis", href: "/#layanan" },
      { label: "Manajemen Angkutan", href: "/#layanan" },
      { label: "Akselerasi Kepabeanan", href: "/#layanan" },
      { label: "Orkestrasi Rantai Pasok", href: "/#layanan" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Studi Kasus", href: "/case-studies" },
      { label: "Kontak", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-carbon-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-logistics-orange flex items-center justify-center">
                <span className="text-white font-black text-sm leading-none">
                  U
                </span>
              </div>
              <span className="font-black text-base uppercase tracking-wider text-white">
                Utama<span className="text-logistics-orange">.</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Platform logistik korporat B2B berkinerja tinggi untuk solusi
              pengiriman dan manajemen rantai pasok tingkat eksekutif di Asia
              Pasifik.
            </p>
            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-[1px] bg-logistics-orange/40" />
              <div className="w-2 h-2 bg-logistics-orange rotate-45" />
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-logistics-orange transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>Jakarta, Indonesia</li>
              <li>
                <a
                  href="mailto:info@utamaglobalindocargo.com"
                  className="hover:text-logistics-orange transition-colors duration-300"
                >
                  info@utamaglobalindocargo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Utama Global Indo Cargo. Seluruh
            hak dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-white/10 uppercase tracking-widest">
              Direkayasa untuk presisi logistik
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
