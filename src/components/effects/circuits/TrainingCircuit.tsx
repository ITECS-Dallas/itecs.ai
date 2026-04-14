"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Brain: two hemispheres traced with angular circuit paths, internal neural
// cross-connections, a brain stem at the bottom, and pulsing nodes at
// activity centers. Represents knowledge flowing through a trained mind.

const paths = [
  // ── Brain stem ──
  { d: "M 200 460 L 200 390" },

  // ── Left hemisphere outline (bottom → top) ──
  { d: "M 200 390 L 150 350 L 100 290 L 80 220 L 85 150 L 120 95 L 170 70 L 195 65" },

  // ── Right hemisphere outline (bottom → top) ──
  { d: "M 200 390 L 250 350 L 300 290 L 320 220 L 315 150 L 280 95 L 230 70 L 205 65" },

  // ── Crown bridge ──
  { d: "M 195 65 L 200 55 L 205 65" },

  // ── Central fissure (vertical midline) ──
  { d: "M 200 390 L 200 280 L 200 170 L 200 55" },

  // ── Left internal neural pathways ──
  { d: "M 150 350 L 155 270 L 135 190" },
  { d: "M 135 190 L 120 130" },

  // ── Right internal neural pathways ──
  { d: "M 250 350 L 245 270 L 265 190" },
  { d: "M 265 190 L 280 130" },

  // ── Cross-hemisphere connections (synapses) ──
  { d: "M 155 270 L 200 280 L 245 270" },
  { d: "M 135 190 L 200 170 L 265 190" },
  { d: "M 120 130 L 200 120 L 280 130" },
];

const nodes = [
  // Brain stem base
  { cx: 200, cy: 460, pulse: false },
  // Brain stem / medulla junction
  { cx: 200, cy: 390, pulse: false },

  // Left hemisphere outline
  { cx: 150, cy: 350, pulse: false },
  { cx: 100, cy: 290, pulse: false },
  { cx: 80, cy: 220, pulse: false },
  { cx: 85, cy: 150, pulse: false },
  { cx: 120, cy: 95, pulse: false },
  { cx: 170, cy: 70, pulse: false },

  // Right hemisphere outline
  { cx: 250, cy: 350, pulse: false },
  { cx: 300, cy: 290, pulse: false },
  { cx: 320, cy: 220, pulse: false },
  { cx: 315, cy: 150, pulse: false },
  { cx: 280, cy: 95, pulse: false },
  { cx: 230, cy: 70, pulse: false },

  // Crown
  { cx: 200, cy: 55, pulse: true },

  // Left internal activity centers
  { cx: 155, cy: 270, pulse: true },
  { cx: 135, cy: 190, pulse: true },
  { cx: 120, cy: 130, pulse: true },

  // Right internal activity centers
  { cx: 245, cy: 270, pulse: true },
  { cx: 265, cy: 190, pulse: true },
  { cx: 280, cy: 130, pulse: true },

  // Central fissure midpoints (synaptic hubs)
  { cx: 200, cy: 280, pulse: true },
  { cx: 200, cy: 170, pulse: true },
  { cx: 200, cy: 120, pulse: false },
];

export function TrainingCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
