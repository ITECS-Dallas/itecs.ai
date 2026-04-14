"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Radar / scanning grid: a central scanner node with radial paths reaching
// outward to data endpoints. Represents systematically scanning an
// environment — connecting, scanning, analyzing, and reporting.

const paths = [
  // Central scanner to top
  { d: "M 200 250 L 200 160 L 200 80" },
  // Central to upper-right
  { d: "M 200 250 L 280 190 L 340 120" },
  // Central to right
  { d: "M 200 250 L 300 250 L 360 250" },
  // Central to lower-right
  { d: "M 200 250 L 280 310 L 340 380" },
  // Central to bottom
  { d: "M 200 250 L 200 340 L 200 420" },
  // Central to lower-left
  { d: "M 200 250 L 120 310 L 60 380" },
  // Central to left
  { d: "M 200 250 L 100 250 L 40 250" },
  // Central to upper-left
  { d: "M 200 250 L 120 190 L 60 120" },
  // Inner ring connections (partial)
  { d: "M 200 160 L 280 190" },
  { d: "M 120 190 L 200 160" },
];

const nodes = [
  // Central scanner
  { cx: 200, cy: 250, pulse: true },
  // Inner ring
  { cx: 200, cy: 160, pulse: false },
  { cx: 280, cy: 190, pulse: false },
  { cx: 300, cy: 250, pulse: false },
  { cx: 280, cy: 310, pulse: false },
  { cx: 200, cy: 340, pulse: false },
  { cx: 120, cy: 310, pulse: false },
  { cx: 100, cy: 250, pulse: false },
  { cx: 120, cy: 190, pulse: false },
  // Outer endpoints (data sources found)
  { cx: 200, cy: 80, pulse: true },
  { cx: 340, cy: 120, pulse: true },
  { cx: 360, cy: 250, pulse: false },
  { cx: 340, cy: 380, pulse: true },
  { cx: 200, cy: 420, pulse: false },
  { cx: 60, cy: 380, pulse: true },
  { cx: 40, cy: 250, pulse: false },
  { cx: 60, cy: 120, pulse: true },
];

export function DataAuditCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
