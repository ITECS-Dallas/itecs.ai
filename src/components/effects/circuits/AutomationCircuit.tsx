"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Brain inside a closed-loop pipeline. The brain draws first (paths 0-4,
// lower stagger index), then the hexagonal pipeline traces around it.
// Represents AI intelligence powering an automated workflow loop.

const paths = [
  // ── Brain (draws first — indices 0–4) ──
  // Left hemisphere
  { d: "M 195 200 L 175 195 L 165 215 L 170 240 L 185 255 L 198 258" },
  // Right hemisphere
  { d: "M 205 200 L 225 195 L 235 215 L 230 240 L 215 255 L 202 258" },
  // Central fissure
  { d: "M 200 198 L 200 225 L 200 260" },
  // Cross-connections inside brain
  { d: "M 175 215 L 200 225 L 225 215" },
  { d: "M 170 240 L 200 245 L 230 240" },

  // ── Hexagonal pipeline loop (draws second — indices 5–10) ──
  // Top entry into loop
  { d: "M 200 60 L 200 130" },
  // Top-right leg
  { d: "M 200 130 L 300 180" },
  // Right leg descending
  { d: "M 300 180 L 300 290" },
  // Bottom-right to bottom center
  { d: "M 300 290 L 200 340" },
  // Bottom-left leg ascending
  { d: "M 200 340 L 100 290 L 100 180" },
  // Feedback: left leg back to top
  { d: "M 100 180 L 200 130" },

  // ── Integration spurs ──
  { d: "M 300 180 L 360 160" },
  { d: "M 100 290 L 40 310" },

  // ── Output tap ──
  { d: "M 200 340 L 200 420 L 200 470" },
];

const nodes = [
  // ── Brain nodes ──
  // Crown
  { cx: 200, cy: 198, pulse: true },
  // Left hemisphere
  { cx: 175, cy: 195, pulse: false },
  { cx: 165, cy: 215, pulse: true },
  { cx: 170, cy: 240, pulse: false },
  // Right hemisphere
  { cx: 225, cy: 195, pulse: false },
  { cx: 235, cy: 215, pulse: true },
  { cx: 230, cy: 240, pulse: false },
  // Brain base
  { cx: 200, cy: 260, pulse: true },
  // Cross-connection hubs
  { cx: 200, cy: 225, pulse: true },

  // ── Pipeline nodes ──
  // Trigger entry
  { cx: 200, cy: 60, pulse: true },
  // Loop vertices
  { cx: 200, cy: 130, pulse: false },
  { cx: 300, cy: 180, pulse: false },
  { cx: 300, cy: 290, pulse: false },
  { cx: 200, cy: 340, pulse: false },
  { cx: 100, cy: 290, pulse: false },
  { cx: 100, cy: 180, pulse: false },

  // Integration spurs
  { cx: 360, cy: 160, pulse: false },
  { cx: 40, cy: 310, pulse: false },

  // Output
  { cx: 200, cy: 470, pulse: true },
];

export function AutomationCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
