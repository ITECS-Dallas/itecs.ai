"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Command, X } from "lucide-react";
import { ConfiguratorApp } from "./ConfiguratorApp";
import { INCIDENT_DURATION_MS, OS_APPS } from "./data";
import styles from "./intelligence-os.module.css";
import { ResourceVaultApp } from "./ResourceVaultApp";
import { SOCApp } from "./SOCApp";
import { TerminalApp } from "./TerminalApp";
import type {
  IntelligenceAppId,
  IntelligenceWindowState,
  WindowFrame as WindowFrameValue,
} from "./types";
import { useIncident } from "./useIncident";
import { WindowFrame } from "./WindowFrame";

interface IntelligenceOSProps {
  open: boolean;
  origin: { x: number; y: number };
  onRequestClose: () => void;
  onExited: () => void;
}

interface WorkAreaBounds {
  width: number;
  height: number;
}

interface PointerGesture {
  id: IntelligenceAppId;
  mode: "move" | "resize";
  startX: number;
  startY: number;
  frame: WindowFrameValue;
}

const MIN_WINDOW_WIDTH = 330;
const MIN_WINDOW_HEIGHT = 250;
const BOOT_LINES = [
  "VERIFYING EXPERIENCE BOUNDARY",
  "LOADING PUBLIC ITECS KNOWLEDGE",
  "ARMING SCRIPTED INCIDENT LAB",
  "INITIALIZING INTELLIGENCE OS",
] as const;

function initialWindows(): IntelligenceWindowState[] {
  return [
    {
      id: "soc",
      open: true,
      minimized: false,
      maximized: false,
      zIndex: 2,
      frame: { x: 14, y: 14, width: 620, height: 540 },
      restoreFrame: null,
    },
    {
      id: "terminal",
      open: true,
      minimized: false,
      maximized: false,
      zIndex: 3,
      frame: { x: 650, y: 14, width: 500, height: 540 },
      restoreFrame: null,
    },
    {
      id: "configurator",
      open: false,
      minimized: false,
      maximized: false,
      zIndex: 4,
      frame: { x: 135, y: 45, width: 820, height: 500 },
      restoreFrame: null,
    },
    {
      id: "vault",
      open: false,
      minimized: false,
      maximized: false,
      zIndex: 5,
      frame: { x: 90, y: 36, width: 940, height: 520 },
      restoreFrame: null,
    },
  ];
}

function tileFrame(
  id: "soc" | "terminal",
  bounds: WorkAreaBounds,
): WindowFrameValue {
  const gutter = 12;
  const availableWidth = Math.max(bounds.width - gutter * 3, MIN_WINDOW_WIDTH * 2);
  const socWidth = Math.round(availableWidth * 0.56);
  const terminalWidth = availableWidth - socWidth;
  return id === "soc"
    ? { x: gutter, y: gutter, width: socWidth, height: Math.max(MIN_WINDOW_HEIGHT, bounds.height - gutter * 2) }
    : { x: gutter * 2 + socWidth, y: gutter, width: terminalWidth, height: Math.max(MIN_WINDOW_HEIGHT, bounds.height - gutter * 2) };
}

function clampFrame(frame: WindowFrameValue, bounds: WorkAreaBounds): WindowFrameValue {
  const maxWidth = Math.max(MIN_WINDOW_WIDTH, bounds.width - 8);
  const maxHeight = Math.max(MIN_WINDOW_HEIGHT, bounds.height - 8);
  const width = Math.min(Math.max(frame.width, MIN_WINDOW_WIDTH), maxWidth);
  const height = Math.min(Math.max(frame.height, MIN_WINDOW_HEIGHT), maxHeight);
  return {
    x: Math.min(Math.max(frame.x, 4), Math.max(4, bounds.width - width - 4)),
    y: Math.min(Math.max(frame.y, 4), Math.max(4, bounds.height - height - 4)),
    width,
    height,
  };
}

function useDesktopViewport(): boolean {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktop;
}

function BootSequence({ onSkip }: { onSkip: () => void }) {
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    const timers = BOOT_LINES.slice(1).map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 2), 260 * (index + 1)),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#06111d]/95 p-6"
    >
      <div className="w-full max-w-lg">
        <div className="mb-5 flex items-center gap-3">
          <span className={`${styles.hex} flex h-11 w-11 items-center justify-center border border-[#5ba8d8] bg-[#0a2134]`} aria-hidden="true">
            <Command className="h-5 w-5 text-[#a9d5f1]" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white">ITECS Intelligence OS</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7fb4d8]">Public experience layer</p>
          </div>
        </div>
        <div className="border-l-2 border-[#326189] bg-[#04111e] p-4 font-mono text-[10px] leading-7 text-slate-400" aria-live="polite">
          {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
            <div key={line} className="flex items-center gap-2">
              <span className="text-emerald-400">{index === visibleLines - 1 && visibleLines < BOOT_LINES.length ? ".." : "OK"}</span>
              <span>{line}</span>
            </div>
          ))}
          <span className={`${styles.bootCursor} mt-1 inline-block h-3 w-1.5 bg-[#7fb4d8]`} aria-hidden="true" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[8px] uppercase tracking-wide text-slate-600">No live security systems connected</p>
          <button type="button" onClick={onSkip} className={`${styles.chamferSmall} min-h-10 border border-[#7fb4d8]/35 px-4 font-mono text-[9px] uppercase tracking-wide text-slate-200 hover:border-[#7fb4d8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]`}>
            Skip boot
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function IntelligenceOS({
  open,
  origin,
  onRequestClose,
  onExited,
}: IntelligenceOSProps) {
  const reducedMotion = useReducedMotion();
  const desktop = useDesktopViewport();
  const incident = useIncident();
  const dialogRef = useRef<HTMLElement>(null);
  const workAreaRef = useRef<HTMLDivElement>(null);
  const pointerGestureRef = useRef<PointerGesture | null>(null);
  const [bounds, setBounds] = useState<WorkAreaBounds>({ width: 1180, height: 570 });
  const [windows, setWindows] = useState<IntelligenceWindowState[]>(initialWindows);
  const [mobileApp, setMobileApp] = useState<IntelligenceAppId>("terminal");
  const [bootComplete, setBootComplete] = useState(Boolean(reducedMotion));
  const [clock, setClock] = useState("");
  const firstLayoutRef = useRef(true);

  useEffect(() => {
    if (!open || bootComplete) return;
    const timer = window.setTimeout(() => setBootComplete(true), reducedMotion ? 0 : 1_450);
    return () => window.clearTimeout(timer);
  }, [bootComplete, open, reducedMotion]);

  useEffect(() => {
    if (!open) return;
    const update = () => setClock(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [open]);

  useEffect(() => {
    const workArea = workAreaRef.current;
    if (!workArea || !desktop) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = { width: entry.contentRect.width, height: entry.contentRect.height };
      setBounds(next);
      setWindows((current) =>
        current.map((windowState) => {
          if (firstLayoutRef.current && (windowState.id === "soc" || windowState.id === "terminal")) {
            return { ...windowState, frame: tileFrame(windowState.id, next) };
          }
          if (windowState.maximized) {
            return { ...windowState, frame: { x: 4, y: 4, width: next.width - 8, height: next.height - 8 } };
          }
          return { ...windowState, frame: clampFrame(windowState.frame, next) };
        }),
      );
      firstLayoutRef.current = false;
    });
    observer.observe(workArea);
    return () => observer.disconnect();
  }, [desktop]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onRequestClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("aria-hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onRequestClose, open]);

  const focusWindow = useCallback((id: IntelligenceAppId) => {
    setWindows((current) => {
      const nextZ = Math.max(...current.map((item) => item.zIndex)) + 1;
      return current.map((item) => item.id === id ? { ...item, zIndex: nextZ } : item);
    });
  }, []);

  const openWindow = useCallback((id: IntelligenceAppId) => {
    setMobileApp(id);
    setWindows((current) => {
      const nextZ = Math.max(...current.map((item) => item.zIndex)) + 1;
      return current.map((item) => item.id === id ? { ...item, open: true, minimized: false, zIndex: nextZ } : item);
    });
  }, []);

  const minimizeWindow = useCallback((id: IntelligenceAppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized: true } : item));
  }, []);

  const closeWindow = useCallback((id: IntelligenceAppId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, open: false, minimized: false } : item));
  }, []);

  const maximizeWindow = useCallback((id: IntelligenceAppId) => {
    setWindows((current) => current.map((item) => {
      if (item.id !== id) return item;
      if (item.maximized && item.restoreFrame) {
        return { ...item, maximized: false, frame: clampFrame(item.restoreFrame, bounds), restoreFrame: null };
      }
      return {
        ...item,
        maximized: true,
        restoreFrame: item.frame,
        frame: { x: 4, y: 4, width: bounds.width - 8, height: bounds.height - 8 },
      };
    }));
  }, [bounds]);

  const startPointerGesture = useCallback((event: React.PointerEvent, id: IntelligenceAppId, mode: "move" | "resize") => {
    const current = windows.find((item) => item.id === id);
    if (!current || current.maximized || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    pointerGestureRef.current = {
      id,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      frame: current.frame,
    };
    focusWindow(id);
  }, [focusWindow, windows]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const gesture = pointerGestureRef.current;
      if (!gesture) return;
      const deltaX = event.clientX - gesture.startX;
      const deltaY = event.clientY - gesture.startY;
      setWindows((current) => current.map((item) => {
        if (item.id !== gesture.id) return item;
        const candidate = gesture.mode === "move"
          ? { ...gesture.frame, x: gesture.frame.x + deltaX, y: gesture.frame.y + deltaY }
          : { ...gesture.frame, width: gesture.frame.width + deltaX, height: gesture.frame.height + deltaY };
        return { ...item, frame: clampFrame(candidate, bounds) };
      }));
    };
    const onPointerUp = () => { pointerGestureRef.current = null; };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [bounds]);

  const runIncident = useCallback(() => {
    incident.start();
    setMobileApp("soc");
    setWindows((current) => {
      const maxZ = Math.max(...current.map((item) => item.zIndex));
      return current.map((item) => {
        if (item.id === "soc" || item.id === "terminal") {
          return {
            ...item,
            open: true,
            minimized: false,
            maximized: false,
            restoreFrame: null,
            zIndex: maxZ + (item.id === "terminal" ? 2 : 1),
            frame: tileFrame(item.id, bounds),
          };
        }
        return { ...item, minimized: item.open ? true : item.minimized };
      });
    });
  }, [bounds, incident]);

  const focusedId = useMemo(() => {
    const visible = windows.filter((item) => item.open && !item.minimized);
    return visible.sort((a, b) => b.zIndex - a.zIndex)[0]?.id;
  }, [windows]);

  const renderApp = (id: IntelligenceAppId, compact = false) => {
    switch (id) {
      case "soc":
        return <SOCApp incident={incident} onRun={runIncident} compact={compact} />;
      case "terminal":
        return <TerminalApp incident={incident} compact={compact} />;
      case "configurator":
        return <ConfiguratorApp />;
      case "vault":
        return <ResourceVaultApp />;
    }
  };

  const mobileIncidentView = !desktop && incident.running;

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <motion.div
          key="intelligence-os"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#020914]/75 p-0 backdrop-blur-[3px] md:p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onRequestClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            id="intelligence-os-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="intelligence-os-title"
            tabIndex={-1}
            className={`${styles.surface} relative flex h-full w-full min-h-0 max-w-[1600px] flex-col overflow-hidden outline-none md:h-[calc(100dvh-24px)] md:border md:border-[#7fb4d8]/35`}
            style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0.3, scale: 0.045 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0.15, scale: 0.045 }}
            transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
            onClickCapture={(event) => {
              if (
                event.target instanceof Element &&
                event.target.closest("a[href]")
              ) {
                onRequestClose();
              }
            }}
          >
            <header className="relative z-20 flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[#7fb4d8]/25 bg-[#061728]/95 pl-3 sm:pl-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className={`${styles.hex} flex h-7 w-7 shrink-0 items-center justify-center border border-[#5ba8d8] bg-[#0a2134]`} aria-hidden="true">
                  <Command className="h-3.5 w-3.5 text-[#a9d5f1]" />
                </span>
                <div className="min-w-0">
                  <h1 id="intelligence-os-title" className="truncate font-display text-sm font-semibold tracking-tight text-white">ITECS Intelligence OS</h1>
                  <p className="hidden font-mono text-[8px] uppercase tracking-[0.15em] text-[#7fb4d8] sm:block">Explore · simulate · scope</p>
                </div>
              </div>
              <div className="flex h-full items-center">
                <span className="hidden items-center gap-1.5 border-l border-[#7fb4d8]/15 px-3 font-mono text-[8px] uppercase tracking-wide text-slate-500 sm:flex">
                  <Activity className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                  Experience online
                </span>
                <span className="hidden border-l border-[#7fb4d8]/15 px-3 font-mono text-[9px] tabular-nums text-slate-400 sm:block">{clock}</span>
                <button type="button" onClick={onRequestClose} className="flex h-full min-w-12 items-center justify-center border-l border-[#7fb4d8]/15 text-slate-400 hover:bg-red-500/15 hover:text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300" aria-label="Close Intelligence OS">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
              <div ref={workAreaRef} className="relative min-h-0 flex-1 overflow-hidden">
                {desktop ? (
                  windows.map((windowState) => (
                    <WindowFrame
                      key={windowState.id}
                      windowState={windowState}
                      focused={focusedId === windowState.id}
                      onFocus={focusWindow}
                      onMinimize={minimizeWindow}
                      onMaximize={maximizeWindow}
                      onClose={closeWindow}
                      onPointerGesture={startPointerGesture}
                    >
                      {renderApp(windowState.id)}
                    </WindowFrame>
                  ))
                ) : mobileIncidentView ? (
                  <div className={`${styles.scrollArea} grid h-full min-h-0 grid-rows-[minmax(330px,1.2fr)_minmax(260px,.8fr)] gap-2 overflow-y-auto p-2`}>
                    <section className={`${styles.window} relative min-h-[330px] overflow-hidden p-2`} aria-label="Synchronized SOC incident view">
                      <SOCApp incident={incident} onRun={runIncident} compact />
                    </section>
                    <section className={`${styles.window} relative min-h-[260px] overflow-hidden p-2`} aria-label="Synchronized incident terminal">
                      <TerminalApp incident={incident} compact />
                    </section>
                  </div>
                ) : (
                  <main className="h-full min-h-0 overflow-hidden p-2 sm:p-3" aria-label={`${OS_APPS.find((app) => app.id === mobileApp)?.label} mobile application`}>
                    <div className={`${styles.window} relative h-full min-h-0 overflow-hidden p-2.5 sm:p-3`}>
                      {renderApp(mobileApp)}
                    </div>
                  </main>
                )}
              </div>

              <nav className="relative z-20 flex h-[58px] shrink-0 items-stretch justify-center border-t border-[#7fb4d8]/25 bg-[#061728]/95 px-1 sm:px-3" aria-label="Intelligence OS applications">
                {OS_APPS.map((app) => {
                  const state = windows.find((item) => item.id === app.id);
                  const active = desktop ? state?.open && !state.minimized && focusedId === app.id : mobileApp === app.id;
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openWindow(app.id)}
                      className={`relative flex min-w-[72px] flex-col items-center justify-center gap-1 border-x border-transparent px-2 text-slate-500 transition-colors hover:bg-[#0a2134] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5ba8d8] ${active ? "bg-[#0a2134] text-[#a9d5f1]" : ""}`}
                      aria-label={`${state?.minimized ? "Restore" : "Open"} ${app.label}`}
                      aria-pressed={Boolean(active)}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="font-mono text-[8px] uppercase tracking-wide">{app.shortLabel}</span>
                      {state?.open && <span className={`absolute bottom-0 h-0.5 w-6 ${active ? "bg-[#5ba8d8]" : "bg-[#326189]"}`} aria-hidden="true" />}
                    </button>
                  );
                })}
                <div className="ml-auto hidden items-center border-l border-[#7fb4d8]/15 pl-3 font-mono text-[8px] uppercase tracking-wide text-slate-600 lg:flex">
                  {incident.running ? `SIM ${Math.round(incident.elapsedMs / 1_000)} / ${INCIDENT_DURATION_MS / 1_000}s` : "PUBLIC DEMO MODE"}
                </div>
              </nav>
            </div>

            <AnimatePresence>
              {!bootComplete && <BootSequence key="boot" onSkip={() => setBootComplete(true)} />}
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
