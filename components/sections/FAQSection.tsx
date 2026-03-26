"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReduced = useReducedMotion();
  const accordionItems = items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <FAQSchemaJsonLd items={items} />
      <section className={cn("py-28 sm:py-36 bg-[--color-bg-dark]", className)}>
        <div className="mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] mb-4">FAQ</p>
            <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] mb-14 sm:mb-18 tracking-[-0.03em]">
              {heading}
            </h2>
          </ScrollReveal>
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Accordion items={accordionItems} defaultOpen={0} />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
