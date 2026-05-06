"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Mail,
  Share2,
} from "lucide-react";

interface ArticleShareBarProps {
  title: string;
  url: string;
}

export function ArticleShareBar({ title, url }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyUrl() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const shareLinks = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Share2,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Share2,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Share2,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ];

  return (
    <section
      aria-labelledby="share-article-heading"
      className="border-t border-[var(--border-subtle)] pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="share-article-heading"
            className="text-sm font-medium uppercase tracking-[0.12em] text-text-dim"
          >
            Share This Article
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Send this guide to a colleague or save it for planning.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {shareLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label === "Email" ? undefined : "_blank"}
              rel={label === "Email" ? undefined : "noopener noreferrer"}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 text-sm text-text-secondary transition-colors hover:border-[var(--border-active)] hover:text-brand-accent"
              aria-label={`Share on ${label}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </a>
          ))}

          <button
            type="button"
            onClick={copyUrl}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--border-subtle)] px-3 text-sm text-text-secondary transition-colors hover:border-[var(--border-active)] hover:text-brand-accent"
            aria-label="Copy article link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-brand-accent" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  );
}
