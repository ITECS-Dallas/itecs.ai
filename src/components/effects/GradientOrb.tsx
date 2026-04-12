"use client";

const sizeMap = { sm: 200, md: 400, lg: 600 } as const;

const colorMap = {
  cyan: "var(--brand-accent)",
  purple: "var(--brand-purple)",
  mixed: "var(--brand-accent)",
} as const;

interface GradientOrbProps {
  color?: "cyan" | "purple" | "mixed";
  size?: "sm" | "md" | "lg";
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  className?: string;
}

export function GradientOrb({
  color = "cyan",
  size = "md",
  position = {},
  className = "",
}: GradientOrbProps) {
  const px = sizeMap[size];
  const clr = colorMap[color];

  return (
    <div
      className={`pointer-events-none absolute rounded-full animate-orb-float ${className}`}
      style={{
        width: px,
        height: px,
        ...position,
        background:
          color === "mixed"
            ? `radial-gradient(circle, var(--brand-accent) 0%, var(--brand-purple) 50%, transparent 70%)`
            : `radial-gradient(circle, ${clr} 0%, transparent 70%)`,
        opacity: 0.15,
        filter: `blur(${px / 5}px)`,
      }}
    />
  );
}
