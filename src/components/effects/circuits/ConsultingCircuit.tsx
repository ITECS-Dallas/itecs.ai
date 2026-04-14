"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Decision tree: central trunk splits into evaluated branches, converging to a "plan" node.
// Represents the consulting process — audit, evaluate options, converge on a strategy.

const paths = [
  // Central trunk rising from bottom
  { d: "M 200 480 L 200 320" },
  // Left evaluation branch
  { d: "M 200 320 L 140 270 L 140 180 L 160 130" },
  // Right evaluation branch
  { d: "M 200 320 L 260 270 L 260 180 L 240 130" },
  // Far-left discovery spur
  { d: "M 140 270 L 80 230 L 80 170" },
  // Far-right discovery spur
  { d: "M 260 270 L 320 230 L 320 170" },
  // Convergence: both main branches meet at the plan node
  { d: "M 160 130 L 200 80" },
  { d: "M 240 130 L 200 80" },
];

const nodes = [
  // Entry point (audit)
  { cx: 200, cy: 320, pulse: true },
  // Left branch nodes (evaluate)
  { cx: 140, cy: 270, pulse: false },
  { cx: 140, cy: 180, pulse: false },
  { cx: 160, cy: 130, pulse: true },
  // Right branch nodes (evaluate)
  { cx: 260, cy: 270, pulse: false },
  { cx: 260, cy: 180, pulse: false },
  { cx: 240, cy: 130, pulse: true },
  // Discovery spurs
  { cx: 80, cy: 170, pulse: false },
  { cx: 320, cy: 170, pulse: false },
  // Convergence: the plan
  { cx: 200, cy: 80, pulse: true },
];

export function ConsultingCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
