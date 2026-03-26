"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

function AnimatedLink({ href, className, children, external }: AnimatedLinkProps) {
  const classes = cn(
    "relative inline-block text-[--color-text-secondary] hover:text-[--color-primary] transition-colors duration-200",
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
    "after:bg-[--color-primary] after:origin-left",
    "after:scale-x-0 hover:after:scale-x-100",
    "after:transition-transform after:duration-200 after:ease-out",
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
