"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Network hub radiating to endpoints: one central knowledge hub with paths
// reaching out to multiple learner nodes. Represents a trainer distributing
// skills to a team — star topology with reinforcement feedback paths.

const paths = [
  // Central hub to top-left learner
  { d: "M 200 260 L 140 180 L 90 120" },
  // Central hub to top-right learner
  { d: "M 200 260 L 260 180 L 310 120" },
  // Central hub to left learner
  { d: "M 200 260 L 100 260 L 60 240" },
  // Central hub to right learner
  { d: "M 200 260 L 300 260 L 340 240" },
  // Central hub to bottom-left learner
  { d: "M 200 260 L 130 340 L 90 400" },
  // Central hub to bottom-right learner
  { d: "M 200 260 L 270 340 L 310 400" },
  // Knowledge source feeding hub from top
  { d: "M 200 60 L 200 140 L 200 260" },
  // Reinforcement feedback: two learners loop back
  { d: "M 90 120 L 130 80 L 200 60" },
  { d: "M 310 120 L 270 80 L 200 60" },
];

const nodes = [
  // Knowledge source
  { cx: 200, cy: 60, pulse: true },
  // Intermediate
  { cx: 200, cy: 140, pulse: false },
  // Central hub (trainer)
  { cx: 200, cy: 260, pulse: true },
  // Learner nodes
  { cx: 90, cy: 120, pulse: true },
  { cx: 310, cy: 120, pulse: true },
  { cx: 60, cy: 240, pulse: false },
  { cx: 340, cy: 240, pulse: false },
  { cx: 90, cy: 400, pulse: false },
  { cx: 310, cy: 400, pulse: false },
  // Branch midpoints
  { cx: 140, cy: 180, pulse: false },
  { cx: 260, cy: 180, pulse: false },
];

export function TrainingCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
