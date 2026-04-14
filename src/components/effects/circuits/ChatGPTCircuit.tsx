"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Data funnel into a brain: multiple input streams converge into a central
// processing node, with a single output path. Represents ingesting company
// data, training a private model, and producing answers.

const paths = [
  // Left data stream
  { d: "M 60 460 L 60 360 L 120 300 L 160 240" },
  // Center data stream
  { d: "M 200 480 L 200 380 L 200 240" },
  // Right data stream
  { d: "M 340 460 L 340 360 L 280 300 L 240 240" },
  // Far-left document spur
  { d: "M 60 360 L 40 310" },
  // Far-right document spur
  { d: "M 340 360 L 360 310" },
  // Convergence into brain node
  { d: "M 160 240 L 200 200" },
  { d: "M 240 240 L 200 200" },
  // Output path rising from brain
  { d: "M 200 200 L 200 120 L 200 70" },
];

const nodes = [
  // Input sources
  { cx: 60, cy: 460, pulse: false },
  { cx: 200, cy: 480, pulse: false },
  { cx: 340, cy: 460, pulse: false },
  // Document spurs
  { cx: 40, cy: 310, pulse: false },
  { cx: 360, cy: 310, pulse: false },
  // Merge points
  { cx: 160, cy: 240, pulse: false },
  { cx: 240, cy: 240, pulse: false },
  // Brain / processing hub
  { cx: 200, cy: 200, pulse: true },
  // Intermediate
  { cx: 200, cy: 120, pulse: false },
  // Output: answers
  { cx: 200, cy: 70, pulse: true },
];

export function ChatGPTCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
