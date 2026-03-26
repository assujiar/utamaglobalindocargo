"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

/**
 * Link with Buzzworthy-style scaleX underline animation.
 * Uses hoverIn/hoverOut keyframes with different transform-origins
 * for a sliding underline effect (enters from left, exits to right).
 */
function AnimatedLink({ href, className, children, external }: AnimatedLinkProps) {
  const classes = cn(
    "text-link",
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export { AnimatedLink, type AnimatedLinkProps };
