import type { MetadataRoute } from "next";
import {
  SERVICES,
  INSIGHTS,
  AI_SEO_OVERVIEW,
  AI_SEO_TIERS,
  MANUFACTURING_VERTICAL,
  MANUFACTURING_SPOKE_PAGES,
  PPV_AGENT_USE_CASE,
  TRUST_CASE_STUDIES,
} from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://itecs.ai";

  const hubPages = SERVICES.map((s) => ({
    url: `${base}${s.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const insightPages = INSIGHTS.map((i) => ({
    url: `${base}${i.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seoTierPages = AI_SEO_TIERS.map((t) => ({
    url: `${base}${t.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const manufacturingPages = [
    {
      url: `${base}${MANUFACTURING_VERTICAL.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}${PPV_AGENT_USE_CASE.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...MANUFACTURING_SPOKE_PAGES.map((page) => ({
      url: `${base}${page.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];

  const caseStudyPages = TRUST_CASE_STUDIES.map((caseStudy) => ({
    url: `${base}${caseStudy.detailHref}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...hubPages,
    ...caseStudyPages,
    ...manufacturingPages,
    {
      url: `${base}${AI_SEO_OVERVIEW.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...seoTierPages,
    {
      url: `${base}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...insightPages,
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/services/ai-champion-program`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
