export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Utama Global Indo Cargo",
    description:
      "Platform logistik korporat B2B berkinerja tinggi untuk solusi pengiriman dan manajemen rantai pasok tingkat eksekutif di Asia Pasifik.",
    url: "https://utaglobalindocargo.com",
    logo: "https://utaglobalindocargo.com/logo.png",
    industry: "Logistics & Supply Chain Management",
    areaServed: {
      "@type": "GeoShape",
      name: "Asia Pasifik & Global",
    },
    serviceType: [
      "Freight Forwarding",
      "Warehouse Management",
      "Customs Brokerage",
      "Supply Chain Orchestration",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "B2B Sales & Executive Consultation",
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
