"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Central content hub feeds outward to six answer-engine nodes (Google, ChatGPT,
// Claude, Perplexity, Gemini, Bing). Outgoing pulses signal AI extraction.

const center = { x: 200, y: 215 };

const ring = [
  { x: 200, y: 130, label: "Google" }, // top
  { x: 280, y: 170, label: "ChatGPT" }, // top-right
  { x: 300, y: 250, label: "Claude" }, // right
  { x: 240, y: 310, label: "Perplexity" }, // bottom-right
  { x: 160, y: 310, label: "Gemini" }, // bottom-left
  { x: 100, y: 250, label: "Bing" }, // left
  { x: 120, y: 170, label: "AI Overviews" }, // top-left
];

const paths = [
  // Center node ring (small hexagon)
  { d: "M 195 200 L 205 200 L 212 215 L 205 230 L 195 230 L 188 215 Z" },

  // Rays from center to each engine node
  ...ring.map((n) => ({
    d: `M ${center.x} ${center.y} L ${n.x} ${n.y}`,
  })),

  // Outer arc connecting engine nodes (suggests shared knowledge graph)
  {
    d: "M 120 170 Q 200 110 280 170",
  },
  {
    d: "M 280 170 Q 330 215 300 250",
  },
  {
    d: "M 300 250 Q 270 310 240 310",
  },
  {
    d: "M 160 310 Q 130 290 100 250",
  },
  {
    d: "M 100 250 Q 80 200 120 170",
  },
];

const nodes = [
  // Center content node (highlighted)
  { cx: center.x, cy: center.y, pulse: true },

  // Engine ring — all pulse to suggest active discovery
  ...ring.map((n) => ({ cx: n.x, cy: n.y, pulse: true })),

  // Mid-ray nodes (data flowing outward from center)
  ...ring.map((n) => ({
    cx: center.x + (n.x - center.x) * 0.5,
    cy: center.y + (n.y - center.y) * 0.5,
    pulse: true,
  })),
];

export function SEOCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
