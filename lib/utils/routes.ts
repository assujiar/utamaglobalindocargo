import type { Locale } from "@/lib/i18n/config";

export interface RouteEntry {
  id: string;
  en: string;
  component?: string;
  serviceKey?: string;
  layout?: string;
  phase: number;
}

export interface RouteMap {
  domain: string;
  defaultLocale: Locale;
  locales: Locale[];
  routes: Record<string, RouteEntry>;
  hreflang: { xDefault: Locale };
  redirects: string[];
}

export const routeMap: RouteMap = {
  domain: "utamaglobalindocargo.com",
  defaultLocale: "id",
  locales: ["id", "en"],
  routes: {
    home: { id: "/", en: "/", component: "page", phase: 1 },
    about: { id: "/tentang", en: "/about", component: "about/page", phase: 1 },
    services: { id: "/layanan", en: "/services", component: "services/page", phase: 1 },
    "service-domestic": { id: "/layanan/distribusi-domestik", en: "/services/domestic-distribution", serviceKey: "domestic", phase: 1 },
    "service-international": { id: "/layanan/freight-internasional", en: "/services/international-freight", serviceKey: "international", phase: 1 },
    "service-import-dtd": { id: "/layanan/import-dtd-kepabeanan", en: "/services/import-dtd-customs", serviceKey: "import-dtd", phase: 1 },
    "service-charter": { id: "/layanan/blockspace-charter", en: "/services/blockspace-charter", serviceKey: "charter", phase: 1 },
    "service-warehouse": { id: "/layanan/pergudangan-3pl", en: "/services/warehousing-3pl", serviceKey: "warehouse", phase: 1 },
    "service-project-cargo": { id: "/layanan/kargo-proyek", en: "/services/project-cargo", serviceKey: "project-cargo", phase: 1 },
    quote: { id: "/minta-penawaran", en: "/request-quote", layout: "conversion", phase: 1 },
    contact: { id: "/kontak", en: "/contact", phase: 1 },
    track: { id: "/lacak-kiriman", en: "/track-shipment", phase: 1 },
    insights: { id: "/wawasan", en: "/insights", phase: 2 },
    "insight-article": { id: "/wawasan/[slug]", en: "/insights/[slug]", phase: 2 },
    privacy: { id: "/kebijakan-privasi", en: "/privacy-policy", phase: 1 },
    terms: { id: "/syarat-ketentuan", en: "/terms-of-service", phase: 1 },
    sitemap: { id: "/peta-situs", en: "/sitemap", phase: 1 },
  },
  hreflang: { xDefault: "id" },
  redirects: [],
};

/**
 * Get the localized path for a given route key and locale.
 */
export function getLocalizedPath(key: string, locale: Locale): string {
  const route = routeMap.routes[key];
  if (!route) return "/";
  return `/${locale}${route[locale]}`;
}

/**
 * Get the alternate locale path for a given route key.
 */
export function getAlternatePath(key: string, locale: Locale): string {
  const alternate: Locale = locale === "id" ? "en" : "id";
  return getLocalizedPath(key, alternate);
}
