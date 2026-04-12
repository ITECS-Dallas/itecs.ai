"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CircuitTraceProps {
  className?: string;
  variant?: "hero" | "section-divider" | "background";
}

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, delay: i * 0.2, ease: "easeInOut" as const },
      opacity: { duration: 0.3, delay: i * 0.2 },
    },
  }),
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 1 + i * 0.15, ease: "easeOut" as const },
  }),
};

function HeroCircuit() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 500"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main vertical traces */}
      {[
        "M 200 500 L 200 300 L 180 250 L 180 150 L 180 80",
        "M 200 300 L 220 250 L 220 180 L 240 140 L 240 60",
        "M 200 350 L 160 300 L 160 200 L 150 150",
        "M 220 250 L 280 220 L 300 180",
        "M 160 300 L 120 270 L 100 220",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={i}
          variants={pathVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      ))}

      {/* Circuit nodes */}
      {[
        { cx: 180, cy: 80 },
        { cx: 240, cy: 60 },
        { cx: 150, cy: 150 },
        { cx: 300, cy: 180 },
        { cx: 100, cy: 220 },
        { cx: 200, cy: 300 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="5"
          fill="var(--bg-void)"
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          custom={i}
          variants={nodeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      ))}

      {/* Pulsing inner dots */}
      {[
        { cx: 180, cy: 80 },
        { cx: 240, cy: 60 },
        { cx: 150, cy: 150 },
      ].map((node, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={node.cx}
          cy={node.cy}
          r="2"
          fill="var(--brand-accent)"
          custom={i}
          variants={nodeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="animate-pulse-node"
        />
      ))}
    </svg>
  );
}

function SectionDivider() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 40"
      fill="none"
      className="w-full h-10"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M 0 20 L 400 20 L 420 10 L 500 10 L 520 20 L 680 20 L 700 30 L 780 30 L 800 20 L 1200 20"
        stroke="var(--brand-accent)"
        strokeWidth="1"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      />
      {[420, 500, 700, 780].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cx === 420 || cx === 500 ? 10 : 30}
          r="3"
          fill="var(--bg-void)"
          stroke="var(--brand-accent)"
          strokeWidth="1"
          custom={i}
          variants={nodeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      ))}
    </svg>
  );
}

export function CircuitTrace({
  className = "",
  variant = "hero",
}: CircuitTraceProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {variant === "hero" && <HeroCircuit />}
      {variant === "section-divider" && <SectionDivider />}
      {variant === "background" && (
        <div className="absolute inset-0 opacity-[0.03]">
          <HeroCircuit />
        </div>
      )}
    </div>
  );
}
