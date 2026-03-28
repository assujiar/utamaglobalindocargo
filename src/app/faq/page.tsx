import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang layanan freight forwarding, customs brokerage, warehousing, dan project cargo dari Utama Globalindo Cargo.",
  alternates: {
    canonical: "https://utamaglobalindocargo.com/faq",
  },
};

const FAQ_ITEMS = [
  {
    question: "Layanan apa saja yang disediakan Utama Globalindo Cargo?",
    answer:
      "Kami menyediakan distribusi domestik (FTL, LTL, FCL, LCL, airfreight), international freight forwarding, import door-to-door, customs brokerage, warehousing & fulfillment, project cargo, dan blocspace/airfreight charter.",
  },
  {
    question: "Apakah Utama Globalindo Cargo melayani pengiriman ke seluruh Indonesia?",
    answer:
      "Ya. Kami melayani pengiriman domestik ke seluruh wilayah Indonesia melalui jaringan mitra transportasi darat, laut, dan udara.",
  },
  {
    question: "Berapa lama waktu respons setelah mengirim formulir?",
    answer:
      "Tim kami merespons dalam 1 hari kerja. Untuk kebutuhan mendesak, hubungi kami langsung melalui email di info@utamaglobalindocargo.com.",
  },
  {
    question: "Apakah bisa menangani muatan khusus atau oversized?",
    answer:
      "Ya. Melalui layanan Project Cargo, kami menangani muatan yang memerlukan penanganan khusus — termasuk alat berat, komponen oversized, dan material sensitif. Setiap proyek dirancang dengan solusi spesifik.",
  },
  {
    question: "Bagaimana proses customs clearance bekerja?",
    answer:
      "Kami menangani seluruh proses customs clearance termasuk klasifikasi HS Code, persiapan dokumen, pengurusan LARTAS, dan koordinasi dengan bea cukai. Dokumentasi disiapkan sebelum barang tiba untuk meminimalkan waktu tunggu.",
  },
  {
    question: "Apakah ada minimum volume pengiriman?",
    answer:
      "Tidak ada minimum yang kaku. Kami melayani dari pengiriman berkala skala kecil hingga operasi distribusi nasional berskala besar. Hubungi kami untuk mendiskusikan kebutuhan spesifik Anda.",
  },
  {
    question: "Apakah bisa membantu impor dari luar negeri langsung ke gudang?",
    answer:
      "Ya. Layanan Import Door-to-Door kami menangani seluruh proses dari negara asal — mulai dari pickup, shipping, customs clearance, hingga pengiriman ke lokasi Anda di Indonesia.",
  },
  {
    question: "Bagaimana cara mendapatkan penawaran harga?",
    answer:
      "Isi formulir di halaman kontak dengan detail kebutuhan Anda, atau kirim email ke info@utamaglobalindocargo.com. Kami akan merespons dengan evaluasi awal dan langkah selanjutnya.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-carbon-dark min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[1px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              FAQ
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95]">
            Pertanyaan
            <br />
            <span className="text-logistics-orange">yang Sering Muncul.</span>
          </h1>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="py-8 border-b border-white/5"
              >
                <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                  {item.question}
                </h2>
                <p className="mt-4 text-base text-white/40 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 border border-white/5">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Pertanyaan lain?
            </h2>
            <p className="mt-4 text-base text-white/40 leading-relaxed">
              Hubungi kami langsung dan kami akan bantu menjawab pertanyaan
              spesifik Anda.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-logistics-orange text-white font-bold text-sm uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300 text-center"
              >
                Hubungi Kami
              </Link>
              <a
                href="mailto:info@utamaglobalindocargo.com"
                className="inline-block px-8 py-3 border border-white/20 text-white/60 font-bold text-sm uppercase tracking-widest hover:border-logistics-orange hover:text-logistics-orange transition-colors duration-300 text-center"
              >
                Email Langsung
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
