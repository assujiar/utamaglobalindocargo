import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getServiceByKey, getServiceDetail } from "@/lib/content/services";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";

const SERVICE_KEY = "project-cargo";
const ROUTE_KEY = "service-project-cargo";
const LOCALE: Locale = "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const detail = getServiceDetail(SERVICE_KEY);
  if (!detail) return {};

  return generatePageMetadata({
    pageKey: ROUTE_KEY,
    locale: LOCALE,
    title: detail.seo.title_en,
    description: detail.seo.description_en,
  });
}

function ServiceSchema() {
  const detail = getServiceDetail(SERVICE_KEY);
  const service = getServiceByKey(SERVICE_KEY);
  if (!detail || !service) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name_en,
    description: detail.seo.description_en,
    provider: {
      "@type": "Organization",
      name: "UGC Logistics",
      url: "https://utamaglobalindocargo.com",
    },
    url: `https://utamaglobalindocargo.com/en/services/${service.slug_en}`,
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

  const service = getServiceByKey(SERVICE_KEY);
  const detail = getServiceDetail(SERVICE_KEY);
  if (!service || !detail) notFound();

  return (
    <>
      <ServiceSchema />
      <ServiceDetailPage locale={LOCALE} service={service} detail={detail} />
    </>
  );
}
