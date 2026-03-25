import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

function ProgressIndicator({
  totalSteps,
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            {/* Step dot */}
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ease-out",
                isCompleted &&
                  "bg-[--color-primary] text-white",
                isActive &&
                  "bg-[--color-primary] text-white ring-4 ring-[--color-primary]/20",
                !isCompleted &&
                  !isActive &&
                  "border-2 border-[--color-border] text-[--color-text-secondary]",
              )}
              aria-hidden="true"
            >
              {isCompleted ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : (
                step
              )}
            </div>

            {/* Connector line between steps */}
            {step < totalSteps && (
              <div
                className={cn(
                  "h-0.5 w-8 transition-colors duration-300 ease-out",
                  step < currentStep
                    ? "bg-[--color-primary]"
                    : "bg-[--color-border]",
                )}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { ProgressIndicator, type ProgressIndicatorProps };
