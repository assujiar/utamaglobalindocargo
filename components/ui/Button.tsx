"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  href?: string;
  className?: string;
  children: ReactNode;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-base gap-2",
  lg: "h-14 px-8 text-lg gap-2.5",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[--color-primary] text-white",
    "hover:bg-[--color-primary-dark]",
    "active:bg-[--color-primary-dark]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[--color-primary]",
  ].join(" "),
  secondary: [
    "border border-[--color-primary] text-[--color-primary] bg-transparent",
    "hover:bg-[--color-primary-subtle]",
    "active:bg-[--color-primary-subtle]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  ].join(" "),
  tertiary: [
    "text-[--color-primary] bg-transparent px-0 h-auto",
    "hover:underline",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      href,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isTertiary = variant === "tertiary";
    const isDisabled = disabled || loading;

    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-colors duration-150 ease-out",
      "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
      !isTertiary && sizeClasses[size],
      variantClasses[variant],
      isTertiary && size === "sm" && "text-sm gap-1",
      isTertiary && size === "md" && "text-base gap-1.5",
      isTertiary && size === "lg" && "text-lg gap-2",
      className,
    );

    const content = (
      <>
        {loading ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : icon ? (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span>{children}</span>
        {isTertiary && !loading && (
          <ChevronRight
            className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </>
    );

    if (href && !isDisabled) {
      return (
        <Link href={href} className={cn(classes, "group no-underline")}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(classes, "group")}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
