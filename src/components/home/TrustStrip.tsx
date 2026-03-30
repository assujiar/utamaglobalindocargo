"use client";

import Container from "@/components/ui/Container";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import type { Locale } from "@/i18n/config";

interface TrustStripProps {
  locale: Locale;
}

const capabilities = {
  id: [
    { label: "6 Lini Layanan", detail: "Distribusi, freight internasional, customs, warehousing, project cargo, charter" },
    { label: "Seluruh Indonesia", detail: "Jawa, Sumatera, Kalimantan, Sulawesi, dan seluruh kepulauan" },
    { label: "Rute Internasional", detail: "Ekspor dan impor via laut dan udara ke berbagai negara" },
    { label: "Model Hybrid", detail: "Kapabilitas in-house dan jaringan carrier partner yang established" },
  ],
  en: [
    { label: "6 Service Lines", detail: "Distribution, international freight, customs, warehousing, project cargo, charter" },
    { label: "All of Indonesia", detail: "Java, Sumatra, Kalimantan, Sulawesi, and the entire archipelago" },
    { label: "International Routes", detail: "Export and import via sea and air to multiple countries" },
    { label: "Hybrid Model", detail: "In-house capability combined with established carrier partnerships" },
  ],
};

export default function TrustStrip({ locale }: TrustStripProps) {
  const items = capabilities[locale];

  return (
    <section className="bg-white py-10 lg:py-12 border-b border-border-light">
      <Container>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" stagger={0.06} physics="tween">
          {items.map((item, i) => (
            <StaggerItem key={i} physics="tween">
              <div className="text-center lg:text-left">
                <p className="text-sm font-bold text-carbon-dark">{item.label}</p>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
