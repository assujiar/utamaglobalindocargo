import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieConsent from "@/components/analytics/CookieConsent";
import LocaleHtmlLang from "@/components/layout/LocaleHtmlLang";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://utamaglobalindocargo.com";

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | UGC Logistics`,
    },
    description: dict.metadata.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: "UGC Logistics (Utama Globalindo Cargo)",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      url: `${siteUrl}/${locale}`,
      images: [
        {
          url: `${siteUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: "UGC Logistics - One line of control across every handoff",
          type: "image/svg+xml",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [`${siteUrl}/og-image.svg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "format-detection": "telephone=no",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <GoogleAnalytics />
      <a href="#main-content" className="skip-link">
        {locale === "id" ? "Langsung ke konten" : "Skip to content"}
      </a>
      <Header locale={locale as Locale} dict={dict} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale as Locale} dict={dict} />
      <CookieConsent locale={locale} />
    </>
  );
}
