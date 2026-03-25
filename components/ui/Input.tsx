"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils/cn";

/* ─── Shared style tokens ─── */

const fieldClasses = [
  "w-full bg-white border border-[--color-border] rounded-sm px-4 text-base text-[--color-text-primary]",
  "placeholder:text-[--color-text-secondary]",
  "transition-shadow duration-150 ease-out",
  "focus:border-[--color-primary] focus:ring-2 focus:ring-[--color-primary]/20 focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const errorFieldClasses = "border-[--color-error] focus:border-[--color-error] focus:ring-[--color-error]/20";

/* ─── Input ─── */

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, ...rest }, ref) => {
    const generatedId = useId();

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && (
          <label
            htmlFor={generatedId}
            className="text-sm font-medium text-[--color-text-primary]"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-[--color-error]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={generatedId}
          className={cn(fieldClasses, "h-12", error && errorFieldClasses)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${generatedId}-error`}
            className="text-sm text-[--color-error]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

/* ─── Textarea ─── */

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, rows = 4, ...rest }, ref) => {
    const generatedId = useId();

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {label && (
          <label
            htmlFor={generatedId}
            className="text-sm font-medium text-[--color-text-primary]"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-[--color-error]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={generatedId}
          rows={rows}
          className={cn(
            fieldClasses,
            "py-3 resize-y min-h-[120px]",
            error && errorFieldClasses,
          )}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${generatedId}-error`}
            className="text-sm text-[--color-error]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Input, Textarea, type InputProps, type TextareaProps };
