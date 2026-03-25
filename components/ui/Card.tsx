"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "flat" | "glass-dark" | "glass-light";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: ReactNode;
}

const baseClasses = "relative";

const variantClasses: Record<CardVariant, string> = {
  flat: [
    "bg-white border border-[--color-border] rounded-md p-4 sm:p-6",
  ].join(" "),
  "glass-dark": "glass-dark p-6",
  "glass-light": "glass-light p-6",
};

const hoverClasses: Record<CardVariant, string> = {
  flat: "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md",
  "glass-dark": "transition-opacity duration-300 ease-out hover:bg-white/12",
  "glass-light": "transition-opacity duration-300 ease-out hover:bg-white/70",
};

function Card({
  variant = "flat",
  hover = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        baseClasses,
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
