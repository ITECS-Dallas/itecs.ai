"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Retrieval tree with AI brain at center: document sources feed in from the
// left, a query enters from the right, both converge on a brain-shaped
// vector store hub. The brain processes and retrieves, producing cited
// answers at the bottom.

const paths = [
  // ── Brain at center (draws first — indices 0–4) ──
  // Left hemisphere
  { d: "M 197 195 L 178 192 L 168 210 L 172 232 L 186 245 L 198 248" },
  // Right hemisphere
  { d: "M 203 195 L 222 192 L 232 210 L 228 232 L 214 245 L 202 248" },
  // Central fissure
  { d: "M 200 193 L 200 220 L 200 250" },
  // Cross-connections
  { d: "M 178 210 L 200 220 L 222 210" },
  { d: "M 172 232 L 200 235 L 228 232" },

  // ── Document sources feeding in from left ──
  { d: "M 50 80 L 110 140 L 170 195" },
  { d: "M 50 220 L 110 220 L 168 220" },
  { d: "M 50 360 L 110 300 L 170 248" },

  // ── Query enters from upper-right ──
  { d: "M 350 100 L 290 150 L 235 195" },

  // ── Retrieval descends from brain base ──
  { d: "M 200 250 L 200 310 L 200 370" },

  // ── Answer branches out ──
  { d: "M 200 370 L 130 430 L 130 470" },
  { d: "M 200 370 L 270 430 L 270 470" },

  // ── Citation links back to sources ──
  { d: "M 130 470 L 70 480" },
];

const nodes = [
  // ── Brain nodes ──
  { cx: 200, cy: 193, pulse: true },
  { cx: 178, cy: 192, pulse: false },
  { cx: 168, cy: 210, pulse: true },
  { cx: 172, cy: 232, pulse: false },
  { cx: 222, cy: 192, pulse: false },
  { cx: 232, cy: 210, pulse: true },
  { cx: 228, cy: 232, pulse: false },
  { cx: 200, cy: 220, pulse: true },
  { cx: 200, cy: 250, pulse: true },

  // ── Document sources ──
  { cx: 50, cy: 80, pulse: false },
  { cx: 50, cy: 220, pulse: false },
  { cx: 50, cy: 360, pulse: false },

  // ── Ingest midpoints ──
  { cx: 110, cy: 140, pulse: false },
  { cx: 110, cy: 220, pulse: false },
  { cx: 110, cy: 300, pulse: false },

  // ── Query path ──
  { cx: 350, cy: 100, pulse: true },
  { cx: 290, cy: 150, pulse: false },

  // ── Retrieval ──
  { cx: 200, cy: 310, pulse: false },
  { cx: 200, cy: 370, pulse: true },

  // ── Answer outputs ──
  { cx: 130, cy: 470, pulse: true },
  { cx: 270, cy: 470, pulse: true },

  // ── Citation ──
  { cx: 70, cy: 480, pulse: false },
];

export function KnowledgeBaseCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
