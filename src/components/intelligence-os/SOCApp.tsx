"use client";

import { RotateCcw, ShieldAlert, ShieldCheck, Zap } from "lucide-react";
import styles from "./intelligence-os.module.css";
import type { DemoNodeState, IncidentController } from "./types";

interface SOCAppProps {
  incident: IncidentController;
  onRun: () => void;
  compact?: boolean;
}

const nodeColors: Record<DemoNodeState, string> = {
  healthy: "#22c55e",
  "at-risk": "#ef4444",
  isolated: "#f59e0b",
  recovering: "#5ba8d8",
};

const severityClasses = {
  INFO: "border-[#5ba8d8]/35 bg-[#5ba8d8]/10 text-[#a9d5f1]",
  MEDIUM: "border-amber-400/35 bg-amber-400/10 text-amber-200",
  HIGH: "border-orange-400/40 bg-orange-400/10 text-orange-200",
  CRITICAL: "border-red-400/45 bg-red-400/10 text-red-200",
  RESOLVED: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
} as const;

export function SOCApp({ incident, onRun, compact = false }: SOCAppProps) {
  const elapsed = `${Math.floor(incident.elapsedMs / 1_000)
    .toString()
    .padStart(2, "0")}.${Math.floor((incident.elapsedMs % 1_000) / 100)}`;
  const activeColor = nodeColors[incident.nodeState];
  const showThreat = incident.phase !== "idle" && incident.phase !== "resolved";

  return (
    <div className={`flex h-full min-h-0 flex-col ${compact ? "gap-2" : "gap-3"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#7fb4d8]/20 pb-2">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7fb4d8]">
            <span className="h-2 w-2 rotate-45 bg-[#3288b6]" aria-hidden="true" />
            Scripted demo · not live telemetry
          </div>
          {!compact && (
            <p className="mt-1 text-xs text-slate-400">
              A deterministic rehearsal of AI-assisted containment with human review.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(incident.running || incident.completed) && (
            <button
              type="button"
              onClick={incident.reset}
              className={`${styles.chamferSmall} inline-flex min-h-9 items-center gap-1.5 border border-[#7fb4d8]/25 px-3 font-mono text-[10px] uppercase tracking-wide text-slate-300 hover:border-[#7fb4d8]/55 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]`}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onRun}
            disabled={incident.running}
            className={`${styles.chamferSmall} inline-flex min-h-9 items-center gap-1.5 bg-[#3288b6] px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-white hover:bg-[#27759e] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb4d8]`}
          >
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            {incident.running ? `Running ${elapsed}s` : incident.completed ? "Replay incident" : "Run incident"}
          </button>
        </div>
      </div>

      <div className={`grid min-h-0 flex-1 gap-3 ${compact ? "grid-cols-[1.05fr_.95fr]" : "xl:grid-cols-[1.15fr_.85fr]"}`}>
        <div className="flex min-h-0 flex-col gap-3">
          <section
            className={`${styles.chamferSmall} relative min-h-[150px] flex-1 overflow-hidden border border-[#7fb4d8]/20 bg-[#061728]/80 p-3`}
            aria-labelledby="threat-map-title"
          >
            <div className="absolute left-3 top-3 z-10">
              <h3 id="threat-map-title" className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                Demo signal map
              </h3>
              <p className="mt-1 font-mono text-[9px] text-slate-500">Abstract topology · illustrative locations</p>
            </div>
            <svg
              viewBox="0 0 620 250"
              className="h-full min-h-[130px] w-full"
              role="img"
              aria-labelledby="threat-map-svg-title threat-map-svg-description"
            >
              <title id="threat-map-svg-title">Scripted threat signal route</title>
              <desc id="threat-map-svg-description">
                An abstract grid shows a simulated inbound signal routed toward the demo finance endpoint.
              </desc>
              <g stroke="#163b55" strokeWidth="1" fill="none" opacity="0.8">
                <path d="M25 66 L155 36 L257 76 L380 44 L575 78" />
                <path d="M44 192 L185 160 L290 207 L448 165 L590 195" />
                <path d="M155 36 L185 160 M257 76 L290 207 M380 44 L448 165" />
              </g>
              <g fill="#0d2a40" stroke="#326189" strokeWidth="1.5">
                <polygon points="155,25 170,36 155,47 140,36" />
                <polygon points="257,65 272,76 257,87 242,76" />
                <polygon points="380,33 395,44 380,55 365,44" />
                <polygon points="185,149 200,160 185,171 170,160" />
                <polygon points="448,154 463,165 448,176 433,165" />
              </g>
              <g fill="#7fb4d8" fontFamily="var(--font-mono)" fontSize="10" opacity="0.8">
                <text x="130" y="18">EDGE</text>
                <text x="231" y="58">IDENTITY</text>
                <text x="355" y="26">CLOUD</text>
                <text x="153" y="188">OPS</text>
                <text x="417" y="193">FINANCE</text>
              </g>
              {showThreat && (
                <path
                  d="M602 110 C540 90 512 112 470 146 C458 155 454 160 448 165"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  className={styles.threatPath}
                />
              )}
              <polygon
                points="448,141 472,165 448,189 424,165"
                fill={`${activeColor}22`}
                stroke={activeColor}
                strokeWidth="2"
              />
              {(incident.nodeState === "at-risk" || incident.nodeState === "recovering") && (
                <rect
                  x="440"
                  y="157"
                  width="16"
                  height="16"
                  fill="none"
                  stroke={activeColor}
                  className={styles.pulse}
                />
              )}
            </svg>
          </section>

          {!compact && (
            <section className={`${styles.chamferSmall} border border-[#7fb4d8]/20 bg-[#061728]/80 p-3`}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">Endpoint topology</h3>
                <span className="font-mono text-[9px] uppercase text-slate-500">6 demo nodes</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {["EDGE-01", "ID-04", "CRM-12", "OPS-08", "FIN-WS-27", "DB-03"].map((node) => {
                  const isFocus = node === "FIN-WS-27";
                  const color = isFocus ? activeColor : "#22c55e";
                  return (
                    <div key={node} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                      <span
                        className={`${styles.hex} flex h-8 w-8 items-center justify-center border bg-[#0a2033]`}
                        style={{ borderColor: color }}
                        aria-hidden="true"
                      >
                        <span className="h-2 w-2 rotate-45" style={{ backgroundColor: color }} />
                      </span>
                      <span className="truncate font-mono text-[8px] text-slate-400">{node}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <section className={`${styles.chamferSmall} flex min-h-0 flex-col border border-[#7fb4d8]/20 bg-[#061728]/80 p-3`}>
          <div className="border-b border-[#7fb4d8]/15 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-start gap-2">
                {incident.phase === "resolved" ? (
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                ) : (
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#7fb4d8]" aria-hidden="true" />
                )}
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{incident.phase}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-200" aria-live="polite">{incident.status}</p>
                </div>
              </div>
              <span className="font-mono text-xs tabular-nums text-[#7fb4d8]">{elapsed}s</span>
            </div>
            <div className="mt-3 h-1.5 bg-[#102d43]" aria-label={`${incident.progress}% complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={incident.progress}>
              <div
                className={`${incident.running ? styles.progressSheen : ""} h-full bg-[#3288b6] transition-[width] duration-300`}
                style={{ width: `${incident.progress}%` }}
              />
            </div>
          </div>
          <div className={`${styles.scrollArea} min-h-0 flex-1 space-y-2 overflow-y-auto pt-3`} aria-label="Simulation event feed">
            {incident.feed.map((item) => (
              <article key={item.id} className="border-l-2 border-[#326189] bg-[#0b2235]/80 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`${styles.chamferSmall} border px-1.5 py-0.5 font-mono text-[8px] font-semibold ${severityClasses[item.severity]}`}>
                    {item.severity}
                  </span>
                  <time className="font-mono text-[9px] text-slate-500">{item.time}</time>
                </div>
                <h4 className="mt-2 text-xs font-semibold text-white">{item.title}</h4>
                {!compact && <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{item.detail}</p>}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
