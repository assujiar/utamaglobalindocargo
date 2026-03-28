"use client";

import { useState } from "react";

interface CaseStudyItem {
  slug: string;
  title: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  result: string;
  isPlaceholder: boolean;
}

interface CaseStudyFilterProps {
  cases: CaseStudyItem[];
  industries: { slug: string; name: string }[];
  filterAllLabel: string;
  challengeLabel: string;
  solutionLabel: string;
  resultLabel: string;
}

export default function CaseStudyFilter({
  cases,
  industries,
  filterAllLabel,
  challengeLabel,
  solutionLabel,
  resultLabel,
}: CaseStudyFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? cases
      : cases.filter((c) => c.industry === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            activeFilter === "all"
              ? "bg-carbon-dark text-white"
              : "bg-white border border-border-light text-text-muted hover:border-carbon-dark"
          }`}
        >
          {filterAllLabel}
        </button>
        {industries.map((ind) => (
          <button
            key={ind.slug}
            onClick={() => setActiveFilter(ind.slug)}
            className={`px-4 py-2 text-sm font-bold transition-colors ${
              activeFilter === ind.slug
                ? "bg-carbon-dark text-white"
                : "bg-white border border-border-light text-text-muted hover:border-carbon-dark"
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      {/* Case studies grid */}
      <div className="space-y-8">
        {filtered.map((cs) => (
          <article
            key={cs.slug}
            className="p-8 lg:p-10 bg-white border border-border-light"
          >
            {cs.isPlaceholder && (
              <span className="inline-block mb-4 text-[10px] uppercase tracking-wider text-logistics-orange bg-logistics-orange/10 px-2 py-1">
                Placeholder
              </span>
            )}
            <h3 className="text-xl font-bold text-carbon-dark mb-6">
              {cs.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-2">
                  {challengeLabel}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-2">
                  {solutionLabel}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {cs.solution}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-2">
                  {resultLabel}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {cs.result}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
