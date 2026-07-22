"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, Send, X } from "lucide-react";
import { CHAT_LIMITS, type IntelligenceResource } from "@/lib/intelligence/contract";
import styles from "./intelligence-os.module.css";
import type { IncidentController } from "./types";
import { useIntelligenceChat } from "./useIntelligenceChat";

interface TerminalAppProps {
  incident: IncidentController;
  compact?: boolean;
}

function ResourceCard({ resource }: { resource: IntelligenceResource }) {
  const external = resource.href.startsWith("http");
  const className = `${styles.chamferSmall} group block border border-[#7fb4d8]/25 bg-[#0a2134] p-3 transition-colors hover:border-[#7fb4d8]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]`;
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-[#7fb4d8]">{resource.eyebrow}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-500 transition-colors group-hover:text-[#7fb4d8]" aria-hidden="true" />
      </div>
      <p className="mt-1.5 text-xs font-semibold text-white">{resource.title}</p>
      <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{resource.summary}</p>
      {(resource.price || resource.meta) && (
        <p className="mt-2 font-mono text-[9px] text-[#a9d5f1]">{resource.price ?? resource.meta}</p>
      )}
    </>
  );

  return external ? (
    <a href={resource.href} target="_blank" rel="noreferrer" className={className}>{content}</a>
  ) : (
    <Link href={resource.href} className={className}>{content}</Link>
  );
}

export function TerminalApp({ incident, compact = false }: TerminalAppProps) {
  const [tab, setTab] = useState<"advisor" | "incident">("advisor");
  const [input, setInput] = useState("");
  const chat = useIntelligenceChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTab = incident.running ? "incident" : tab;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeTab, chat.pending, chat.turns, incident.terminalLines]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = input.trim();
    if (!message) return;
    setInput("");
    void chat.submit(message);
  };

  const chooseSuggestion = (suggestion: string) => {
    setInput("");
    void chat.submit(suggestion);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#7fb4d8]/20 pb-2">
        <div className="flex items-center gap-1 border border-[#7fb4d8]/20 bg-[#061728] p-1" role="tablist" aria-label="Terminal mode">
          {([
            ["advisor", "Live advisor"],
            ["incident", "Response trace"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={activeTab === value}
              onClick={() => setTab(value)}
              className={`${styles.chamferSmall} min-h-11 px-3 font-mono text-[10px] uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8] ${
                activeTab === value ? "bg-[#326189] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
          <span className={`h-2 w-2 rotate-45 ${
            activeTab === "advisor"
              ? "bg-emerald-400"
              : incident.awaitingApproval
                ? "bg-amber-400"
                : incident.paused
                  ? "bg-slate-400"
                  : incident.running
                    ? "bg-[#5ba8d8]"
                    : "bg-[#3288b6]"
          }`} aria-hidden="true" />
          {activeTab === "advisor"
            ? "Scope locked to ITECS"
            : incident.awaitingApproval
              ? "Authorization gate"
              : incident.paused
                ? "Response paused"
              : incident.running
                ? "Response active"
                : "Demo trace"}
        </span>
      </div>

      {activeTab === "incident" ? (
        <div className="flex min-h-0 flex-1 flex-col pt-3">
          <div className={`${styles.chamferSmall} mb-3 border border-amber-400/25 bg-amber-400/5 p-2.5 font-mono text-[9px] leading-relaxed text-amber-100`}>
            SYNTHETIC RESPONSE REHEARSAL — Commands and outcomes are illustrative. No client data or live systems are connected.
          </div>
          <div ref={scrollRef} className={`${styles.scrollArea} min-h-0 flex-1 overflow-y-auto bg-[#04111e] p-3 font-mono text-[10px] leading-relaxed`} aria-live="polite">
            {incident.terminalLines.map((line) => (
              <div key={line.id} className="mb-2 grid grid-cols-[78px_1fr] gap-2 border-b border-[#7fb4d8]/10 pb-2">
                <span className={
                  line.tone === "danger" ? "text-red-300" :
                  line.tone === "warning" ? "text-amber-300" :
                  line.tone === "success" ? "text-emerald-300" : "text-[#7fb4d8]"
                }>
                  [{line.label}]
                </span>
                <span className="text-slate-300">{line.text}</span>
              </div>
            ))}
            {!incident.running && !incident.completed && (
              <p className="text-slate-400">Run the scenario from SOC Response Command to stream its optional technical trace.</p>
            )}
            {incident.running && !incident.paused && !incident.awaitingApproval && (
              <span className={`${styles.bootCursor} inline-block h-3 w-1.5 bg-[#7fb4d8]`} aria-hidden="true" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col pt-3">
          {!compact && (
            <div className={`${styles.chamferSmall} mb-2 border border-[#7fb4d8]/20 bg-[#0a2134]/75 px-3 py-2 text-[10px] leading-relaxed text-slate-400`}>
              Questions are sent to OpenAI to generate answers. ITECS and this demo do not save the conversation; OpenAI may retain API data for abuse monitoring under its API policy. Do not submit confidential, regulated, personal, or other sensitive data. Verify final scope with ITECS.
            </div>
          )}
          <div ref={scrollRef} className={`${styles.scrollArea} min-h-0 flex-1 space-y-3 overflow-y-auto pr-1`} aria-live="polite" aria-label="ITECS AI conversation">
            {chat.turns.map((turn) => (
              <div key={turn.id} className={turn.role === "user" ? "ml-8" : "mr-3"}>
                <div className="mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#3288b6]" aria-hidden="true" />
                  {turn.role === "user" ? "You" : turn.kind === "system" ? "ITECS interface" : "ITECS AI advisor"}
                </div>
                <div className={`${styles.chamferSmall} border p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                  turn.role === "user"
                    ? "border-[#326189] bg-[#10324b] text-white"
                    : "border-[#7fb4d8]/20 bg-[#061728] text-slate-200"
                }`}>
                  {turn.content}
                </div>
                {turn.resources && turn.resources.length > 0 && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {turn.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
                  </div>
                )}
              </div>
            ))}

            {chat.pending && (
              <div className="mr-3">
                <div className="mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#7fb4d8]">
                  <Loader2 className="h-3 w-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  {chat.pending.status}
                </div>
                {chat.pending.content && (
                  <div className={`${styles.chamferSmall} border border-[#7fb4d8]/20 bg-[#061728] p-3 text-xs leading-relaxed whitespace-pre-wrap text-slate-200`}>
                    {chat.pending.content}
                    <span className={`${styles.bootCursor} ml-1 inline-block h-3 w-1 bg-[#7fb4d8]`} aria-hidden="true" />
                  </div>
                )}
                {chat.pending.resources.length > 0 && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {chat.pending.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
                  </div>
                )}
              </div>
            )}
          </div>

          {chat.error && (
            <div className="mt-2 flex items-start justify-between gap-2 border-l-2 border-red-400 bg-red-400/10 px-3 py-2 text-[10px] leading-relaxed text-red-100" role="alert">
              <span>{chat.error}</span>
              <button type="button" onClick={chat.clearError} className="shrink-0 text-red-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300" aria-label="Dismiss error">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}

          {chat.suggestions.length > 0 && !chat.isStreaming && (
            <div className={`${styles.scrollArea} mt-2 flex gap-2 overflow-x-auto pb-1`} aria-label="Suggested questions">
              {chat.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => chooseSuggestion(suggestion)}
                  className={`${styles.chamferSmall} min-h-8 shrink-0 border border-[#7fb4d8]/25 px-2.5 font-mono text-[9px] text-slate-300 hover:border-[#7fb4d8]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="mt-2 border-t border-[#7fb4d8]/20 pt-2">
            <label htmlFor="intelligence-advisor-input" className="sr-only">Ask about ITECS AI services and pricing</label>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <textarea
                  id="intelligence-advisor-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, CHAT_LIMITS.maxMessageCharacters))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  disabled={chat.isStreaming}
                  rows={compact ? 1 : 2}
                  maxLength={CHAT_LIMITS.maxMessageCharacters}
                  placeholder="Ask about an ITECS AI outcome, service, or price…"
                  className="block min-h-11 w-full resize-none border border-[#7fb4d8]/30 bg-[#04111e] px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-[#5ba8d8] disabled:opacity-60"
                />
                {!compact && <p className="mt-1 text-right font-mono text-[8px] text-slate-600">{input.length}/{CHAT_LIMITS.maxMessageCharacters}</p>}
              </div>
              <button
                type="submit"
                disabled={!input.trim() || chat.isStreaming}
                className={`${styles.chamferSmall} flex min-h-11 w-11 shrink-0 items-center justify-center bg-[#3288b6] text-white hover:bg-[#27759e] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb4d8]`}
                aria-label={chat.isStreaming ? "Advisor is responding" : "Send message"}
              >
                {chat.isStreaming ? <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
