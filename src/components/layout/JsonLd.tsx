export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Utama Globalindo Cargo",
    description:
      "Freight forwarding, customs brokerage, warehousing, dan project cargo untuk perusahaan yang membutuhkan partner logistik terpercaya. Jakarta, Indonesia.",
    url: "https://utamaglobalindocargo.com",
    logo: "https://utamaglobalindocargo.com/logo.svg",
    image: "https://utamaglobalindocargo.com/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Indonesia",
      },
      {
        "@type": "GeoShape",
        name: "Asia Pacific",
      },
    ],
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
      email: "info@utamaglobalindocargo.com",
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
