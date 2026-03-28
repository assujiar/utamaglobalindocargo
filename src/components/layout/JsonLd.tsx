export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Utama Globalindo Cargo",
    description:
      "Freight forwarding, customs brokerage, warehousing, dan project cargo. Jakarta, Asia Pasifik.",
    url: "https://utamaglobalindocargo.com",
    logo: "https://utamaglobalindocargo.com/logo.png",
    industry: "Logistics & Supply Chain",
    areaServed: {
      "@type": "GeoShape",
      name: "Asia Pacific",
    },
    serviceType: [
      "Domestic Distribution",
      "International Freight Forwarding",
      "Import Door-to-Door",
      "Customs Brokerage",
      "Warehousing & Fulfillment",
      "Project Cargo & Special Handling",
      "Blocspace & Airfreight Charter",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
