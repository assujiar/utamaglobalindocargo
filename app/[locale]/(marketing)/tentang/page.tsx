import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  AboutHero,
  CompanyStory,
  MilestoneTimeline,
  ValuePillars,
  NetworkReach,
  AboutCTA,
} from "@/components/sections/AboutPageSections";
import { getLocalizedPath } from "@/lib/utils/routes";

const content = {
  id: {
    seo: {
      title:
        "Tentang UGC Logistics | Freight Forwarder Indonesia Sejak 1995",
      description:
        "PT Utama Globalindo Cargo adalah perusahaan freight forwarding Indonesia yang beroperasi sejak 1995. Melayani distribusi domestik, freight internasional, kepabeanan, dan pergudangan di seluruh nusantara.",
    },
    hero: {
      headline: "Tiga Dekade Menggerakkan Logistik Indonesia",
      subline:
        "Sejak 1995, UGC Logistics telah menjadi mitra strategis bagi perusahaan yang membutuhkan solusi pengiriman yang andal, fleksibel, dan terukur. Kami bukan sekadar jasa kirim. Kami adalah perpanjangan operasional bisnis Anda.",
    },
    breadcrumb: [
      { label: "Beranda", href: "/id" },
      { label: "Tentang Kami" },
    ] as const,
    story: {
      label: "Cerita Kami",
      paragraphs: [
        "PT Utama Globalindo Cargo didirikan pada tahun 1995 di Jakarta dengan satu tujuan yang jelas: menyederhanakan kompleksitas logistik Indonesia. Di negara kepulauan dengan lebih dari 17.000 pulau, mengirim barang dari satu titik ke titik lain bukan perkara sederhana. Kami memahami ini sejak hari pertama.",
        "Dari sebuah kantor kecil di Jakarta Utara, kami membangun jaringan distribusi yang kini mencakup 34 provinsi. Setiap rute, setiap moda transportasi, dan setiap prosedur kepabeanan dipelajari dan disempurnakan selama hampir tiga dekade operasional tanpa henti.",
        "Hari ini, UGC Logistics melayani ratusan perusahaan lintas industri. Mulai dari manufaktur yang membutuhkan bahan baku tepat waktu, hingga e-commerce yang mengandalkan kecepatan last-mile delivery. Yang tetap sama sejak 1995: komitmen kami pada keandalan dan transparansi.",
      ] as const,
      since: "1995",
    },
    milestones: {
      heading: "Perjalanan Kami",
      items: [
        {
          year: "1995",
          event:
            "PT Utama Globalindo Cargo didirikan di Jakarta. Fokus awal pada distribusi domestik antar pulau Jawa dan Sumatera",
        },
        {
          year: "2002",
          event:
            "Ekspansi ke freight internasional. Jalur pertama: Indonesia ke Singapura, Malaysia, dan Tiongkok",
        },
        {
          year: "2008",
          event:
            "Membuka divisi kepabeanan dan import DTD. Lisensi PPJK aktif untuk pengurusan bea cukai secara mandiri",
        },
        {
          year: "2014",
          event:
            "Jaringan distribusi domestik mencakup seluruh 34 provinsi. Gudang operasional di 5 kota besar",
        },
        {
          year: "2019",
          event:
            "Layanan blockspace dan charter diluncurkan untuk mendukung kebutuhan kargo volume besar dan jadwal khusus",
        },
        {
          year: "2024",
          event:
            "Digitalisasi penuh: sistem tracking real-time, portal klien, dan integrasi API untuk enterprise",
        },
      ] as const,
    },
    values: {
      heading: "Nilai yang Menjadi Fondasi Kerja Kami",
      items: [
        {
          title: "Keandalan Tanpa Kompromi",
          description:
            "Jadwal yang dijanjikan adalah jadwal yang dipenuhi. Sistem monitoring internal kami memastikan setiap pengiriman terpantau dari pick-up hingga delivery, tanpa titik buta.",
        },
        {
          title: "Transparansi Operasional",
          description:
            "Setiap klien mendapat akses tracking real-time dan laporan berkala. Tidak ada biaya tersembunyi, tidak ada estimasi yang mengambang. Yang Anda lihat adalah yang Anda bayar.",
        },
        {
          title: "Fleksibilitas Solusi",
          description:
            "Tidak ada dua bisnis yang sama. Tim kami merancang solusi logistik yang disesuaikan dengan volume, rute, timeline, dan anggaran spesifik Anda. Bukan paket standar yang dipaksakan.",
        },
      ] as const,
    },
    network: {
      heading: "Jangkauan Operasional Kami",
      description:
        "Infrastruktur logistik yang dibangun selama hampir 30 tahun, mencakup seluruh wilayah Indonesia dan jaringan internasional yang terus berkembang.",
      stats: [
        { value: "34", label: "Provinsi" },
        { value: "12+", label: "Negara Tujuan" },
        { value: "5", label: "Gudang Operasional" },
        { value: "200+", label: "Profesional" },
      ] as const,
    },
    cta: {
      heading: "Siap Menjadi Mitra Logistik Anda",
      ctaLabel: "Minta Penawaran",
      trustLine:
        "Konsultasi tanpa biaya. Tim kami merespons dalam 2 jam kerja.",
    },
  },
  en: {
    seo: {
      title:
        "About UGC Logistics | Indonesia Freight Forwarder Since 1995",
      description:
        "PT Utama Globalindo Cargo is an Indonesian freight forwarding company operating since 1995. Serving domestic distribution, international freight, customs, and warehousing across the archipelago.",
    },
    hero: {
      headline: "Three Decades Powering Indonesian Logistics",
      subline:
        "Since 1995, UGC Logistics has been a strategic partner for companies that need reliable, flexible, and measurable shipping solutions. We are not just a shipping service. We are an operational extension of your business.",
    },
    breadcrumb: [
      { label: "Home", href: "/en" },
      { label: "About Us" },
    ] as const,
    story: {
      label: "Our Story",
      paragraphs: [
        "PT Utama Globalindo Cargo was founded in 1995 in Jakarta with one clear objective: simplify the complexity of Indonesian logistics. In an archipelago nation spanning more than 17,000 islands, moving cargo from point A to point B is never straightforward. We understood this from day one.",
        "From a small office in North Jakarta, we built a distribution network that now covers all 34 provinces. Every route, every transport mode, and every customs procedure has been studied and refined over nearly three decades of uninterrupted operations.",
        "Today, UGC Logistics serves hundreds of companies across industries. From manufacturers requiring just-in-time raw materials to e-commerce brands depending on fast last-mile delivery. What remains unchanged since 1995: our commitment to reliability and transparency.",
      ] as const,
      since: "1995",
    },
    milestones: {
      heading: "Our Journey",
      items: [
        {
          year: "1995",
          event:
            "PT Utama Globalindo Cargo founded in Jakarta. Initial focus on domestic distribution between Java and Sumatra",
        },
        {
          year: "2002",
          event:
            "Expansion into international freight. First corridors: Indonesia to Singapore, Malaysia, and China",
        },
        {
          year: "2008",
          event:
            "Customs brokerage and import DTD division established. Active PPJK license for independent customs clearance",
        },
        {
          year: "2014",
          event:
            "Domestic distribution network reaches all 34 provinces. Operational warehouses in 5 major cities",
        },
        {
          year: "2019",
          event:
            "Blockspace and charter services launched to support high-volume cargo and custom scheduling needs",
        },
        {
          year: "2024",
          event:
            "Full digitalization: real-time tracking, client portal, and enterprise API integrations",
        },
      ] as const,
    },
    values: {
      heading: "The Values That Drive Our Operations",
      items: [
        {
          title: "Uncompromising Reliability",
          description:
            "The schedule we promise is the schedule we keep. Our internal monitoring system ensures every shipment is tracked from pickup to delivery, with no blind spots.",
        },
        {
          title: "Operational Transparency",
          description:
            "Every client gets real-time tracking access and periodic reports. No hidden fees, no floating estimates. What you see is what you pay.",
        },
        {
          title: "Solution Flexibility",
          description:
            "No two businesses are alike. Our team designs logistics solutions tailored to your specific volume, routes, timelines, and budget. Not a one-size-fits-all package.",
        },
      ] as const,
    },
    network: {
      heading: "Our Operational Reach",
      description:
        "Logistics infrastructure built over nearly 30 years, covering all of Indonesia and a growing international network.",
      stats: [
        { value: "34", label: "Provinces" },
        { value: "12+", label: "Destination Countries" },
        { value: "5", label: "Warehouses" },
        { value: "200+", label: "Professionals" },
      ] as const,
    },
    cta: {
      heading: "Ready to Be Your Logistics Partner",
      ctaLabel: "Request a Quote",
      trustLine:
        "Complimentary consultation. Our team responds within 2 business hours.",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const typedLocale = locale as Locale;
  const c = content[typedLocale];

  return generatePageMetadata({
    pageKey: "about",
    locale: typedLocale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

export default async function TentangPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const c = content[typedLocale];

  return (
    <>
      <AboutHero
        headline={c.hero.headline}
        subline={c.hero.subline}
        breadcrumbItems={c.breadcrumb}
      />

      <CompanyStory
        label={c.story.label}
        paragraphs={c.story.paragraphs}
        since={c.story.since}
      />

      <MilestoneTimeline
        heading={c.milestones.heading}
        milestones={c.milestones.items}
      />

      <ValuePillars
        heading={c.values.heading}
        values={c.values.items}
      />

      <NetworkReach
        heading={c.network.heading}
        description={c.network.description}
        stats={c.network.stats}
      />

      <AboutCTA
        heading={c.cta.heading}
        ctaLabel={c.cta.ctaLabel}
        ctaHref={getLocalizedPath("quote", typedLocale)}
        trustLine={c.cta.trustLine}
      />
    </>
  );
}
