"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Accordion } from "@/components/ui/Accordion";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";

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
  const prefersReduced = useReducedMotion();
  const accordionItems = items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <GSAPProvider>
      <FAQSchemaJsonLd items={items} />
      <section className={cn("py-28 sm:py-40 section-dark relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Asymmetric two-column: heading left, accordion right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.05}
                className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] tracking-[-0.03em] md:sticky md:top-24"
              >
                {heading}
              </SplitTextReveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Accordion items={accordionItems} defaultOpen={0} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
