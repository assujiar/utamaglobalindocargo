import Container from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";

interface TrustStripProps {
  locale: Locale;
}

const capabilities = {
  id: [
    { label: "6 Kategori Layanan", detail: "Domestik, internasional, customs, gudang, project, charter" },
    { label: "Seluruh Indonesia", detail: "Jawa, Sumatera, Kalimantan, Sulawesi, dan pulau lainnya" },
    { label: "Rute Internasional", detail: "Ekspor dan impor via laut dan udara ke berbagai negara" },
    { label: "Satu Titik Koordinasi", detail: "Satu tim mengurus transport, dokumen, customs, dan gudang" },
  ],
  en: [
    { label: "6 Service Categories", detail: "Domestic, international, customs, warehouse, project, charter" },
    { label: "Across Indonesia", detail: "Java, Sumatra, Kalimantan, Sulawesi, and beyond" },
    { label: "International Routes", detail: "Export and import via sea and air to multiple countries" },
    { label: "One Coordination Point", detail: "One team handling transport, docs, customs, and storage" },
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
