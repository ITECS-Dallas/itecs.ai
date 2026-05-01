"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Brain processing business data into an agent action. Data sources feed into
// the bottom of a brain, internal pathways process, and an output bubble
// emerges from the top.

const paths = [
  // ── Brain (draws first) ──
  // Left hemisphere
  { d: "M 145 235 L 115 230 L 100 255 L 105 285 L 120 305 L 142 315" },
  // Right hemisphere
  { d: "M 155 235 L 175 232 L 188 255 L 185 285 L 172 305 L 158 315" },
  // Central fissure
  { d: "M 150 232 L 150 270 L 150 318" },
  // Internal cross-connections
  { d: "M 115 255 L 150 270 L 188 255" },
  { d: "M 105 285 L 150 290 L 185 285" },

  // ── Data sources feeding into brain from below ──
  // Left source: documents
  { d: "M 50 470 L 70 430 L 95 390 L 115 350 L 120 305" },
  // Center source: database
  { d: "M 150 480 L 150 440 L 150 400 L 150 360 L 150 318" },
  // Right source: files
  { d: "M 250 470 L 230 430 L 205 390 L 185 350 L 172 305" },
  // Source spurs
  { d: "M 70 430 L 40 420" },
  { d: "M 230 430 L 260 420" },

  // ── Chat bubble output (emerges from brain top-right) ──
  // Stem from brain to bubble
  { d: "M 175 232 L 200 200 L 220 175" },
  // Bubble outline — rounded rectangle drawn as angular circuit segments
  // Bottom-left corner up
  { d: "M 220 175 L 215 140 L 220 105" },
  // Top edge left to right
  { d: "M 220 105 L 240 95 L 280 90 L 320 95 L 340 105" },
  // Right side down
  { d: "M 340 105 L 345 140 L 340 175" },
  // Bottom edge right to tail
  { d: "M 340 175 L 300 180 L 260 178 L 220 175" },

  // ── Response lines inside bubble (text/answer representation) ──
  { d: "M 235 120 L 325 120" },
  { d: "M 235 140 L 310 140" },
  { d: "M 235 158 L 295 158" },
];

const nodes = [
  // ── Brain nodes ──
  { cx: 150, cy: 232, pulse: true },
  { cx: 115, cy: 230, pulse: false },
  { cx: 100, cy: 255, pulse: true },
  { cx: 105, cy: 285, pulse: false },
  { cx: 175, cy: 232, pulse: false },
  { cx: 188, cy: 255, pulse: true },
  { cx: 185, cy: 285, pulse: false },
  { cx: 150, cy: 270, pulse: true },
  { cx: 150, cy: 318, pulse: false },

  // ── Data sources ──
  { cx: 50, cy: 470, pulse: false },
  { cx: 150, cy: 480, pulse: false },
  { cx: 250, cy: 470, pulse: false },
  // Midpoints
  { cx: 70, cy: 430, pulse: false },
  { cx: 150, cy: 400, pulse: false },
  { cx: 230, cy: 430, pulse: false },
  // Spurs
  { cx: 40, cy: 420, pulse: false },
  { cx: 260, cy: 420, pulse: false },

  // ── Bubble stem ──
  { cx: 200, cy: 200, pulse: true },
  { cx: 220, cy: 175, pulse: false },

  // ── Bubble corners ──
  { cx: 220, cy: 105, pulse: false },
  { cx: 340, cy: 105, pulse: false },
  { cx: 340, cy: 175, pulse: false },

  // ── Bubble top edge midpoints ──
  { cx: 280, cy: 90, pulse: true },

  // ── Response line endpoints (pulsing = "generating") ──
  { cx: 235, cy: 120, pulse: true },
  { cx: 325, cy: 120, pulse: false },
  { cx: 235, cy: 140, pulse: true },
  { cx: 310, cy: 140, pulse: false },
  { cx: 235, cy: 158, pulse: true },
  { cx: 295, cy: 158, pulse: false },
];

export function AIAgentsCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
