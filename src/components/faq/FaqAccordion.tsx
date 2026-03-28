"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border-light">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              className="w-full text-left py-6 flex items-start justify-between gap-4 group"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors pr-4">
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border-light transition-all ${
                  isOpen ? "bg-logistics-orange border-logistics-orange text-white rotate-45" : "text-text-muted"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-6" : "max-h-0"
              }`}
            >
              <p className="text-sm md:text-base text-text-muted leading-relaxed pr-12">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
