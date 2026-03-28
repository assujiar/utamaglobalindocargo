import type { Locale } from "@/i18n/config";
import { caseStudies } from "@/data/caseStudies";

interface TrustElementProps {
  serviceSlug: string;
  locale: Locale;
  heading: string;
}

export default function TrustElement({ serviceSlug, locale, heading }: TrustElementProps) {
  const relevant = caseStudies.find((cs) => cs.service === serviceSlug);
  if (!relevant) return null;

  return (
    <div className="p-8 bg-surface-light border-l-4 border-logistics-orange">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-4">
        {heading}
      </h3>
      {relevant.isPlaceholder && (
        <span className="inline-block mb-3 text-[10px] uppercase tracking-wider text-logistics-orange/60 bg-logistics-orange/10 px-2 py-1">
          Placeholder
        </span>
      )}
      <p className="text-base font-bold text-carbon-dark mb-2">
        {relevant.title[locale]}
      </p>
      <p className="text-sm text-text-muted leading-relaxed">
        {relevant.solution[locale]}
      </p>
    </div>
  );
}
