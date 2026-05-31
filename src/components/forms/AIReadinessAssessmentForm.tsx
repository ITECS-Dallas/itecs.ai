"use client";

import { FormEvent, useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { Button } from "@/components/ui/Button";
import {
  FormStatus,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormControls";
import { ANALYTICS_EVENTS, trackConversionEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/lib/constants";

type FormValues = {
  name: string;
  workEmail: string;
  company: string;
  employeeRange: string;
  topAIGoal: string;
};

type FormErrors = Partial<Record<keyof FormValues | "turnstile", string>>;
type SubmissionState = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  workEmail: "",
  company: "",
  employeeRange: "",
  topAIGoal: "",
};

const steps = [
  {
    eyebrow: "Step 1 of 3",
    title: "Who should we follow up with?",
    description: "Use a work email so the assessment routes cleanly.",
  },
  {
    eyebrow: "Step 2 of 3",
    title: "Where is the organization today?",
    description: "Company size helps us calibrate the operating model.",
  },
  {
    eyebrow: "Step 3 of 3",
    title: "What should AI improve first?",
    description: "Name the business outcome, not the tool.",
  },
] as const;

const employeeRangeOptions = [
  { label: "10-49 employees", value: "10-49" },
  { label: "50-99 employees", value: "50-99" },
  { label: "100-300 employees", value: "100-300" },
  { label: "300+ employees", value: "300+" },
  { label: "Not sure", value: "not-sure" },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateStep(stepIndex: number, values: FormValues) {
  const errors: FormErrors = {};

  if (stepIndex === 0) {
    if (!values.name.trim()) {
      errors.name = "Enter your name.";
    }

    if (!values.workEmail.trim()) {
      errors.workEmail = "Enter your work email.";
    } else if (!isValidEmail(values.workEmail)) {
      errors.workEmail = "Enter a valid work email.";
    }
  }

  if (stepIndex === 1) {
    if (!values.company.trim()) {
      errors.company = "Enter your company.";
    }

    if (!values.employeeRange) {
      errors.employeeRange = "Select an employee range.";
    }
  }

  if (stepIndex === 2 && !values.topAIGoal.trim()) {
    errors.topAIGoal = "Describe the AI goal you want to evaluate.";
  }

  return errors;
}

function mergeStepErrors(values: FormValues) {
  return {
    ...validateStep(0, values),
    ...validateStep(1, values),
    ...validateStep(2, values),
  };
}

export function AIReadinessAssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [formStarted, setFormStarted] = useState(false);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setTurnstileResetSignal((current) => current + 1);
  }, []);

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setMessage("");
    setState("idle");
  }

  function handleFormStart() {
    if (formStarted) {
      return;
    }

    setFormStarted(true);
    trackConversionEvent(ANALYTICS_EVENTS.formStart, {
      form_id: "ai_readiness_assessment",
      step: 1,
    });
  }

  function goToNextStep() {
    const nextErrors = validateStep(currentStep, values);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setState("error");
      setMessage("Review the highlighted fields before continuing.");
      return;
    }

    setErrors({});
    setMessage("");
    setState("idle");
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function goToPreviousStep() {
    setErrors({});
    setMessage("");
    setState("idle");
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = mergeStepErrors(values);

    if (!turnstileToken) {
      nextErrors.turnstile = "Complete the verification check.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setState("error");
      setMessage("Review the highlighted fields before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          website: String(formData.get("website") || ""),
          sourcePath: window.location.pathname,
          turnstileToken,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to submit assessment.");
      }

      setState("success");
      setMessage("Assessment request received.");
      trackConversionEvent(ANALYTICS_EVENTS.formComplete, {
        form_id: "ai_readiness_assessment",
      });
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your assessment. Please call us directly.",
      );
      resetTurnstile();
    }
  }

  if (state === "success") {
    return (
      <div
        className="min-h-[560px] rounded-lg border border-[var(--border-strong)] bg-bg-surface p-6 shadow-e2 [box-shadow:var(--elev-1-inset),var(--elev-2)] md:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-success/10 text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-cyan">
          Assessment received
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-text-primary">
          ITECS will review your AI goal and route the next step by email.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          A Dallas-based architect will use your submission to frame the first
          conversation around workflows, data boundaries, governance, and the
          right operating model.
        </p>

        <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-bg-elevated p-5">
          <div className="flex items-start gap-3">
            <CalendarCheck className="mt-0.5 h-5 w-5 text-brand" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-text-primary">
                Schedule the follow-up
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Use the contact path if the assessment is time-sensitive, or
                call {SITE_CONFIG.phone} to reach the ITECS team directly.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Talk to an architect
            </Button>
            <Button
              href={`tel:${SITE_CONFIG.phoneE164}`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Call {SITE_CONFIG.phone}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFormStart}
      className="min-h-[560px] rounded-lg border border-[var(--border-strong)] bg-bg-surface p-6 shadow-e2 [box-shadow:var(--elev-1-inset),var(--elev-2)] md:p-8"
      noValidate
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mb-8" aria-label="Assessment progress">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => {
            const active = index === currentStep;
            const complete = index < currentStep;

            return (
              <div
                key={step.eyebrow}
                className="flex flex-1 items-center gap-2"
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={[
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-semibold",
                    active
                      ? "border-[var(--brand)] bg-brand text-white"
                      : complete
                        ? "border-[var(--success)] bg-success/10 text-success"
                        : "border-[var(--border-default)] bg-bg-elevated text-text-tertiary",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
                {index < steps.length - 1 ? (
                  <span className="h-px flex-1 bg-[var(--border-default)]" aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-h-[360px]">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-cyan">
          {steps[currentStep].eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-text-primary">
          {steps[currentStep].title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {steps[currentStep].description}
        </p>

        <div className="mt-6 space-y-5">
          {currentStep === 0 ? (
            <>
              <TextField
                id="assessment-name"
                name="name"
                label="Name"
                required
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                error={errors.name}
                placeholder="Your name"
              />
              <TextField
                id="assessment-work-email"
                name="workEmail"
                label="Work email"
                type="email"
                required
                value={values.workEmail}
                onChange={(event) => updateField("workEmail", event.target.value)}
                error={errors.workEmail}
                placeholder="you@company.com"
              />
            </>
          ) : null}

          {currentStep === 1 ? (
            <>
              <TextField
                id="assessment-company"
                name="company"
                label="Company"
                required
                value={values.company}
                onChange={(event) => updateField("company", event.target.value)}
                error={errors.company}
                placeholder="Company name"
              />
              <SelectField
                id="assessment-employee-range"
                name="employeeRange"
                label="Employee range"
                required
                value={values.employeeRange}
                onChange={(event) =>
                  updateField("employeeRange", event.target.value)
                }
                error={errors.employeeRange}
                placeholder="Select employee range"
                options={employeeRangeOptions}
              />
            </>
          ) : null}

          {currentStep === 2 ? (
            <>
              <TextAreaField
                id="assessment-top-ai-goal"
                name="topAIGoal"
                label="Top AI goal"
                required
                rows={5}
                value={values.topAIGoal}
                onChange={(event) => updateField("topAIGoal", event.target.value)}
                error={errors.topAIGoal}
                placeholder="Example: qualify inbound leads faster, govern Copilot adoption, or reduce manual reporting."
              />
              <TurnstileWidget
                resetSignal={turnstileResetSignal}
                onTokenChange={(token) => {
                  setTurnstileToken(token);
                  if (token) {
                    setErrors((current) => ({ ...current, turnstile: undefined }));
                    setMessage("");
                    setState("idle");
                  }
                }}
                onError={() => {
                  setErrors((current) => ({
                    ...current,
                    turnstile: "Verification could not load. Refresh and try again.",
                  }));
                  setState("error");
                }}
                className="rounded-md border border-[var(--border-strong)] bg-bg-elevated px-4 py-3 shadow-[var(--elev-1-inset)]"
              />
              {errors.turnstile ? (
                <p className="text-sm leading-relaxed text-danger" role="alert">
                  {errors.turnstile}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <div className="min-h-14" aria-live="polite">
        {message ? (
          <FormStatus
            tone="error"
            message={message}
            id="assessment-form-status"
            className="mt-6"
          />
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={goToPreviousStep}
          disabled={currentStep === 0 || state === "submitting"}
          icon={<ArrowLeft className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            size="lg"
            onClick={goToNextStep}
            disabled={state === "submitting"}
            icon={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={state === "submitting"}
            className="w-full sm:w-auto"
          >
            {state === "submitting" ? "Submitting..." : "Submit assessment"}
          </Button>
        )}
      </div>
    </form>
  );
}
