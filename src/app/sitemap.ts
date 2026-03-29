import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://utamaglobalindocargo.com";
  const now = new Date();

  const staticPages = [
    "",
    "/services",
    "/industries",
    "/case-studies",
    "/about",
    "/faq",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for both locales
  for (const locale of ["id", "en"]) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            id: `${baseUrl}/id${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }
  }

  // Service pages
  for (const locale of ["id", "en"]) {
    for (const service of services) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            id: `${baseUrl}/id/services/${service.slug}`,
            en: `${baseUrl}/en/services/${service.slug}`,
          },
        },
      });
    }
  }

  // Industry pages
  for (const locale of ["id", "en"]) {
    for (const industry of industries) {
      entries.push({
        url: `${baseUrl}/${locale}/industries/${industry.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            id: `${baseUrl}/id/industries/${industry.slug}`,
            en: `${baseUrl}/en/industries/${industry.slug}`,
          },
        },
      });
    }
  }

  // Case study detail pages
  for (const locale of ["id", "en"]) {
    for (const cs of caseStudies) {
      entries.push({
        url: `${baseUrl}/${locale}/case-studies/${cs.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: {
          languages: {
            id: `${baseUrl}/id/case-studies/${cs.slug}`,
            en: `${baseUrl}/en/case-studies/${cs.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
