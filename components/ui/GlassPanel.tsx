import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type GlassVariant = "dark" | "light" | "nav";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  className?: string;
  children: ReactNode;
}

const glassClassMap: Record<GlassVariant, string> = {
  dark: "glass-dark",
  light: "glass-light",
  nav: "glass-nav",
};

function GlassPanel({
  variant = "dark",
  className,
  children,
  ...rest
}: GlassPanelProps) {
  return (
    <div className={cn(glassClassMap[variant], className)} {...rest}>
      {children}
    </div>
  );
}

export { GlassPanel, type GlassPanelProps, type GlassVariant };
