import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  QuoteHero,
  QuoteForm,
  QuoteTrustBar,
} from "@/components/sections/QuotePageSections";
import { services } from "@/lib/content/services";

const content = {
  seo: {
    title:
      "Minta Penawaran | Konsultasi Gratis Kebutuhan Logistik Anda | UGC Logistics",
    description:
      "Dapatkan penawaran logistik yang disesuaikan dari UGC Logistics. Distribusi domestik, freight internasional, kepabeanan, pergudangan, dan lainnya. Respons dalam 2 jam kerja.",
  },
  hero: {
    headline: "Dapatkan Penawaran Logistik Anda",
    subline:
      "Ceritakan kebutuhan pengiriman Anda dan tim kami akan merespons dengan proposal yang disesuaikan dalam 2 jam kerja. Tanpa komitmen.",
    stepIndicator: "Konsultasi Gratis",
  },
  fields: {
    name: "Nama Lengkap",
    email: "Alamat Email",
    phone: "Nomor Telepon",
    company: "Nama Perusahaan (opsional)",
    service: "Pilih Layanan",
    origin: "Kota / Pelabuhan Asal",
    destination: "Kota / Pelabuhan Tujuan",
    cargoType: "Jenis Kargo (contoh: Elektronik, Tekstil)",
    weight: "Estimasi Berat (kg)",
    details:
      "Detail tambahan: penanganan khusus, timeline, volume, atau kebutuhan lainnya...",
    submit: "Kirim Permintaan Penawaran",
  },
  successHeading: "Permintaan Diterima",
  successMessage:
    "Terima kasih telah menghubungi kami. Tim logistik kami akan meninjau kebutuhan Anda dan menghubungi Anda dalam 2 jam kerja dengan proposal yang disesuaikan.",
  trustItems: [
    { icon: "\u{1F512}", text: "Data Anda aman" },
    { icon: "\u26A1", text: "Respons dalam 2 jam" },
    { icon: "\u{1F4CB}", text: "Tanpa biaya konsultasi" },
  ] as const,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generatePageMetadata({
    pageKey: "quote",
    locale,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export default async function MintaPenawaranPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  if (locale !== "id") notFound();

  const { service: preselectedService } = await searchParams;

  const serviceOptions = services.map((s) => ({
    key: s.key,
    name: s.name_id,
  }));

  return (
    <>
      <QuoteHero
        headline={content.hero.headline}
        subline={content.hero.subline}
        stepIndicator={content.hero.stepIndicator}
      />
      <QuoteForm
        locale={locale}
        services={serviceOptions}
        preselectedService={preselectedService}
        fields={content.fields}
        successHeading={content.successHeading}
        successMessage={content.successMessage}
      />
      <QuoteTrustBar items={content.trustItems} />
    </>
  );
}
