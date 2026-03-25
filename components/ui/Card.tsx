"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "flat" | "glass-dark" | "glass-tinted" | "glass-light";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  flat: "bg-[--color-bg-light-elevated] border border-[--color-border-light] rounded-2xl p-6 sm:p-8",
  "glass-dark": "glass-dark p-6 sm:p-8",
  "glass-tinted": "glass-tinted p-6 sm:p-8",
  "glass-light": "glass-light p-6 sm:p-8",
};

const hoverClasses: Record<CardVariant, string> = {
  flat: "transition-all duration-250 ease-out hover:-translate-y-1.5 hover:shadow-[--shadow-warm]",
  "glass-dark":
    "transition-all duration-250 ease-out hover:-translate-y-1.5 hover:border-[rgba(255,70,0,0.20)] hover:shadow-[0_0_40px_rgba(255,70,0,0.06)]",
  "glass-tinted":
    "transition-all duration-250 ease-out hover:-translate-y-1.5 hover:border-[rgba(255,70,0,0.30)] hover:shadow-[0_0_60px_rgba(255,70,0,0.10)]",
  "glass-light":
    "transition-all duration-250 ease-out hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
};

function Card({
  variant = "glass-dark",
  hover = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "relative",
        variantClasses[variant],
        hover && hoverClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps, type CardVariant };
