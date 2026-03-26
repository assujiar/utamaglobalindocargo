import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { LegalPageSection } from "@/components/sections/LegalPageSection";

const enSections = [
  {
    heading: "Service Agreement and Scope",
    body: '<p>By accessing and using the UGC Logistics website or engaging our freight forwarding services, you agree to these terms. PT Utama Globalindo Cargo provides domestic distribution, international freight forwarding, import door-to-door customs clearance, blockspace and charter solutions, warehousing and 3PL services, and project cargo handling.</p><ul><li>All service engagements are subject to a separate written quotation or service agreement specifying scope, rates, and timelines.</li><li>Quotations provided through our website or sales team are valid for 14 calendar days unless otherwise stated.</li><li>UGC Logistics reserves the right to decline shipments that contain prohibited goods, hazardous materials not properly declared, or items restricted under Indonesian export and import regulations.</li></ul><p>These terms apply to all interactions with our company, including website use, form submissions, and service inquiries.</p>',
  },
  {
    heading: "Liability and Insurance",
    body: '<p>UGC Logistics operates under standard freight forwarding liability terms consistent with Indonesian commercial law and international trade conventions:</p><ul><li><strong>Carrier liability:</strong> our liability for loss or damage during transit is limited to the terms specified in the applicable bill of lading, airway bill, or transport document.</li><li><strong>Declared value:</strong> clients are responsible for accurately declaring the value of goods. Undeclared or undervalued shipments may result in reduced compensation in the event of a claim.</li><li><strong>Insurance:</strong> cargo insurance is available as an optional add-on service. We strongly recommend all clients obtain appropriate coverage for high-value or fragile shipments.</li><li><strong>Force majeure:</strong> UGC Logistics is not liable for delays, losses, or damages caused by events beyond reasonable control, including natural disasters, government actions, port congestion, or civil unrest.</li></ul><p>Claims for loss or damage must be submitted in writing within 14 days of delivery or expected delivery date.</p>',
  },
  {
    heading: "Website Use and Intellectual Property",
    body: '<p>The UGC Logistics website and its content are protected by intellectual property laws:</p><ul><li>All text, images, logos, design elements, and software on this website are the property of PT Utama Globalindo Cargo or its licensors.</li><li>You may not reproduce, distribute, or create derivative works from our website content without prior written permission.</li><li>The shipment tracking feature is provided for informational purposes. While we strive for accuracy, tracking data may experience minor delays and should not be the sole basis for time-critical decisions.</li><li>Form submissions become the property of UGC Logistics for the purpose of service delivery and are handled in accordance with our <a href="/en/privacy-policy">Privacy Policy</a>.</li></ul>',
  },
  {
    heading: "Governing Law and Dispute Resolution",
    body: '<p>These terms are governed by the laws of the Republic of Indonesia:</p><ul><li>Any disputes arising from the use of our services or this website shall first be resolved through good-faith negotiation between the parties.</li><li>If negotiation fails, disputes shall be submitted to the South Jakarta District Court (Pengadilan Negeri Jakarta Selatan) as the agreed jurisdiction.</li><li>For international shipments, the applicable international conventions (such as the Warsaw Convention for air freight or the Hague-Visby Rules for sea freight) may apply in addition to these terms.</li></ul><p>UGC Logistics reserves the right to update these terms at any time. Continued use of our services or website after changes constitutes acceptance of the revised terms. For questions, contact <a href="mailto:services@ugc.co.id">services@ugc.co.id</a>.</p>',
  },
] as const;

const idSections = [
  {
    heading: "Perjanjian Layanan dan Ruang Lingkup",
    body: '<p>Dengan mengakses dan menggunakan situs web UGC Logistics atau menggunakan layanan freight forwarding kami, Anda menyetujui syarat dan ketentuan ini. PT Utama Globalindo Cargo menyediakan layanan distribusi domestik, freight forwarding internasional, import door-to-door dan kepabeanan, solusi blockspace dan charter, pergudangan dan 3PL, serta penanganan kargo proyek.</p><ul><li>Semua keterlibatan layanan tunduk pada penawaran tertulis atau perjanjian layanan terpisah yang menentukan ruang lingkup, tarif, dan jadwal.</li><li>Penawaran yang diberikan melalui situs web atau tim penjualan kami berlaku selama 14 hari kalender kecuali dinyatakan lain.</li><li>UGC Logistics berhak menolak pengiriman yang mengandung barang terlarang, bahan berbahaya yang tidak dideklarasikan dengan benar, atau barang yang dibatasi berdasarkan peraturan ekspor dan impor Indonesia.</li></ul><p>Syarat dan ketentuan ini berlaku untuk semua interaksi dengan perusahaan kami, termasuk penggunaan situs web, pengajuan formulir, dan pertanyaan layanan.</p>',
  },
  {
    heading: "Tanggung Jawab dan Asuransi",
    body: '<p>UGC Logistics beroperasi berdasarkan ketentuan tanggung jawab freight forwarding standar yang sesuai dengan hukum komersial Indonesia dan konvensi perdagangan internasional:</p><ul><li><strong>Tanggung jawab pengangkut:</strong> tanggung jawab kami atas kehilangan atau kerusakan selama transit terbatas pada ketentuan yang tercantum dalam bill of lading, airway bill, atau dokumen transportasi yang berlaku.</li><li><strong>Nilai yang dideklarasikan:</strong> klien bertanggung jawab untuk mendeklarasikan nilai barang secara akurat. Pengiriman yang tidak dideklarasikan atau nilainya dikurangi dapat mengakibatkan kompensasi yang berkurang dalam hal klaim.</li><li><strong>Asuransi:</strong> asuransi kargo tersedia sebagai layanan tambahan opsional. Kami sangat menyarankan semua klien untuk mendapatkan perlindungan yang sesuai untuk pengiriman bernilai tinggi atau rapuh.</li><li><strong>Keadaan kahar:</strong> UGC Logistics tidak bertanggung jawab atas keterlambatan, kehilangan, atau kerusakan yang disebabkan oleh peristiwa di luar kendali wajar, termasuk bencana alam, tindakan pemerintah, kemacetan pelabuhan, atau kerusuhan sipil.</li></ul><p>Klaim atas kehilangan atau kerusakan harus diajukan secara tertulis dalam waktu 14 hari sejak tanggal pengiriman atau tanggal pengiriman yang diharapkan.</p>',
  },
  {
    heading: "Penggunaan Situs Web dan Kekayaan Intelektual",
    body: '<p>Situs web UGC Logistics dan kontennya dilindungi oleh undang-undang kekayaan intelektual:</p><ul><li>Semua teks, gambar, logo, elemen desain, dan perangkat lunak di situs web ini adalah milik PT Utama Globalindo Cargo atau pemberi lisensinya.</li><li>Anda tidak boleh mereproduksi, mendistribusikan, atau membuat karya turunan dari konten situs web kami tanpa izin tertulis sebelumnya.</li><li>Fitur pelacakan pengiriman disediakan untuk tujuan informasi. Meskipun kami berusaha untuk akurasi, data pelacakan mungkin mengalami keterlambatan kecil dan tidak boleh menjadi satu-satunya dasar untuk keputusan yang sensitif terhadap waktu.</li><li>Pengajuan formulir menjadi milik UGC Logistics untuk tujuan penyampaian layanan dan ditangani sesuai dengan <a href="/id/kebijakan-privasi">Kebijakan Privasi</a> kami.</li></ul>',
  },
  {
    heading: "Hukum yang Berlaku dan Penyelesaian Sengketa",
    body: '<p>Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia:</p><ul><li>Setiap sengketa yang timbul dari penggunaan layanan kami atau situs web ini terlebih dahulu akan diselesaikan melalui negosiasi dengan itikad baik antara para pihak.</li><li>Jika negosiasi gagal, sengketa akan diajukan ke Pengadilan Negeri Jakarta Selatan sebagai yurisdiksi yang disepakati.</li><li>Untuk pengiriman internasional, konvensi internasional yang berlaku (seperti Konvensi Warsawa untuk pengangkutan udara atau Aturan Hague-Visby untuk pengangkutan laut) dapat berlaku sebagai tambahan dari syarat dan ketentuan ini.</li></ul><p>UGC Logistics berhak memperbarui syarat dan ketentuan ini kapan saja. Penggunaan berkelanjutan atas layanan atau situs web kami setelah perubahan merupakan penerimaan atas syarat yang direvisi. Untuk pertanyaan, hubungi <a href="mailto:services@ugc.co.id">services@ugc.co.id</a>.</p>',
  },
] as const;

const content = {
  en: {
    seo: {
      title: "Terms of Service | UGC Logistics",
      description:
        "Read the terms and conditions governing the use of UGC Logistics services and website. Understand your rights and responsibilities as a client.",
    },
    title: "Terms of Service",
    lastUpdated: "Last updated: March 2026",
    sections: enSections,
  },
  id: {
    seo: {
      title: "Syarat dan Ketentuan | UGC Logistics",
      description:
        "Baca syarat dan ketentuan yang mengatur penggunaan layanan dan situs web UGC Logistics. Pahami hak dan tanggung jawab Anda sebagai klien.",
    },
    title: "Syarat dan Ketentuan",
    lastUpdated: "Terakhir diperbarui: Maret 2026",
    sections: idSections,
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = content[locale as Locale];

  return generatePageMetadata({
    pageKey: "terms",
    locale: locale as Locale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const c = content[typedLocale];

  return (
    <main>
      <LegalPageSection
        title={c.title}
        lastUpdated={c.lastUpdated}
        content={c.sections}
        variant="terms"
      />
    </main>
  );
}
