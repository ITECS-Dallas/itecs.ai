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
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer";

const variants = {
  primary:
    "bg-brand-accent text-bg-void hover:shadow-[0_0_30px_var(--glow-cyan)]",
  secondary:
    "border border-brand-accent text-brand-accent bg-transparent hover:bg-brand-accent/10 hover:border-brand-accent-bright",
  ghost:
    "text-text-secondary hover:text-brand-accent",
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
