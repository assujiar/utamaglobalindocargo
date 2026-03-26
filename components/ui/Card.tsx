"use client";

import { type ReactNode, type HTMLAttributes, useRef, useCallback } from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "flat" | "glass-dark" | "glass-tinted" | "glass-light";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  tilt?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  flat: "bg-[--color-bg-light-elevated] border border-[--color-border-light] rounded-2xl p-6 sm:p-8",
  "glass-dark": "glass-dark p-6 sm:p-8",
  "glass-tinted": "glass-tinted p-6 sm:p-8",
  "glass-light": "glass-light p-6 sm:p-8",
};

function Card({
  variant = "glass-dark",
  hover = true,
  tilt = false,
  className,
  children,
  ...rest
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -15; // -7.5 to 7.5 degrees
      const rotateY = (x - 0.5) * 15;
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      // Update shine position
      cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
      cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
    },
    [tilt],
  );

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, [tilt]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative",
        variantClasses[variant],
        hover && "transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,70,0,0.12)]",
        hover && variant === "glass-dark" && "hover:border-[rgba(255,70,0,0.30)] hover:bg-[rgba(255,255,255,0.07)]",
        hover && variant === "glass-tinted" && "hover:border-[rgba(255,70,0,0.45)] hover:shadow-[0_0_60px_rgba(255,70,0,0.15)]",
        hover && variant === "glass-light" && "hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)]",
        tilt && "card-shine",
        tilt && "[transition:transform_200ms_ease-out,border-color_300ms_ease-out,box-shadow_300ms_ease-out]",
        className,
      )}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Card, type CardProps, type CardVariant };
