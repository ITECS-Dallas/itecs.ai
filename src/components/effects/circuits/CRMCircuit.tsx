"use client";

import { ServiceCircuit } from "@/components/effects/ServiceCircuit";

// Pipeline through an AI brain: leads enter from the top as raw data streams,
// flow into a brain-shaped AI processing zone in the center (research, score,
// draft), then exit the bottom as qualified, closed deals.

const paths = [
  // ── Lead input streams (top) ──
  { d: "M 120 40 L 160 90 L 190 120" },
  { d: "M 200 30 L 200 120" },
  { d: "M 280 40 L 240 90 L 210 120" },

  // ── Brain outline: left hemisphere ──
  { d: "M 190 120 L 130 140 L 90 180 L 80 230 L 90 280 L 130 310 L 180 330" },

  // ── Brain outline: right hemisphere ──
  { d: "M 210 120 L 270 140 L 310 180 L 320 230 L 310 280 L 270 310 L 220 330" },

  // ── Central fissure through brain ──
  { d: "M 200 120 L 200 180 L 200 250 L 200 330" },

  // ── Left internal processing (research → score) ──
  { d: "M 130 140 L 150 190 L 140 250" },
  { d: "M 140 250 L 160 290" },

  // ── Right internal processing (draft → outreach) ──
  { d: "M 270 140 L 250 190 L 260 250" },
  { d: "M 260 250 L 240 290" },

  // ── Cross-hemisphere synapses ──
  { d: "M 150 190 L 200 180 L 250 190" },
  { d: "M 140 250 L 200 250 L 260 250" },

  // ── Brain bottom merges to pipeline exit ──
  { d: "M 180 330 L 200 340 L 220 330" },

  // ── Output pipeline: qualified deals ──
  { d: "M 200 340 L 200 400 L 200 460" },

  // ── Side exit: disqualified leads ──
  { d: "M 260 250 L 330 260 L 360 280" },
];

const nodes = [
  // Lead sources (raw input)
  { cx: 120, cy: 40, pulse: false },
  { cx: 200, cy: 30, pulse: false },
  { cx: 280, cy: 40, pulse: false },

  // Entry funnel
  { cx: 160, cy: 90, pulse: false },
  { cx: 240, cy: 90, pulse: false },

  // Brain top (entry gates)
  { cx: 190, cy: 120, pulse: false },
  { cx: 200, cy: 120, pulse: false },
  { cx: 210, cy: 120, pulse: false },

  // Left hemisphere outline
  { cx: 130, cy: 140, pulse: false },
  { cx: 90, cy: 180, pulse: false },
  { cx: 80, cy: 230, pulse: false },
  { cx: 90, cy: 280, pulse: false },
  { cx: 130, cy: 310, pulse: false },

  // Right hemisphere outline
  { cx: 270, cy: 140, pulse: false },
  { cx: 310, cy: 180, pulse: false },
  { cx: 320, cy: 230, pulse: false },
  { cx: 310, cy: 280, pulse: false },
  { cx: 270, cy: 310, pulse: false },

  // Left internal activity (research, score)
  { cx: 150, cy: 190, pulse: true },
  { cx: 140, cy: 250, pulse: true },

  // Right internal activity (draft, outreach)
  { cx: 250, cy: 190, pulse: true },
  { cx: 260, cy: 250, pulse: true },

  // Central fissure hubs
  { cx: 200, cy: 180, pulse: true },
  { cx: 200, cy: 250, pulse: true },

  // Brain bottom merge
  { cx: 200, cy: 340, pulse: true },

  // Pipeline output (closed deals)
  { cx: 200, cy: 400, pulse: false },
  { cx: 200, cy: 460, pulse: true },

  // Disqualified exit
  { cx: 360, cy: 280, pulse: false },
];

export function CRMCircuit() {
  return <ServiceCircuit paths={paths} nodes={nodes} />;
}
