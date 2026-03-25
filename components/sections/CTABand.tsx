import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Locale } from "@/lib/i18n/config";

interface CTABandProps {
  locale: Locale;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
  className?: string;
}

function CTABand({
  heading,
  ctaLabel,
  ctaHref,
  trustLine,
  className,
}: CTABandProps) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 bg-[--color-bg-dark] text-center",
        className,
      )}
    >
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-inverse] mb-8">
            {heading}
          </h2>
          <Button href={ctaHref} size="lg">
            {ctaLabel}
          </Button>
          <p className="mt-6 text-sm text-[--color-text-secondary]">
            {trustLine}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { CTABand, type CTABandProps };
