"use client";

import { FormEvent, useCallback, useState } from "react";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { Button } from "@/components/ui/Button";
import {
  FormStatus,
  TextAreaField,
  TextField,
} from "@/components/ui/FormControls";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setTurnstileResetSignal((current) => current + 1);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    if (!turnstileToken) {
      setState("error");
      setMessage("Please complete the verification check before sending.");
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formName: "Free AI Assessment Request",
          sourcePath: window.location.pathname,
          turnstileToken,
          fields,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send message.");
      }

      form.reset();
      setState("success");
      setMessage("Your message was sent. The ITECS team will follow up shortly.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please call us directly.",
      );
    } finally {
      resetTurnstile();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          id="name"
          name="name"
          label="Name"
          type="text"
          required
          placeholder="Your name"
        />
        <TextField
          id="company"
          name="company"
          label="Company"
          type="text"
          placeholder="Company name"
        />
      </div>
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        placeholder="you@company.com"
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        placeholder="(555) 555-5555"
      />
      <TextAreaField
        id="message"
        name="message"
        label="How can we help?"
        rows={4}
        required
        className="resize-none"
        placeholder="Tell us about your AI goals..."
      />
      <TurnstileWidget
        resetSignal={turnstileResetSignal}
        onTokenChange={(token) => {
          setTurnstileToken(token);
          if (token) {
            setMessage("");
            setState("idle");
          }
        }}
        onError={() => {
          setState("error");
          setMessage("Verification could not load. Please refresh and try again.");
        }}
        className="rounded-md border border-[var(--border-strong)] bg-bg-elevated px-4 py-3 shadow-[var(--elev-1-inset)]"
      />
      {message ? (
        <FormStatus
          tone={state === "success" ? "success" : "error"}
          message={message}
        />
      ) : null}
      <Button
        type="submit"
        disabled={state === "submitting"}
        size="lg"
        className="w-full"
      >
        {state === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
