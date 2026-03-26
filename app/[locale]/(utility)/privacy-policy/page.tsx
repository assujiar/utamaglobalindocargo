import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { LegalPageSection } from "@/components/sections/LegalPageSection";

const content = {
  en: {
    seo: {
      title: "Privacy Policy | UGC Logistics",
      description:
        "Learn how PT Utama Globalindo Cargo collects, uses, and protects your personal information. Our commitment to data privacy and security.",
    },
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: `<p>PT Utama Globalindo Cargo ("UGC Logistics", "we", "us") collects information necessary to provide freight forwarding and logistics services. This includes:</p>
<ul>
<li><strong>Contact information:</strong> name, email address, phone number, and company name provided through our quote request and contact forms.</li>
<li><strong>Shipment data:</strong> tracking numbers, origin and destination addresses, cargo descriptions, and delivery preferences submitted for tracking or service requests.</li>
<li><strong>Usage data:</strong> anonymized analytics including pages visited, session duration, and referral sources collected via Google Analytics 4 to improve our website experience.</li>
<li><strong>Device information:</strong> browser type, operating system, and screen resolution collected automatically for website optimization.</li>
</ul>`,
      },
      {
        heading: "How We Use Your Information",
        body: `<p>We use collected information solely to operate and improve our logistics services:</p>
<ul>
<li><strong>Service fulfillment:</strong> processing quote requests, coordinating shipments, and providing tracking updates.</li>
<li><strong>Communication:</strong> responding to inquiries, sending shipment notifications, and providing customer support via email or WhatsApp.</li>
<li><strong>Website improvement:</strong> analyzing usage patterns to enhance navigation, content relevance, and overall user experience.</li>
<li><strong>Legal compliance:</strong> meeting regulatory obligations under Indonesian law, including customs documentation and trade compliance requirements.</li>
</ul>
<p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>`,
      },
      {
        heading: "Data Security and Storage",
        body: `<p>We implement industry-standard security measures to protect your information:</p>
<ul>
<li>All data transmissions are encrypted using TLS/SSL protocols.</li>
<li>Form submissions and customer data are stored securely in cloud infrastructure with row-level security policies.</li>
<li>Access to personal information is restricted to authorized personnel who require it for service delivery.</li>
<li>We retain shipment and contact data for a period consistent with Indonesian commercial record-keeping requirements, typically five years from the date of last interaction.</li>
</ul>
<p>While we take reasonable precautions to protect your data, no method of electronic transmission or storage is completely secure.</p>`,
      },
      {
        heading: "Your Rights and Contact",
        body: `<p>You have the right to:</p>
<ul>
<li>Request access to the personal data we hold about you.</li>
<li>Request correction of inaccurate information.</li>
<li>Request deletion of your data, subject to legal retention requirements.</li>
<li>Withdraw consent for marketing communications at any time.</li>
</ul>
<p>To exercise these rights or ask questions about our privacy practices, contact us at <a href="mailto:services@ugc.co.id">services@ugc.co.id</a> or call <a href="https://wa.me/6281284596614">+62 812-8459-6614</a>.</p>
<p>This policy may be updated periodically. We encourage you to review this page for the latest information on our privacy practices.</p>`,
      },
    ],
  },
  id: {
    seo: {
      title: "Kebijakan Privasi | UGC Logistics",
      description:
        "Pelajari bagaimana PT Utama Globalindo Cargo mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Komitmen kami terhadap privasi dan keamanan data.",
    },
    title: "Kebijakan Privasi",
    lastUpdated: "Terakhir diperbarui: Maret 2026",
    sections: [
      {
        heading: "Informasi yang Kami Kumpulkan",
        body: `<p>PT Utama Globalindo Cargo ("UGC Logistics", "kami") mengumpulkan informasi yang diperlukan untuk menyediakan layanan freight forwarding dan logistik. Informasi tersebut meliputi:</p>
<ul>
<li><strong>Informasi kontak:</strong> nama, alamat email, nomor telepon, dan nama perusahaan yang diberikan melalui formulir permintaan penawaran dan kontak kami.</li>
<li><strong>Data pengiriman:</strong> nomor resi, alamat asal dan tujuan, deskripsi kargo, dan preferensi pengiriman yang diajukan untuk pelacakan atau permintaan layanan.</li>
<li><strong>Data penggunaan:</strong> analitik anonim termasuk halaman yang dikunjungi, durasi sesi, dan sumber rujukan yang dikumpulkan melalui Google Analytics 4 untuk meningkatkan pengalaman situs web.</li>
<li><strong>Informasi perangkat:</strong> jenis browser, sistem operasi, dan resolusi layar yang dikumpulkan secara otomatis untuk optimasi situs web.</li>
</ul>`,
      },
      {
        heading: "Cara Kami Menggunakan Informasi Anda",
        body: `<p>Kami menggunakan informasi yang dikumpulkan semata-mata untuk mengoperasikan dan meningkatkan layanan logistik kami:</p>
<ul>
<li><strong>Pemenuhan layanan:</strong> memproses permintaan penawaran, mengkoordinasikan pengiriman, dan memberikan pembaruan pelacakan.</li>
<li><strong>Komunikasi:</strong> menanggapi pertanyaan, mengirim notifikasi pengiriman, dan memberikan dukungan pelanggan melalui email atau WhatsApp.</li>
<li><strong>Peningkatan situs web:</strong> menganalisis pola penggunaan untuk meningkatkan navigasi, relevansi konten, dan pengalaman pengguna secara keseluruhan.</li>
<li><strong>Kepatuhan hukum:</strong> memenuhi kewajiban regulasi berdasarkan hukum Indonesia, termasuk dokumentasi kepabeanan dan persyaratan kepatuhan perdagangan.</li>
</ul>
<p>Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.</p>`,
      },
      {
        heading: "Keamanan dan Penyimpanan Data",
        body: `<p>Kami menerapkan langkah-langkah keamanan standar industri untuk melindungi informasi Anda:</p>
<ul>
<li>Semua transmisi data dienkripsi menggunakan protokol TLS/SSL.</li>
<li>Pengajuan formulir dan data pelanggan disimpan secara aman di infrastruktur cloud dengan kebijakan keamanan tingkat baris.</li>
<li>Akses ke informasi pribadi dibatasi hanya untuk personel yang berwenang yang memerlukannya untuk penyampaian layanan.</li>
<li>Kami menyimpan data pengiriman dan kontak selama periode yang sesuai dengan persyaratan pencatatan komersial Indonesia, biasanya lima tahun sejak tanggal interaksi terakhir.</li>
</ul>
<p>Meskipun kami mengambil langkah pencegahan yang wajar untuk melindungi data Anda, tidak ada metode transmisi atau penyimpanan elektronik yang sepenuhnya aman.</p>`,
      },
      {
        heading: "Hak Anda dan Kontak",
        body: `<p>Anda berhak untuk:</p>
<ul>
<li>Meminta akses ke data pribadi yang kami simpan tentang Anda.</li>
<li>Meminta koreksi informasi yang tidak akurat.</li>
<li>Meminta penghapusan data Anda, dengan tunduk pada persyaratan retensi hukum.</li>
<li>Mencabut persetujuan untuk komunikasi pemasaran kapan saja.</li>
</ul>
<p>Untuk menggunakan hak-hak ini atau mengajukan pertanyaan tentang praktik privasi kami, hubungi kami di <a href="mailto:services@ugc.co.id">services@ugc.co.id</a> atau telepon <a href="https://wa.me/6281284596614">+62 812-8459-6614</a>.</p>
<p>Kebijakan ini dapat diperbarui secara berkala. Kami menganjurkan Anda untuk meninjau halaman ini untuk informasi terbaru tentang praktik privasi kami.</p>`,
      },
    ],
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
    pageKey: "privacy",
    locale: locale as Locale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

export default async function PrivacyPolicyPage({
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
        variant="privacy"
      />
    </main>
  );
}
