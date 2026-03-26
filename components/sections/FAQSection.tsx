"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Accordion } from "@/components/ui/Accordion";
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
      <section className={cn("py-28 sm:py-40 bg-[#0E0C08] relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[rgba(255,70,0,0.15)] via-transparent to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Asymmetric two-column: heading left, accordion right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-3">
              <motion.h2
                className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] tracking-[-0.03em] md:sticky md:top-24"
                initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {heading}
              </motion.h2>
            </div>

            <div className="md:col-span-8 md:col-start-5">
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
