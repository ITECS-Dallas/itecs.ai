"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ABOUT_MILESTONES } from "@/lib/constants";

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" as const },
  },
};

function TimelineNode({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof ABOUT_MILESTONES)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Vertical line + node column */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Animated connector line (above the node) */}
        {index > 0 && (
          <svg
            className="w-px h-8 md:h-12 overflow-visible"
            viewBox="0 0 2 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="48"
              stroke="var(--brand-accent)"
              strokeWidth="1.5"
              variants={lineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          </svg>
        )}

        {/* Glowing node */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          variants={nodeVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute w-10 h-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
            }}
            animate={
              inView
                ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Node circle */}
          <div className="w-4 h-4 rounded-full border-2 border-brand-accent bg-bg-void relative z-10">
            <motion.div
              className="absolute inset-[3px] rounded-full bg-brand-accent"
              animate={
                inView
                  ? { opacity: [0.4, 1, 0.4] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Trailing line below node (except last) */}
        {!isLast && (
          <svg
            className="w-px flex-1 min-h-[40px] overflow-visible"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="var(--brand-accent)"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              variants={lineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <motion.div
        className="pb-10 md:pb-14 pt-0"
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
      >
        <span className="inline-block font-mono text-sm tracking-[0.08em] text-brand-accent mb-2">
          {milestone.year}
        </span>
        <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] text-text-primary mb-3">
          {milestone.title}
        </h3>
        <p className="text-text-secondary leading-relaxed max-w-lg">
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

export function AboutTimeline() {
  return (
    <section id="timeline" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4">
            Our Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-text-primary">
            22 Years of Building Trust
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            From a two-person helpdesk to a full-service AI consultancy — every milestone built on the one before it.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto md:ml-[20%]">
          {ABOUT_MILESTONES.map((milestone, i) => (
            <TimelineNode
              key={milestone.year}
              milestone={milestone}
              index={i}
              isLast={i === ABOUT_MILESTONES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
