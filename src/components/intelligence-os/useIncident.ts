"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INCIDENT_CONTAINMENT_MS,
  INCIDENT_DURATION_MS,
  INCIDENT_REVIEW_GATE_MS,
  INCIDENT_STEPS,
} from "./data";
import type { IncidentController } from "./types";

export function useIncident(): IncidentController {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const startedAtRef = useRef(0);
  const approvedRef = useRef(false);

  useEffect(() => {
    if (!running || paused || awaitingApproval) return;

    const update = () => {
      const nextElapsed = Math.min(Date.now() - startedAtRef.current, INCIDENT_DURATION_MS);

      if (!approvedRef.current && nextElapsed >= INCIDENT_REVIEW_GATE_MS) {
        setElapsedMs(INCIDENT_REVIEW_GATE_MS);
        setAwaitingApproval(true);
        return;
      }

      setElapsedMs(nextElapsed);

      if (nextElapsed >= INCIDENT_DURATION_MS) {
        setRunning(false);
        setCompleted(true);
        setPaused(false);
      }
    };

    update();
    const interval = window.setInterval(update, 100);
    return () => window.clearInterval(interval);
  }, [awaitingApproval, paused, running]);

  const start = useCallback(() => {
    startedAtRef.current = Date.now();
    approvedRef.current = false;
    setElapsedMs(0);
    setCompleted(false);
    setPaused(false);
    setAwaitingApproval(false);
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (!running || awaitingApproval) return;
    setPaused(true);
  }, [awaitingApproval, running]);

  const resume = useCallback(() => {
    if (!running || !paused) return;
    startedAtRef.current = Date.now() - elapsedMs;
    setPaused(false);
  }, [elapsedMs, paused, running]);

  const approve = useCallback(() => {
    if (!running || !awaitingApproval) return;
    approvedRef.current = true;
    startedAtRef.current = Date.now() - INCIDENT_CONTAINMENT_MS;
    setElapsedMs(INCIDENT_CONTAINMENT_MS);
    setAwaitingApproval(false);
  }, [awaitingApproval, running]);

  const reset = useCallback(() => {
    approvedRef.current = false;
    setRunning(false);
    setCompleted(false);
    setPaused(false);
    setAwaitingApproval(false);
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

  const trace = useMemo(
    () =>
      INCIDENT_STEPS.flatMap((step) =>
        step.trace && step.atMs <= elapsedMs ? [step.trace] : [],
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
    paused,
    awaitingApproval,
    elapsedMs,
    phase: activeStep.phase,
    status: activeStep.status,
    controlState: activeStep.controlState,
    progress: activeStep.progress,
    trace,
    terminalLines,
    start,
    pause,
    resume,
    approve,
    reset,
  };
}
