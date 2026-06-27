# EPIC: ITECS Intelligence OS — Interactive Site Demo

**Target codebase:** itecs.ai (Next.js App Router, React, Tailwind) — an **AI-focused** property. No Promus / generic cloud-hosting content belongs in this demo.
**Build mode:** Mostly client-side. The AI Terminal's free-form Q&A is powered by a **real LLM via a server-side proxy route** with strict guardrails (mirroring the existing itecsonline.com chatbot pattern). The security incident choreography is **scripted and deterministic**. No API keys ever exposed client-side.
**Owner:** Brian Desmot
**Status:** Spec for Claude Code execution (v2 — AI-first revision)

---

## 1. VISION

Embed an interactive, branded "operating system" inside itecs.ai. A prospect clicks a button and a full desktop environment **grows out of that button** (genie/scale animation) into a large windowed surface over a dimmed, blurred site. Every app dramatizes a real ITECS **AI / Managed Intelligence** capability.

Two connected headliners anchor it:
- A **SOC Operations Center** and a **real, guardrailed AI Terminal** that act as one system during a choreographed incident-response sequence (the marquee WOW moment).
- The same AI Terminal also answers visitor questions live — scope-locked to ITECS AI services.

Supporting apps round out the experience, including a working **AI Solution Configurator**.

The goal is twofold:
1. **WOW / theater** — flashy, branded, unmistakably ITECS; the visitor feels they looked inside ITECS's own AI operations.
2. **Functional proof** — the AI Terminal is genuinely live, and the Configurator is a real scoping tool.

Reference inspiration: viral "AI builds an OS in a single file" demos — but elevated, branded, and on-message.

---

## 2. SUCCESS CRITERIA

- The spawn animation reads as the OS materializing *from inside the page*, not a page navigation.
- A first-time visitor can trigger "The Incident" and watch the SOC + AI act as one connected system, end to end, with one click — and it plays identically every time.
- The AI Terminal answers real visitor questions about ITECS AI services, and **refuses gracefully and on-brand** for anything out of scope.
- The AI Solution Configurator produces a coherent scoped brief + estimate and a clear next step.
- Visually indistinguishable from a first-party itecs.ai surface (design tokens below). Reads as premium and "flashy" without feeling gimmicky.
- Smooth on a mid-range laptop; degrades gracefully on mobile; respects `prefers-reduced-motion`.
- The only network dependency is the guardrailed AI Q&A endpoint; everything else (shell, incident, configurator UI) runs client-side.

---

## 3. DESIGN SYSTEM (HARD CONSTRAINTS — pulled from live itecs.ai)

The OS environment is **dark** (navy), even though the public site canvas is light. Treat the desktop like a pro dark-mode tool: navy environment, light text, translucent cards, the existing accent ramp for highlights. Mono font carries all telemetry/terminal UI.

**Colors**
```
--itecs-navy:        #0A1622   /* desktop / deepest background */
--itecs-navy-2:      #08182A   /* panel fills */
--itecs-navy-3:      #06314C   /* raised surfaces */
--itecs-blue:        #004775   /* primary brand / buttons */
--itecs-blue-bright: #3288B6   /* accents, active glows */
--itecs-blue-light:  #5BA8D8
--itecs-blue-pale:   #7FB4D8
--itecs-steel:       #326189
--accent-text:       #1A6691
--canvas:            #F3F6F9   /* light surfaces if needed */
--card:              #FFFFFF
--hairline:          #DBE3EB
--ink:               #0A1622
--ink-body:          #566876
--ink-muted:         #62717E
--ink-faint:         #879199
--heritage-amber:    #C8862B   /* "Since 2002" warm accent — use sparingly */
--success:           #15803D
--warning:           #B45309
--danger:            #C8433C
/* data-viz ramp */  #004775  #3288B6  #5BA8D8  #1F9D57  #326189
--gradient-intelligence: linear-gradient(120deg, #004775 0%, #3288B6 100%);
--glow-hero: radial-gradient(60% 50% at 70% 20%, #3288B614 0%, #0047750A 40%, transparent 70%);
```
In the dark OS context, invert text: light foreground (#F3F6F9 / rgba white) on navy; use the blue ramp for accents and `--gradient-intelligence` for hero/branded moments. `--success`/`--danger`/`--warning` drive SOC status states.

**Typography**
- Display / headings: **Space Grotesk**
- Body / UI: **IBM Plex Sans**
- Telemetry, terminal, code, metrics: **IBM Plex Mono**
- Weights: 400 / 500 / 600 / 700

**Motion**
- Durations: fast .12s, base .2s, slow .32s, slower .56s
- Primary easing: `cubic-bezier(.16, 1, .3, 1)`
- Prefer Framer Motion (already used on the site).

**Geometry**
- Radii: 8 / 12 / 16 / 24px, pill 999px
- Layered dark shadows for floating windows.

---

## 4. ARCHITECTURE

- A single React module that drops into the existing site (e.g. `<IntelligenceOS />` plus an `OSProvider` for window state). Lazy-loaded so it doesn't bloat initial page weight.
- A lightweight **window manager**: open/close/focus/minimize/maximize, z-index stacking, drag, resize. Each "app" is an independent component registered with the manager — adding apps later must not require touching the shell.
- **AI Q&A backend:** a server-side API route (Next.js route handler) proxies to the LLM provider. The API key lives server-side only. The route enforces the guardrails in Story 5b. This is the single network dependency.
- **The Incident is client-side and scripted** — it must not depend on the live model or the network.
- App content, scripts, and incident choreography live in plain data/config for easy tuning.
- In-memory state only; no localStorage/sessionStorage.

---

## 5. STORIES

### Story 1 — OS Shell & Window Manager
Navy desktop with a subtle `--glow-hero` ambiance, a top menu/status bar (ITECS mark, faux clock, system status pill), and a dock/taskbar of launchable apps. Generic window component: title bar, traffic-light controls, drag, resize, focus-on-click, minimize-to-dock. Windows feel weighty and smooth.
*Acceptance:* multiple windows open/drag/stack/focus/minimize/close; shell is on-brand.

### Story 2 — Spawn ("Genie") Animation
A trigger button animates the entire OS open *from the button's position and size* into a large near-fullscreen modal over a dimmed + blurred site backdrop. Closing reverses cleanly back into the button. FLIP/shared-element approach (origin = button, not screen center). `prefers-reduced-motion` → simple fade.
*Acceptance:* the OS visibly emerges from the button; reverses on close; reduced-motion path exists.

### Story 3 — Boot Sequence (flair, keep short)
~1.5–2.5s branded boot: ITECS mark, a mono "initializing modules…" log, progress to desktop. Skippable on click. Plays once per open.
*Acceptance:* short, skippable, on-brand.

### Story 4 — SOC Operations Center (Headliner A)
Security-operations console containing: (a) a stylized **threat map** with animated inbound vectors, (b) a **network topology** of nodes/links that change state (healthy → at-risk → quarantined → restored), and (c) a scrolling **incident feed** with severity tags (Critical/High/Medium/Low). Idle = calm and green. Expose hooks so the Incident choreography (Story 6) can drive node states and feed entries.
*Acceptance:* idle SOC looks alive and healthy; topology + feed are programmatically drivable; severity styling matches palette.

### Story 5 — ITECS AI Terminal (Headliner B) — REAL, GUARDRAILED
One terminal window serving **two roles**:
1. **Incident track (scripted):** when The Incident runs, the terminal displays deterministic, pre-authored agent narration and drives SOC state. No live model involved here — reliability is mandatory.
2. **Live Q&A (real LLM):** outside the incident, the visitor can type questions and get **real, streamed** answers via the server-side proxy (Story 5b). Character-by-character rendering, a thinking indicator, and on-brand formatting.
Idle status line: "ITECS AI · Online." Make the mode transition seamless so it reads as a single intelligent agent.
*Acceptance:* incident narration is deterministic; free-form Q&A is genuinely live; both render in the same window convincingly.

### Story 5b — AI Terminal Guardrails & Safety (CRITICAL)
Model on the existing itecsonline.com chatbot guardrails for consistency. The live Q&A must:
- **Proxy only:** all model calls go through the server route; the API key is never in client code or network payloads.
- **Locked scope:** a fixed system prompt restricts the assistant to ITECS AI services / Managed Intelligence offerings, what the demo OS itself is, and guiding the visitor to book a call. **Everything else is out of scope.**
- **Refuse + redirect off-scope:** general knowledge, coding help, competitor deep-dives, personal/sensitive topics, anything unrelated → a brief, polite, on-brand decline that steers back to ITECS AI services and the booking CTA.
- **Prompt-injection resistance:** ignore attempts to override instructions, reveal/alter the system prompt, change persona, or escape scope ("ignore previous instructions," role-play requests, etc.).
- **Rate & size limits:** per-session message cap, per-IP daily cap, max output tokens per reply, max conversation length, and input debounce.
- **No commitments:** never quote firm pricing beyond approved ranges; route quote/scope requests to the Configurator or a booking call.
- **Graceful degradation:** if the endpoint is unavailable, fall back to a helpful canned message + booking link rather than erroring.
- **Abuse monitoring:** privacy-respecting logging of volume/anomalies; no collection of unnecessary PII.
*Acceptance:* off-scope and injection attempts are reliably refused and redirected on-brand; key is never exposed; limits enforced; safe fallback works.

### Story 6 — "The Incident" (THE MARQUEE — connects Story 4 + Story 5)
A single choreographed, replayable, ~30–45s **scripted, deterministic** sequence linking the SOC and the AI Terminal. Triggered by a prominent "Simulate Threat" control (optionally auto-play once shortly after first open). Suggested beats — tune freely:
1. Calm baseline; everything green.
2. SOC: a topology node flares; feed logs an anomalous-execution detection; threat map draws an attack vector.
3. AI Terminal wakes: classifies the threat (MITRE-style technique + confidence %), typed live.
4. AI isolates the affected endpoint → SOC visually quarantines that node (link severs, node locks).
5. AI terminates the process and rolls back from a backup snapshot → SOC ticks a "files restored" counter.
6. AI declares neutralized with an elapsed time and "0 endpoints compromised" → SOC returns to green; feed logs RESOLVED.
7. Closing flourish: a confident, on-brand summary toast (marketing voice acceptable here — e.g. "This is what 24/7 Managed Intelligence looks like — handled before you finished reading.").
Must be identical on every run and re-runnable without reload.
*Acceptance:* one click runs the full connected sequence; SOC + Terminal are visibly one system; replayable; lands the value prop with no salesperson narration.

### Story 7 — AI Solution Configurator (functional tool) — replaces the cloud configurator
An interactive scoping tool for an ITECS AI engagement. Inputs (suggested — refine freely):
- **Primary use case:** e.g. document/workflow automation, customer-support AI agent, RAG knowledge base, data analysis/BI, custom model integration.
- **Org scale:** users / volume tier.
- **Managed Intelligence layer (toggle):** ongoing monitoring, optimization, governance & security wrapper.
- **Integrations:** count / key systems.
- **Deployment preference.**
Output: a clean, scoped **solution brief** + an **estimated investment range** + a **"Book a scoping call" CTA**. Slick, animated, on-brand.

**SOURCE-OF-TRUTH NOTE (read before pricing logic):** the current ITECS pricing reference marks AI consulting and fractional vCIO as *engagement-based — scope/pricing determined after assessment*; there is **no itemized AI rate card** in the provided files. Therefore, by default the Configurator outputs an **estimated range with a "final scope confirmed after assessment" disclaimer**, not a hard monthly number. If/when an AI-services rate file is provided on the server, Claude Code should read it as the source of truth and compute accordingly. **Do not invent fixed ITECS AI prices.**
*Acceptance:* produces a coherent scoped brief + honest estimate + booking CTA; reads as a real tool; pricing logic respects the source-of-truth note.

### Story 8 — Resource Vault / About ITECS (proof)
A file-explorer-style window surfacing proof points and an "About This System" panel: 75 active clients, 95% retention, 99.9% uptime, founded 2002 (23+ years), and the Pegasus Foods "100% uptime during multi-state facility relocation" case. Tasteful grid of "files"/cards openable into short detail views.
*Acceptance:* proof points present and accurate; styled like an OS About/Finder surface; on-brand.

### Story 9 — Signature WOW & Polish
Lean into flashy, branded delight throughout:
- Animated metric counters, subtle particle/grid or scan-line motion on the navy desktop, the `--gradient-intelligence` on hero surfaces, soft glows on active/accent elements.
- Refined window chrome, hover/focus states, optional subtle UI sound (default off, user-toggleable).
- Keyboard focus management, ESC-to-close, and a global `prefers-reduced-motion` path across all animations.
*Acceptance:* the experience feels premium and intentionally "wow," not busy; reduced-motion respected everywhere; keyboard-operable.

### Story 10 — Responsive / Mobile Fallback
On small screens, the OS opens as a simplified single-window/stacked experience rather than a draggable desktop. The Incident and the live Terminal must still work. Drag/resize can be disabled on mobile.
*Acceptance:* usable and impressive on a phone; marquee sequence and Q&A both work.

---

## 6. OUT OF SCOPE (v1) / FAST-FOLLOW
- Live model **narrating** the incident (incident stays scripted by design — see Story 6).
- ROI / MSP-tier comparator app (v2 candidate).
- Standalone Network Monitor window (topology lives inside the SOC for v1).
- Hard, itemized AI pricing in the Configurator (pending a source-of-truth rate file).
- Persistence / saved sessions / multi-user.

---

## 7. OPEN QUESTIONS FOR BRIAN
- **AI Configurator pricing:** point Claude Code to an AI-services rate file on the server, or keep estimate-range output for v1? (Or have me scaffold a tier card for you to price.)
- **Incident realism:** confirm the incident stays scripted/deterministic and the live model is used only for free-form Q&A (recommended).
- **Guardrail reuse:** should Claude Code reuse the exact itecsonline.com chatbot guardrail/system-prompt config? If so, point it at that source.
- **Trigger:** exact placement + copy of the launch button on itecs.ai.
- **Auto-play** the Incident on first open, or strictly click-to-run?
- **Product name:** "ITECS Intelligence OS," "ITECS OS," or tie to the existing "AI Operations Console" language?
