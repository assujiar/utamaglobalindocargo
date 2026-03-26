import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getServiceByKey, getServiceDetail } from "@/lib/content/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";

const SERVICE_KEY = "project-cargo";
const ROUTE_KEY = "service-project-cargo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const typedLocale = locale as Locale;
  const detail = getServiceDetail(SERVICE_KEY);
  if (!detail) return {};
  const isId = typedLocale === "id";

  return generatePageMetadata({
    pageKey: ROUTE_KEY,
    locale: typedLocale,
    title: isId ? detail.seo.title_id : detail.seo.title_en,
    description: isId ? detail.seo.description_id : detail.seo.description_en,
  });
}

function ServiceSchema({ locale }: { locale: Locale }) {
  const detail = getServiceDetail(SERVICE_KEY);
  const service = getServiceByKey(SERVICE_KEY);
  if (!detail || !service) return null;
  const isId = locale === "id";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isId ? service.name_id : service.name_en,
    description: isId ? detail.seo.description_id : detail.seo.description_en,
    provider: {
      "@type": "Organization",
      name: "UGC Logistics",
      url: "https://utamaglobalindocargo.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    url: isId
      ? `https://utamaglobalindocargo.com/id/layanan/${service.slug_id}`
      : `https://utamaglobalindocargo.com/en/services/${service.slug_en}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const service = getServiceByKey(SERVICE_KEY);
  const detail = getServiceDetail(SERVICE_KEY);
  if (!service || !detail) notFound();

  return (
    <>
      <Header locale={typedLocale} dictionary={dict} />
      <ServiceSchema locale={typedLocale} />
      <ServiceDetailPage locale={typedLocale} service={service} detail={detail} />
      <Footer locale={typedLocale} dictionary={dict} />
    </>
  );
}
