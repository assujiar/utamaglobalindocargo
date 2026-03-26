import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  TrackHero,
  TrackingSearch,
  TrackingResult,
} from "@/components/sections/TrackPageSections";

const content = {
  id: {
    seo: {
      title: "Lacak Kiriman Anda | UGC Logistics",
      description:
        "Masukkan nomor resi untuk memeriksa status pengiriman secara real-time bersama UGC Logistics. Lacak kargo domestik dan internasional.",
    },
    hero: {
      headline: "Lacak Kiriman Anda",
      subline:
        "Masukkan nomor resi di bawah ini untuk mendapatkan informasi terbaru mengenai status kargo Anda.",
    },
    search: {
      placeholder: "Masukkan nomor resi...",
      buttonLabel: "Cari",
      helpText:
        "Nomor resi dapat ditemukan pada tanda terima atau email konfirmasi yang kami kirimkan.",
    },
    noResult: {
      message: "Kiriman tidak ditemukan",
      subline:
        "Periksa kembali nomor resi Anda atau hubungi tim kami untuk bantuan.",
    },
  },
  en: {
    seo: {
      title: "Track Your Shipment | UGC Logistics",
      description:
        "Enter your tracking number to check real-time shipment status with UGC Logistics. Domestic and international freight tracking.",
    },
    hero: {
      headline: "Track Your Shipment",
      subline:
        "Enter your tracking number below to get real-time updates on your cargo status.",
    },
    search: {
      placeholder: "Enter tracking number...",
      buttonLabel: "Search",
      helpText:
        "Your tracking number can be found on the receipt or confirmation email we sent you.",
    },
    noResult: {
      message: "No shipment found",
      subline:
        "Please double-check your tracking number or contact our team for assistance.",
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
  const c = content[locale as Locale];

  return generatePageMetadata({
    pageKey: "track",
    locale: locale as Locale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

export default async function LacakKirimanPage({
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
      <TrackHero headline={c.hero.headline} subline={c.hero.subline} />

      <TrackingSearch
        locale={typedLocale}
        placeholder={c.search.placeholder}
        buttonLabel={c.search.buttonLabel}
        helpText={c.search.helpText}
      />

      <TrackingResult
        locale={typedLocale}
        noResultMessage={c.noResult.message}
        noResultSubline={c.noResult.subline}
      />
    </main>
  );
}
