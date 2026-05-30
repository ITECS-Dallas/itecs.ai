"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-normal transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void disabled:cursor-not-allowed disabled:bg-bg-elevated disabled:text-text-disabled";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--brand-subtle)] active:bg-brand-active",
  secondary:
    "border border-[var(--border-strong)] text-text-primary bg-transparent hover:bg-bg-elevated hover:border-[var(--border-strong)]",
  ghost:
    "text-brand-hover hover:text-text-primary",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={classes}
    >
      {inner}
    </motion.button>
  );
}
