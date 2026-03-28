import Container from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface TrustStripProps {
  dict: Dictionary;
}

export default function TrustStrip({ dict }: TrustStripProps) {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-border-light">
      <Container>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-3">
            {dict.trustStrip.heading}
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
            {dict.trustStrip.description}
          </p>

          {/* Placeholder for client logos */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-24 h-8 bg-surface-light flex items-center justify-center text-[10px] text-text-light uppercase tracking-wider"
                aria-label={`Client logo placeholder ${i}`}
              >
                {/* [PLACEHOLDER: Replace with real client logos when available] */}
                Logo {i}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
