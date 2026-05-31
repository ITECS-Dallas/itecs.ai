import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 16,
  duration = 0.6,
  className,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  return (
    <div
      data-motion="scroll-reveal"
      data-motion-direction={direction}
      data-motion-distance={Math.min(Math.max(distance, 12), 16)}
      data-motion-delay={delay}
      data-motion-duration={duration}
      data-motion-once={String(once)}
      data-motion-amount={amount}
      className={className}
    >
      {children}
    </div>
  );
}
