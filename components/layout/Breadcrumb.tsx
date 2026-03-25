import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `https://utamaglobalindocargo.com${item.href}`,
      }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
        <ol className="flex items-center flex-wrap gap-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span
                    className="text-[--color-text-secondary] select-none"
                    aria-hidden="true"
                  >
                    &gt;
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="text-[--color-text-secondary]"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[--color-text-primary] hover:text-[--color-primary] transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem };
