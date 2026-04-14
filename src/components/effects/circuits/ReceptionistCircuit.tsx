"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Brain with communication signals flowing through it. Signal lines enter
// from multiple directions (incoming calls), weave through the brain's
// internal pathways, and exit as routed actions (booked, transferred, logged).
// Pulsing nodes along the signal paths create a "live traffic" feel.

const paths = [
  // ── Brain outline: left hemisphere ──
  { d: "M 195 100 L 155 95 L 120 120 L 100 165 L 105 220 L 125 265 L 160 290 L 195 300" },
  // ── Brain outline: right hemisphere ──
  { d: "M 205 100 L 245 95 L 280 120 L 300 165 L 295 220 L 275 265 L 240 290 L 205 300" },
  // ── Crown bridge ──
  { d: "M 195 100 L 200 90 L 205 100" },
  // ── Central fissure ──
  { d: "M 200 90 L 200 155 L 200 230 L 200 300" },
  // ── Brain stem ──
  { d: "M 200 300 L 200 350" },

  // ── Internal neural structure ──
  { d: "M 155 130 L 200 155 L 245 130" },
  { d: "M 120 180 L 200 195 L 280 180" },
  { d: "M 125 240 L 200 230 L 275 240" },

  // ── Signal line 1: incoming call from upper-left, through brain, exits lower-right ──
  { d: "M 40 70 L 80 100 L 120 120" },
  { d: "M 120 120 L 155 160 L 200 195" },
  { d: "M 200 195 L 250 230 L 280 265" },
  { d: "M 280 265 L 320 310 L 360 340" },

  // ── Signal line 2: incoming from upper-right, through brain, exits lower-left ──
  { d: "M 360 70 L 320 100 L 280 120" },
  { d: "M 280 120 L 245 160 L 200 195" },
  { d: "M 200 195 L 150 230 L 125 265" },
  { d: "M 125 265 L 80 310 L 40 340" },

  // ── Signal line 3: incoming from left, straight through center, exits right ──
  { d: "M 30 195 L 70 195 L 100 195" },
  { d: "M 100 195 L 150 195 L 200 195" },
  { d: "M 200 195 L 250 195 L 300 195" },
  { d: "M 300 195 L 340 195 L 370 195" },
];

const nodes = [
  // ── Brain outline nodes ──
  { cx: 200, cy: 90, pulse: true },
  { cx: 155, cy: 95, pulse: false },
  { cx: 120, cy: 120, pulse: false },
  { cx: 100, cy: 165, pulse: false },
  { cx: 105, cy: 220, pulse: false },
  { cx: 125, cy: 265, pulse: false },
  { cx: 160, cy: 290, pulse: false },
  { cx: 245, cy: 95, pulse: false },
  { cx: 280, cy: 120, pulse: false },
  { cx: 300, cy: 165, pulse: false },
  { cx: 295, cy: 220, pulse: false },
  { cx: 275, cy: 265, pulse: false },
  { cx: 240, cy: 290, pulse: false },
  { cx: 200, cy: 300, pulse: false },
  { cx: 200, cy: 350, pulse: false },

  // ── Central processing hub ──
  { cx: 200, cy: 195, pulse: true },
  { cx: 200, cy: 155, pulse: true },
  { cx: 200, cy: 230, pulse: true },

  // ── Signal 1 path nodes (upper-left → lower-right) ──
  { cx: 40, cy: 70, pulse: true },
  { cx: 80, cy: 100, pulse: true },
  { cx: 155, cy: 160, pulse: true },
  { cx: 250, cy: 230, pulse: true },
  { cx: 320, cy: 310, pulse: true },
  { cx: 360, cy: 340, pulse: true },

  // ── Signal 2 path nodes (upper-right → lower-left) ──
  { cx: 360, cy: 70, pulse: true },
  { cx: 320, cy: 100, pulse: true },
  { cx: 245, cy: 160, pulse: true },
  { cx: 150, cy: 230, pulse: true },
  { cx: 80, cy: 310, pulse: true },
  { cx: 40, cy: 340, pulse: true },

  // ── Signal 3 path nodes (left → right) ──
  { cx: 30, cy: 195, pulse: true },
  { cx: 70, cy: 195, pulse: true },
  { cx: 150, cy: 195, pulse: true },
  { cx: 250, cy: 195, pulse: true },
  { cx: 340, cy: 195, pulse: true },
  { cx: 370, cy: 195, pulse: true },
];

export function ReceptionistCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
