import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { routeMap, getLocalizedPath } from "./routes";

const DOMAIN = "https://utamaglobalindocargo.com";

interface SEOInput {
  pageKey: string;
  locale: Locale;
  title: string;
  description: string;
  ogImage?: string;
}

/**
 * Generate Next.js Metadata object for a page.
 */
export function generatePageMetadata({
  pageKey,
  locale,
  title,
  description,
  ogImage,
}: SEOInput): Metadata {
  const path = getLocalizedPath(pageKey, locale);
  const canonicalUrl = `${DOMAIN}${path}`;

  const alternateLocale: Locale = locale === "id" ? "en" : "id";
  const alternatePath = getLocalizedPath(pageKey, alternateLocale);
  const alternateUrl = `${DOMAIN}${alternatePath}`;

  const defaultRoute = routeMap.routes[pageKey];
  const xDefaultPath = defaultRoute
    ? `${DOMAIN}/id${defaultRoute.id}`
    : canonicalUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        id: locale === "id" ? canonicalUrl : alternateUrl,
        en: locale === "en" ? canonicalUrl : alternateUrl,
        "x-default": xDefaultPath,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "UGC Logistics",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
