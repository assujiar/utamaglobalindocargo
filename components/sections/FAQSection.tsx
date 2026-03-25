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
      <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark-elevated]", className)}>
        <div className="mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">FAQ</p>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-12 sm:mb-16 tracking-[-0.02em]">
              {heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-dark p-6 sm:p-8">
              <Accordion items={accordionItems} defaultOpen={0} />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
