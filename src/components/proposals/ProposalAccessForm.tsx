"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ProposalAccessForm({
  slug,
  clientName,
}: {
  slug: string;
  clientName: string;
}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/proposals/access/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, email }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send access link.");
      }

      form.reset();
      setState("success");
      setMessage(
        payload.message ||
          "If that email is approved for this proposal, an access link has been sent.",
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send access link. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-accent/20 bg-bg-surface/45 p-5 shadow-2xl shadow-black/20 md:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-light text-text-primary">
            Request private access
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            We will send a one-time access link for the {clientName} proposal to
            the email address below.
          </p>
        </div>
      </div>

      <label htmlFor="proposal-email" className="mb-1.5 block text-sm text-text-dim">
        Business Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim"
            aria-hidden="true"
          />
          <input
            id="proposal-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void py-3 pl-11 pr-4 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending..." : "Send Link"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "error" ? "text-red-300" : "text-brand-accent-bright"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
