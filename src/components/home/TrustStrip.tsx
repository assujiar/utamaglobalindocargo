import Container from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";

interface TrustStripProps {
  locale: Locale;
}

const capabilities = {
  id: [
    { label: "6 Kategori Layanan", detail: "Domestik, internasional, customs, gudang, project cargo, charter" },
    { label: "Seluruh Indonesia", detail: "Jawa, Sumatera, Kalimantan, Sulawesi, dan seluruh kepulauan" },
    { label: "Rute Internasional", detail: "Ekspor & impor via laut dan udara ke berbagai negara" },
    { label: "Satu Koordinator", detail: "Satu dedicated contact person dari awal sampai kargo tiba" },
  ],
  en: [
    { label: "6 Service Categories", detail: "Domestic, international, customs, warehouse, project cargo, charter" },
    { label: "All of Indonesia", detail: "Java, Sumatra, Kalimantan, Sulawesi, and the entire archipelago" },
    { label: "International Routes", detail: "Export & import via sea and air to multiple countries" },
    { label: "One Coordinator", detail: "One dedicated contact person from start to cargo arrival" },
  ],
};

export default function TrustStrip({ locale }: TrustStripProps) {
  const items = capabilities[locale];

  return (
    <section className="bg-white py-10 lg:py-12 border-b border-border-light">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="text-sm font-bold text-carbon-dark">{item.label}</p>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
