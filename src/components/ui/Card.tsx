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
    relative rounded-xl border bg-bg-surface p-6
    border-[var(--border-subtle)]
    ${hover ? "transition-all duration-300 hover:border-[var(--border-active)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--glow-cyan)]" : ""}
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
