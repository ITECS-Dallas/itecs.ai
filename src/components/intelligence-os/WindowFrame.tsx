"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import { OS_APPS } from "./data";
import styles from "./intelligence-os.module.css";
import type { IntelligenceAppId, IntelligenceWindowState } from "./types";

interface WindowFrameProps {
  windowState: IntelligenceWindowState;
  focused: boolean;
  children: React.ReactNode;
  onFocus: (id: IntelligenceAppId) => void;
  onMinimize: (id: IntelligenceAppId) => void;
  onMaximize: (id: IntelligenceAppId) => void;
  onClose: (id: IntelligenceAppId) => void;
  onPointerGesture: (
    event: React.PointerEvent,
    id: IntelligenceAppId,
    mode: "move" | "resize",
  ) => void;
}

export function WindowFrame({
  windowState,
  focused,
  children,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onPointerGesture,
}: WindowFrameProps) {
  const reducedMotion = useReducedMotion();
  const app = OS_APPS.find((candidate) => candidate.id === windowState.id);
  if (!app) return null;
  const Icon = app.icon;

  return (
    <AnimatePresence>
      {windowState.open && !windowState.minimized && (
        <motion.section
          key={windowState.id}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
          transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.window} absolute flex min-h-0 flex-col overflow-hidden ${focused ? "border-[#5ba8d8]/70" : ""}`}
          style={{
            left: windowState.frame.x,
            top: windowState.frame.y,
            width: windowState.frame.width,
            height: windowState.frame.height,
            zIndex: windowState.zIndex,
          }}
          onPointerDown={() => onFocus(windowState.id)}
          aria-label={`${app.label} application window`}
        >
          <header
            className="flex h-12 shrink-0 touch-none select-none items-center justify-between gap-3 border-b border-[#7fb4d8]/20 bg-[#0a2134] pl-3"
            onPointerDown={(event) => onPointerGesture(event, windowState.id, "move")}
          >
            <div className="flex min-w-0 items-center gap-2">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#7fb4d8]" aria-hidden="true" />
              <div className="min-w-0">
                <h2 className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100">{app.label}</h2>
                <p className="hidden truncate font-mono text-[8px] text-slate-500 xl:block">{app.description}</p>
              </div>
            </div>
            <div className="flex h-full shrink-0 items-stretch" onPointerDown={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => onMinimize(windowState.id)}
                className="flex min-w-11 items-center justify-center text-slate-400 hover:bg-[#163b55] hover:text-white focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5ba8d8]"
                aria-label={`Minimize ${app.label}`}
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onMaximize(windowState.id)}
                className="flex min-w-11 items-center justify-center text-slate-400 hover:bg-[#163b55] hover:text-white focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5ba8d8]"
                aria-label={`${windowState.maximized ? "Restore" : "Maximize"} ${app.label}`}
              >
                {windowState.maximized ? <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" /> : <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => onClose(windowState.id)}
                className="flex min-w-11 items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-200 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300"
                aria-label={`Close ${app.label}`}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </header>
          <div className="min-h-0 flex-1 p-3">{children}</div>
          {!windowState.maximized && (
            <button
              type="button"
              aria-label={`Resize ${app.label}`}
              className="absolute bottom-0 right-0 h-8 w-8 touch-none cursor-nwse-resize border-0 bg-[linear-gradient(135deg,transparent_48%,rgba(127,180,216,.7)_49%,rgba(127,180,216,.7)_54%,transparent_55%,transparent_67%,rgba(127,180,216,.45)_68%,rgba(127,180,216,.45)_73%,transparent_74%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5ba8d8]"
              onPointerDown={(event) => onPointerGesture(event, windowState.id, "resize")}
            />
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
