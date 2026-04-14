"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

const heroPaths = [
  "M 200 500 L 200 300 L 180 250 L 180 150 L 180 80",
  "M 200 300 L 220 250 L 220 180 L 240 140 L 240 60",
  "M 200 350 L 160 300 L 160 200 L 150 150",
  "M 220 250 L 280 220 L 300 180",
  "M 160 300 L 120 270 L 100 220",
];

const heroNodes = [
  { cx: 180, cy: 80, pulse: true },
  { cx: 240, cy: 60, pulse: true },
  { cx: 150, cy: 150, pulse: true },
  { cx: 300, cy: 180, pulse: false },
  { cx: 100, cy: 220, pulse: false },
  { cx: 200, cy: 300, pulse: false },
];

function HeroCircuit() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const maxDrawTime = heroPaths.length * 0.2 + 2;
  const [showFlow, setShowFlow] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowFlow(true), maxDrawTime * 1000);
    return () => clearTimeout(timer);
  }, [inView, maxDrawTime]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 500"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="hero-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--brand-accent)" />
          <stop offset="100%" stopColor="var(--brand-purple)" />
        </linearGradient>
        <radialGradient id="hero-halo-grad">
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow underlayer */}
      <g filter="url(#hero-glow)" opacity="0.5">
        {heroPaths.map((d, i) => (
          <motion.path
            key={`glow-${i}`}
            d={d}
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

      {/* Crisp gradient traces */}
      {heroPaths.map((d, i) => (
        <motion.path
          key={`trace-${i}`}
          d={d}
          stroke="url(#hero-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={i}
          variants={pathVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      ))}

      {/* Flowing particles */}
      {showFlow && (
        <g opacity="0.7">
          {heroPaths.map((d, i) => (
            <path
              key={`flow-${i}`}
              d={d}
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

      {/* Node halos */}
      {heroNodes
        .filter((n) => n.pulse)
        .map((node, i) => (
          <motion.circle
            key={`halo-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="14"
            fill="url(#hero-halo-grad)"
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

      {/* Hollow nodes */}
      {heroNodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r="5"
          fill="var(--bg-void)"
          stroke="url(#hero-gradient)"
          strokeWidth="1.5"
          custom={i}
          variants={nodeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      ))}

      {/* Pulsing inner dots */}
      {heroNodes
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
  );
}

function SectionDivider() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const dividerPath =
    "M 0 20 L 400 20 L 420 10 L 500 10 L 520 20 L 680 20 L 700 30 L 780 30 L 800 20 L 1200 20";
  const dividerNodes = [
    { cx: 420, cy: 10 },
    { cx: 500, cy: 10 },
    { cx: 700, cy: 30 },
    { cx: 780, cy: 30 },
  ];

  const [showFlow, setShowFlow] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShowFlow(true), 2200);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 40"
      fill="none"
      className="w-full h-10"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="divider-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--brand-accent)" />
          <stop offset="100%" stopColor="var(--brand-purple)" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <g filter="url(#divider-glow)" opacity="0.5">
        <motion.path
          d={dividerPath}
          stroke="var(--brand-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      </g>

      {/* Crisp trace */}
      <motion.path
        d={dividerPath}
        stroke="url(#divider-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      />

      {/* Flowing particles */}
      {showFlow && (
        <path
          d={dividerPath}
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 20"
          opacity="0.7"
          className="animate-circuit-flow"
        />
      )}

      {/* Nodes */}
      {dividerNodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="var(--bg-void)"
          stroke="url(#divider-gradient)"
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
