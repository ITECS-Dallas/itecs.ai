"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Shared animation variants — identical to the homepage HeroCircuit
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

export interface CircuitPath {
  d: string;
}

export interface CircuitNode {
  cx: number;
  cy: number;
  pulse?: boolean;
}

interface ServiceCircuitProps {
  paths: CircuitPath[];
  nodes: CircuitNode[];
  className?: string;
  viewBox?: string;
}

export function ServiceCircuit({
  paths,
  nodes,
  className = "h-[500px]",
  viewBox = "0 0 400 500",
}: ServiceCircuitProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className={`pointer-events-none ${className}`}>
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Trace paths */}
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            stroke="var(--brand-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={i}
            variants={pathVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        ))}

        {/* Hollow nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
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
        {nodes
          .filter((n) => n.pulse)
          .map((node, i) => (
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
    </div>
  );
}
