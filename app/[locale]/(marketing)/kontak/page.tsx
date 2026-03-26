import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  OfficeLocation,
} from "@/components/sections/ContactPageSections";

const content = {
  seo: {
    title: "Hubungi UGC Logistics | Tim Kami Siap Membantu Anda",
    description:
      "Hubungi UGC Logistics untuk pertanyaan freight forwarding, permintaan harga, dan peluang kemitraan. Tim Jakarta kami merespons dalam 2 jam kerja.",
  },
  hero: {
    headline: "Hubungi Tim Kami",
    subline:
      "Butuh penawaran harga, dukungan operasional, atau ingin menjajaki kemitraan logistik? Tim kami siap mendengarkan. Pilih saluran komunikasi yang paling nyaman untuk Anda.",
  },
  breadcrumb: [
    { label: "Beranda", href: "/id" },
    { label: "Kontak" },
  ] as const,
  infoCards: [
    {
      icon: "\uD83D\uDCDE",
      title: "Telepon / WhatsApp",
      value: "+62 812-8459-6614",
      action: { label: "Chat via WhatsApp", href: "https://wa.me/6281284596614" },
    },
    {
      icon: "\uD83D\uDCE7",
      title: "Email",
      value: "services@ugc.co.id",
      action: { label: "Kirim Email", href: "mailto:services@ugc.co.id" },
    },
    {
      icon: "\uD83D\uDCCD",
      title: "Kantor Pusat",
      value: "Jakarta, Indonesia",
    },
  ] as const,
  form: {
    heading: "Kirim Pesan kepada Kami",
    submitLabel: "Kirim Pesan",
    namePlaceholder: "Nama lengkap",
    emailPlaceholder: "Alamat email",
    phonePlaceholder: "Nomor telepon (opsional)",
    companyPlaceholder: "Nama perusahaan (opsional)",
    messagePlaceholder: "Ceritakan kebutuhan logistik Anda...",
    successMessage: "Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 2 jam kerja.",
  },
  office: {
    heading: "Kunjungi Kantor Kami",
    address: "PT Utama Globalindo Cargo\nJl. Raya Bekasi KM 28\nKota Jakarta Timur, DKI Jakarta\nIndonesia",
    hoursLabel: "Jam Operasional",
    hours: "Senin sampai Jumat, 08:00 - 17:00 WIB",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return generatePageMetadata({ pageKey: "contact", locale: locale as Locale, title: content.seo.title, description: content.seo.description });
}

export default async function KontakPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <>
      <ContactHero headline={content.hero.headline} subline={content.hero.subline} breadcrumbItems={content.breadcrumb} />
      <ContactInfoCards cards={content.infoCards} />
      <ContactForm locale={typedLocale} heading={content.form.heading} submitLabel={content.form.submitLabel} namePlaceholder={content.form.namePlaceholder} emailPlaceholder={content.form.emailPlaceholder} phonePlaceholder={content.form.phonePlaceholder} companyPlaceholder={content.form.companyPlaceholder} messagePlaceholder={content.form.messagePlaceholder} successMessage={content.form.successMessage} />
      <OfficeLocation heading={content.office.heading} address={content.office.address} hours={content.office.hours} hoursLabel={content.office.hoursLabel} />
    </>
  );
}
