"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Search and retrieval tree: document sources on the left feed into a
// central vector store, and a query path enters from the right.
// The store retrieves and ranks, producing a cited answer at the bottom.

const paths = [
  // Document sources feeding in from upper-left
  { d: "M 60 80 L 120 140 L 180 200" },
  { d: "M 60 180 L 120 200 L 180 220" },
  { d: "M 60 280 L 120 260 L 180 240" },
  // Vector store hub (merge zone)
  { d: "M 180 200 L 200 220" },
  { d: "M 180 220 L 200 220" },
  { d: "M 180 240 L 200 220" },
  // Query enters from upper-right
  { d: "M 340 100 L 280 160 L 240 220 L 200 220" },
  // Retrieval and ranking descends
  { d: "M 200 220 L 200 300 L 200 360" },
  // Answer branches out
  { d: "M 200 360 L 140 420 L 140 460" },
  { d: "M 200 360 L 260 420 L 260 460" },
  // Citation links back to sources
  { d: "M 140 460 L 80 470" },
];

const nodes = [
  // Document sources
  { cx: 60, cy: 80, pulse: false },
  { cx: 60, cy: 180, pulse: false },
  { cx: 60, cy: 280, pulse: false },
  // Ingest midpoints
  { cx: 120, cy: 140, pulse: false },
  { cx: 120, cy: 200, pulse: false },
  { cx: 120, cy: 260, pulse: false },
  // Vector store hub
  { cx: 200, cy: 220, pulse: true },
  // Query path
  { cx: 340, cy: 100, pulse: true },
  { cx: 280, cy: 160, pulse: false },
  // Retrieval
  { cx: 200, cy: 300, pulse: false },
  { cx: 200, cy: 360, pulse: true },
  // Answer outputs
  { cx: 140, cy: 460, pulse: true },
  { cx: 260, cy: 460, pulse: true },
  // Citation
  { cx: 80, cy: 470, pulse: false },
];

export function KnowledgeBaseCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
