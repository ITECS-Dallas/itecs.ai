"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- Entrance animation variants (unchanged) ---
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

  // Delay the flowing-particle overlay until the draw animation finishes
  const maxDrawTime = paths.length * 0.2 + 2; // last path stagger + 2s draw
  const [showFlow, setShowFlow] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowFlow(true), maxDrawTime * 1000);
    return () => clearTimeout(timer);
  }, [inView, maxDrawTime]);

  return (
    <div className={`pointer-events-none ${className}`}>
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- SVG Definitions: glow filter + gradient stroke --- */}
        <defs>
          <filter id="circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-purple)" />
          </linearGradient>
          <radialGradient id="node-halo-grad">
            <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* === Layer 1: Glow underlayer (blurred copy of all paths) === */}
        <g filter="url(#circuit-glow)" opacity="0.5">
          {paths.map((path, i) => (
            <motion.path
              key={`glow-${i}`}
              d={path.d}
              stroke="var(--brand-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              custom={i}
              variants={pathVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          ))}
        </g>

        {/* === Layer 2: Crisp trace paths with gradient stroke === */}
        {paths.map((path, i) => (
          <motion.path
            key={`trace-${i}`}
            d={path.d}
            stroke="url(#circuit-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            custom={i}
            variants={pathVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        ))}

        {/* === Layer 3: Flowing particle overlay (appears after draw) === */}
        {showFlow && (
          <g opacity="0.7">
            {paths.map((path, i) => (
              <path
                key={`flow-${i}`}
                d={path.d}
                stroke="var(--brand-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="4 20"
                className="animate-circuit-flow"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </g>
        )}

        {/* === Layer 4: Node glow halos (behind nodes) === */}
        {nodes
          .filter((n) => n.pulse)
          .map((node, i) => (
            <motion.circle
              key={`halo-${i}`}
              cx={node.cx}
              cy={node.cy}
              r="14"
              fill="url(#node-halo-grad)"
              custom={i}
              variants={nodeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                animation: inView
                  ? `node-halo 3s ease-in-out ${i * 0.2}s infinite`
                  : "none",
              }}
            />
          ))}

        {/* === Layer 5: Hollow node rings === */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="5"
            fill="var(--bg-void)"
            stroke="url(#circuit-gradient)"
            strokeWidth="1.5"
            custom={i}
            variants={nodeVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        ))}

        {/* === Layer 6: Pulsing inner dots === */}
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
