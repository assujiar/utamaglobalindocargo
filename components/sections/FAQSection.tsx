"use client";

import { cn } from "@/lib/utils/cn";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  heading: string;
  items: FAQItem[];
  className?: string;
}

function FAQSchemaJsonLd({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FAQSection({ heading, items, className }: FAQSectionProps) {
  const accordionItems = items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <FAQSchemaJsonLd items={items} />
      <section className={cn("py-28 sm:py-36 relative overflow-hidden", className)}
        style={{
          background: "linear-gradient(180deg, #111113 0%, #0f0805 50%, #111113 100%)",
        }}
      >
        {/* Side glow accents */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.05] blur-[160px]" />
          <div className="absolute top-1/3 right-0 w-[300px] h-[400px] rounded-full bg-[--color-accent-warm] opacity-[0.04] blur-[120px]" />
        </div>

        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">FAQ</p>
            <h2 className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-14 sm:mb-18 tracking-[-0.02em]">
              {heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-tinted p-6 sm:p-8">
              <Accordion items={accordionItems} defaultOpen={0} />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
