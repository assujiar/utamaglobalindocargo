"use client";

import { useState, useId, useCallback, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
}

function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );
  const baseId = useId();

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    [],
  );

  return (
    <div className={cn("divide-y divide-[--color-border]", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={index}>
            <button
              id={triggerId}
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 py-4 text-left",
                "min-h-14 text-base font-medium text-[--color-text-primary]",
                "transition-colors duration-150 ease-out",
                "hover:text-[--color-primary]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
              )}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-[--color-text-secondary] transition-transform duration-300 ease-out",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-[--color-text-secondary] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion, type AccordionProps, type AccordionItem };
