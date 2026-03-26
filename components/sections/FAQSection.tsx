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
      <section className={cn("py-28 sm:py-36 section-dark relative overflow-hidden", className)}>
        {/* Ambient depth */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[35vw] h-[35vw] top-[20%] left-[-5%] opacity-[0.05]" />
        </div>

        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] mb-4">FAQ</p>
            <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] mb-14 sm:mb-18 tracking-[-0.03em]">
              {heading}
            </h2>
          </ScrollReveal>
          <motion.div
            className="card-elevated !p-6 sm:!p-8"
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
