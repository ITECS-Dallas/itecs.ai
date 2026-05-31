"use client";

import { motion, useReducedMotion } from "framer-motion";
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

const directionOffset = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

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
  const reducedMotion = useReducedMotion();
  const offset = directionOffset[direction];
  const revealDistance = Math.min(Math.max(distance, 12), 16);
  const initialTransform = {
    opacity: 0.96,
    x: offset.x * revealDistance,
    y: offset.y * revealDistance,
  };
  const visibleTransform = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      data-motion="scroll-reveal"
      initial={reducedMotion ? false : initialTransform}
      whileInView={visibleTransform}
      viewport={{ once, amount }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1] as [
                number,
                number,
                number,
                number,
              ],
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
