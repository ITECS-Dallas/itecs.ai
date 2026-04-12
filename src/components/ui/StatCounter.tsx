"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const isFloat = value % 1 !== 0;
    const steps = 60;
    const stepDuration = (duration * 1000) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isFloat ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-5xl md:text-7xl font-thin tracking-[-0.04em] text-brand-accent">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium tracking-[0.05em] uppercase text-text-dim">
        {label}
      </div>
    </div>
  );
}
