"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
}

export function Card({
  children,
  className = "",
  hover = true,
  href,
}: CardProps) {
  const base = `
    relative rounded-lg border bg-bg-surface p-6
    border-[var(--border-default)] shadow-e1
    [box-shadow:var(--elev-1-inset),var(--elev-1)]
    ${hover ? "transition-all duration-200 ease-out hover:border-[var(--border-strong)] hover:-translate-y-0.5 hover:[box-shadow:var(--elev-1-inset),var(--elev-2)]" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={`block group ${base}`}>
        {children}
      </Link>
    );
  }

  return <div className={base}>{children}</div>;
}
