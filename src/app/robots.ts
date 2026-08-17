import type { MetadataRoute } from "next";

// AI-crawler consent is explicit, not implicit: ITECS allows both AI search
// crawling and model-training use of public marketing content, because AI
// surface visibility is the growth strategy. Hidden proposals (/p/) and API
// routes stay excluded for every agent. Policy record and review triggers:
// docs/seo/ai-crawler-policy.md — update that document before changing any
// group here.
const AI_CRAWLERS = [
  // OpenAI: training, ChatGPT search index, user-initiated fetches.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training, Claude search, user-initiated fetches.
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Google: Gemini/AI training control (Search crawling is governed by *).
  "Google-Extended",
  // Perplexity: search index and user-initiated fetches.
  "PerplexityBot",
  "Perplexity-User",
  // Apple Intelligence training control.
  "Applebot-Extended",
  // Meta AI training and fetching.
  "Meta-ExternalAgent",
  // Common Crawl (feeds many model training sets).
  "CCBot",
];

const DISALLOWED_PATHS = ["/api/", "/p/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOWED_PATHS,
      })),
    ],
    sitemap: "https://itecs.ai/sitemap.xml",
  };
}
