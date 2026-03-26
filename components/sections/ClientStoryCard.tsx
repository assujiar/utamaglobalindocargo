"use client";

import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Locale } from "@/lib/i18n/config";

interface ClientStoryData {
  industry_id: string;
  industry_en: string;
  challenge_id: string;
  challenge_en: string;
  solution_id: string;
  solution_en: string;
  result_id: string;
  result_en: string;
  display_quote_id: string;
  display_quote_en: string;
}

interface ClientStoryCardProps {
  story: ClientStoryData;
  locale: Locale;
  className?: string;
}

function ClientStoryCard({ story, locale, className }: ClientStoryCardProps) {
  const industry = locale === "id" ? story.industry_id : story.industry_en;
  const challenge = locale === "id" ? story.challenge_id : story.challenge_en;
  const solution = locale === "id" ? story.solution_id : story.solution_en;
  const result = locale === "id" ? story.result_id : story.result_en;
  const quote =
    locale === "id" ? story.display_quote_id : story.display_quote_en;

  const challengeLabel = locale === "id" ? "Tantangan" : "Challenge";
  const solutionLabel = locale === "id" ? "Solusi" : "Solution";
  const resultLabel = locale === "id" ? "Hasil" : "Result";

  return (
    <ScrollReveal>
      <div
        className={cn(
          "border-l-2 border-[--color-primary] pl-6 sm:pl-8",
          className,
        )}
      >
        {/* Industry tag */}
        <span className="label-text text-[--color-primary] mb-5 block">
          {industry}
        </span>

        {/* Pull quote */}
        <blockquote className="text-lg sm:text-xl font-medium text-[--color-text-primary] leading-snug mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Challenge / Solution / Result */}
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-[--color-text-primary]">
              {challengeLabel}:
            </span>{" "}
            <span className="text-[--color-text-secondary]">{challenge}</span>
          </div>
          <div>
            <span className="font-semibold text-[--color-text-primary]">
              {solutionLabel}:
            </span>{" "}
            <span className="text-[--color-text-secondary]">{solution}</span>
          </div>
          <div>
            <span className="font-semibold text-[--color-primary]">
              {resultLabel}:
            </span>{" "}
            <span className="text-[--color-text-secondary]">{result}</span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export { ClientStoryCard, type ClientStoryCardProps, type ClientStoryData };
