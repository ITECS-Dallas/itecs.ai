"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Release pipeline wrapped around a monitored AI runtime. The center loop
// represents prompt/model/data changes moving through controlled environments.

const paths = [
  // Release rail
  { d: "M 60 110 L 150 110 L 200 70 L 250 110 L 340 110" },
  { d: "M 60 250 L 140 250 L 185 210 L 215 210 L 260 250 L 340 250" },
  { d: "M 60 390 L 150 390 L 200 430 L 250 390 L 340 390" },

  // Environment spine
  { d: "M 200 70 L 200 160 L 200 210 L 200 300 L 200 430" },

  // Runtime control loop
  { d: "M 130 160 L 100 210 L 130 300 L 200 330 L 270 300 L 300 210 L 270 160 L 200 130 Z" },
  { d: "M 130 160 L 200 210 L 270 160" },
  { d: "M 100 210 L 200 250 L 300 210" },
  { d: "M 130 300 L 200 250 L 270 300" },

  // Monitoring and rollback taps
  { d: "M 300 210 L 365 190 L 385 170" },
  { d: "M 100 210 L 35 190 L 15 170" },
  { d: "M 200 330 L 200 365 L 155 390" },
  { d: "M 200 330 L 200 365 L 245 390" },
];

const nodes = [
  { cx: 60, cy: 110, pulse: true },
  { cx: 200, cy: 70, pulse: true },
  { cx: 340, cy: 110, pulse: false },
  { cx: 60, cy: 250, pulse: false },
  { cx: 200, cy: 210, pulse: true },
  { cx: 340, cy: 250, pulse: false },
  { cx: 60, cy: 390, pulse: false },
  { cx: 200, cy: 430, pulse: true },
  { cx: 340, cy: 390, pulse: false },
  { cx: 130, cy: 160, pulse: false },
  { cx: 270, cy: 160, pulse: false },
  { cx: 100, cy: 210, pulse: true },
  { cx: 300, cy: 210, pulse: true },
  { cx: 130, cy: 300, pulse: false },
  { cx: 270, cy: 300, pulse: false },
  { cx: 385, cy: 170, pulse: true },
  { cx: 15, cy: 170, pulse: true },
];

export function AIDevOpsCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
