"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Closed-loop pipeline: sequential processing nodes with a feedback loop
// returning to the start. Represents "set it and forget it" automation —
// triggers, actions, checks, and re-entry.

const paths = [
  // Main pipeline: top-down sequential
  { d: "M 200 60 L 200 130" },
  { d: "M 200 130 L 280 190" },
  { d: "M 280 190 L 280 280" },
  { d: "M 280 280 L 200 340" },
  { d: "M 200 340 L 120 280" },
  { d: "M 120 280 L 120 190" },
  // Feedback loop: bottom back to top
  { d: "M 120 190 L 200 130" },
  // Side spurs: integrations branching off
  { d: "M 280 190 L 340 170" },
  { d: "M 120 280 L 60 300" },
  // Output tap at bottom
  { d: "M 200 340 L 200 420 L 200 470" },
];

const nodes = [
  // Trigger entry
  { cx: 200, cy: 60, pulse: true },
  // Pipeline nodes (hexagonal circuit path)
  { cx: 200, cy: 130, pulse: false },
  { cx: 280, cy: 190, pulse: true },
  { cx: 280, cy: 280, pulse: false },
  { cx: 200, cy: 340, pulse: false },
  { cx: 120, cy: 280, pulse: false },
  { cx: 120, cy: 190, pulse: true },
  // Integration spurs
  { cx: 340, cy: 170, pulse: false },
  { cx: 60, cy: 300, pulse: false },
  // Output
  { cx: 200, cy: 470, pulse: true },
];

export function AutomationCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
