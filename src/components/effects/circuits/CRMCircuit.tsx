"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Sales funnel: wide entry at top narrowing through scoring and qualification
// nodes to a close point at the bottom. Represents leads entering a CRM,
// being researched, scored, and converted.

const paths = [
  // Wide lead entry — three sources at top
  { d: "M 80 60 L 120 130" },
  { d: "M 200 50 L 200 130" },
  { d: "M 320 60 L 280 130" },
  // First convergence: research
  { d: "M 120 130 L 160 200" },
  { d: "M 200 130 L 200 200" },
  { d: "M 280 130 L 240 200" },
  // Second convergence: scoring
  { d: "M 160 200 L 180 270" },
  { d: "M 200 200 L 200 270" },
  { d: "M 240 200 L 220 270" },
  // Narrow to outreach
  { d: "M 180 270 L 200 340" },
  { d: "M 220 270 L 200 340" },
  // Final: close
  { d: "M 200 340 L 200 420 L 200 470" },
  // Side spur: disqualified leads exit
  { d: "M 220 270 L 300 290 L 340 310" },
];

const nodes = [
  // Lead sources
  { cx: 80, cy: 60, pulse: false },
  { cx: 200, cy: 50, pulse: false },
  { cx: 320, cy: 60, pulse: false },
  // Research stage
  { cx: 120, cy: 130, pulse: false },
  { cx: 200, cy: 130, pulse: true },
  { cx: 280, cy: 130, pulse: false },
  // Scoring stage
  { cx: 160, cy: 200, pulse: false },
  { cx: 200, cy: 200, pulse: true },
  { cx: 240, cy: 200, pulse: false },
  // Outreach
  { cx: 180, cy: 270, pulse: false },
  { cx: 220, cy: 270, pulse: false },
  // Close
  { cx: 200, cy: 340, pulse: true },
  { cx: 200, cy: 470, pulse: true },
  // Disqualified exit
  { cx: 340, cy: 310, pulse: false },
];

export function CRMCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
