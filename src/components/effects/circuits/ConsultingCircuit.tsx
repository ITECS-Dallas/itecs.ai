"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Two brains: AI brain (left, angular) feeds knowledge to a human brain
// (right, rounder) via a connecting bridge with pulsating nodes that
// create the visual impression of data flowing left → right.

const paths = [
  // ── AI brain — left side (geometric/angular) ──
  // Left hemisphere
  { d: "M 92 180 L 65 175 L 50 200 L 55 230 L 72 248 L 90 255" },
  // Right hemisphere
  { d: "M 108 180 L 120 178 L 132 200 L 128 230 L 115 248 L 110 255" },
  // Central fissure
  { d: "M 100 175 L 100 215 L 100 258" },
  // Internal cross-connections
  { d: "M 65 200 L 100 215 L 132 200" },
  { d: "M 55 230 L 100 235 L 128 230" },

  // ── Human brain — right side (rounder/organic) ──
  // Left hemisphere
  { d: "M 292 180 L 268 175 L 255 195 L 252 220 L 260 242 L 278 255 L 295 258" },
  // Right hemisphere
  { d: "M 308 180 L 328 178 L 340 195 L 345 220 L 338 242 L 322 255 L 305 258" },
  // Central fissure
  { d: "M 300 175 L 300 215 L 300 260" },
  // Internal cross-connections
  { d: "M 268 198 L 300 215 L 328 198" },
  { d: "M 260 235 L 300 240 L 338 235" },
  // Extra folds (more organic detail)
  { d: "M 255 195 L 265 210" },
  { d: "M 340 195 L 332 210" },

  // ── Knowledge bridge: AI → Human (pulsing flow line) ──
  { d: "M 132 215 L 155 215 L 175 215 L 195 215 L 215 215 L 235 215 L 255 215" },

  // ── Stem lines grounding both brains ──
  { d: "M 100 258 L 100 300" },
  { d: "M 300 260 L 300 300" },

  // ── Shared foundation ──
  { d: "M 100 300 L 200 330 L 300 300" },
];

const nodes = [
  // ── AI brain nodes ──
  { cx: 100, cy: 175, pulse: true },
  { cx: 65, cy: 175, pulse: false },
  { cx: 50, cy: 200, pulse: false },
  { cx: 55, cy: 230, pulse: false },
  { cx: 132, cy: 200, pulse: false },
  { cx: 128, cy: 230, pulse: false },
  { cx: 100, cy: 215, pulse: true },
  { cx: 100, cy: 258, pulse: false },

  // ── Human brain nodes ──
  { cx: 300, cy: 175, pulse: true },
  { cx: 268, cy: 175, pulse: false },
  { cx: 255, cy: 195, pulse: false },
  { cx: 252, cy: 220, pulse: false },
  { cx: 340, cy: 195, pulse: false },
  { cx: 345, cy: 220, pulse: false },
  { cx: 300, cy: 215, pulse: true },
  { cx: 300, cy: 260, pulse: false },

  // ── Knowledge bridge pulsing nodes (flow AI → Human) ──
  { cx: 155, cy: 215, pulse: true },
  { cx: 175, cy: 215, pulse: true },
  { cx: 195, cy: 215, pulse: true },
  { cx: 215, cy: 215, pulse: true },
  { cx: 235, cy: 215, pulse: true },

  // ── Stems ──
  { cx: 100, cy: 300, pulse: false },
  { cx: 300, cy: 300, pulse: false },

  // ── Shared foundation ──
  { cx: 200, cy: 330, pulse: true },
];

export function ConsultingCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
