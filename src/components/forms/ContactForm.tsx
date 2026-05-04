"use client";

import { FormEvent, useCallback, useState } from "react";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

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
        <div>
          <label htmlFor="name" className="block text-sm text-text-dim mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm text-text-dim mb-1.5">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
            placeholder="Company name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-text-dim mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm text-text-dim mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-text-dim mb-1.5">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your AI goals..."
        />
      </div>
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
        className="rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3"
      />
      {message ? (
        <p
          className={
            state === "success"
              ? "rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
              : "rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3 rounded-lg bg-brand-accent text-bg-void font-medium text-sm tracking-wide uppercase hover:shadow-[0_0_30px_var(--glow-cyan)] transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
