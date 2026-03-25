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
      <section className={cn("py-20 sm:py-24 bg-[--color-bg-light]", className)}>
        <div className="mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-10 sm:mb-12">
              {heading}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion items={accordionItems} defaultOpen={0} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
