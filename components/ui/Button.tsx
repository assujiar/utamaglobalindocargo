"use client";

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
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
  sm: "h-10 px-5 text-sm gap-2",
  md: "h-12 px-7 text-base gap-2",
  lg: "h-14 px-9 text-lg gap-2.5",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[--color-primary] text-white rounded-xl btn-glow",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
  ].join(" "),
  secondary: [
    "glass-dark border-[--color-border-glow] text-[--color-primary] rounded-xl",
    "hover:bg-[rgba(255,70,0,0.10)] hover:border-[--color-primary]",
    "active:bg-[rgba(255,70,0,0.15)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  tertiary: [
    "text-[--color-primary] bg-transparent px-0 h-auto",
    "hover:text-[--color-primary-light]",
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
      "inline-flex items-center justify-center font-semibold",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
      !isTertiary && sizeClasses[size],
      variantClasses[variant],
      isTertiary && size === "sm" && "text-sm gap-1.5",
      isTertiary && size === "md" && "text-base gap-2",
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
          <ArrowRight
            className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5"
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
