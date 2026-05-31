import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${SITE_CONFIG.url}${item.href}`,
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(schemaItems)} />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 py-4 text-sm text-text-dim"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-text-dim/50" />
              )}
              {isLast ? (
                <span className="text-text-secondary">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
