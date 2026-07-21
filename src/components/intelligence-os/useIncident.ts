"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { INCIDENT_DURATION_MS, INCIDENT_STEPS } from "./data";
import type { IncidentController } from "./types";

export function useIncident(): IncidentController {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!running) return;

    const update = () => {
      const nextElapsed = Math.min(Date.now() - startedAtRef.current, INCIDENT_DURATION_MS);
      setElapsedMs(nextElapsed);

      if (nextElapsed >= INCIDENT_DURATION_MS) {
        setRunning(false);
        setCompleted(true);
      }
    };

    update();
    const interval = window.setInterval(update, 100);
    return () => window.clearInterval(interval);
  }, [running]);

  const start = useCallback(() => {
    startedAtRef.current = Date.now();
    setElapsedMs(0);
    setCompleted(false);
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setCompleted(false);
    setElapsedMs(0);
  }, []);

  const activeStep = useMemo(() => {
    let match = INCIDENT_STEPS[0];
    for (const step of INCIDENT_STEPS) {
      if (step.atMs > elapsedMs) break;
      match = step;
    }
    return match;
  }, [elapsedMs]);

  const feed = useMemo(
    () =>
      INCIDENT_STEPS.flatMap((step) =>
        step.feed && step.atMs <= elapsedMs ? [step.feed] : [],
      ).reverse(),
    [elapsedMs],
  );

  const terminalLines = useMemo(
    () =>
      INCIDENT_STEPS.flatMap((step) =>
        step.terminal && step.atMs <= elapsedMs ? [step.terminal] : [],
      ),
    [elapsedMs],
  );

  return {
    running,
    completed,
    elapsedMs,
    phase: activeStep.phase,
    status: activeStep.status,
    nodeState: activeStep.nodeState,
    progress: activeStep.progress,
    feed,
    terminalLines,
    start,
    reset,
  };
}
