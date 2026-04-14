"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Call routing tree: a single entry point at the top (incoming call) branches
// down through an AI decision node into three endpoints — calendar booking,
// live transfer, and voicemail/lead capture.

const paths = [
  // Incoming call descends to AI agent
  { d: "M 200 50 L 200 130 L 200 200" },
  // AI branches left: calendar booking
  { d: "M 200 200 L 120 260 L 80 320 L 80 400" },
  // AI branches center: live transfer
  { d: "M 200 200 L 200 280 L 200 360 L 200 430" },
  // AI branches right: lead capture
  { d: "M 200 200 L 280 260 L 320 320 L 320 400" },
  // Sub-branch: calendar confirmation
  { d: "M 80 320 L 40 350" },
  // Sub-branch: transfer to department
  { d: "M 200 360 L 160 380" },
  // Sub-branch: CRM log
  { d: "M 320 320 L 360 350" },
];

const nodes = [
  // Incoming call
  { cx: 200, cy: 50, pulse: true },
  // Ring / connect
  { cx: 200, cy: 130, pulse: false },
  // AI decision hub
  { cx: 200, cy: 200, pulse: true },
  // Branch midpoints
  { cx: 120, cy: 260, pulse: false },
  { cx: 280, cy: 260, pulse: false },
  // Calendar path
  { cx: 80, cy: 320, pulse: false },
  { cx: 80, cy: 400, pulse: true },
  { cx: 40, cy: 350, pulse: false },
  // Transfer path
  { cx: 200, cy: 360, pulse: false },
  { cx: 200, cy: 430, pulse: true },
  { cx: 160, cy: 380, pulse: false },
  // Lead capture path
  { cx: 320, cy: 320, pulse: false },
  { cx: 320, cy: 400, pulse: true },
  { cx: 360, cy: 350, pulse: false },
];

export function ReceptionistCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
