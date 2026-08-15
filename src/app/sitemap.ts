import type { MetadataRoute } from "next";
import {
  SERVICES,
  TRAINING_SERVICES,
  INSIGHTS,
  AI_SEO_OVERVIEW,
  AI_SEO_TIERS,
  MANUFACTURING_VERTICAL,
  MANUFACTURING_SPOKE_PAGES,
  PPV_AGENT_USE_CASE,
  FINANCIAL_SERVICES_VERTICAL,
  FINANCIAL_SERVICES_SPOKE_PAGES,
  FIELD_EXAM_ANALYZER_USE_CASE,
  TRUST_CASE_STUDIES,
} from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://itecs.ai";

  const hubPages = SERVICES.map((s) => ({
    url: `${base}${s.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const trainingPages = TRAINING_SERVICES.map((s) => ({
    url: `${base}${s.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const insightPages = INSIGHTS.map((i) => ({
    url: `${base}${i.href}`,
    lastModified: new Date(i.modifiedDate ?? i.publishedDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seoTierPages = AI_SEO_TIERS.map((t) => ({
    url: `${base}${t.href}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const manufacturingPages = [
    {
      url: `${base}${MANUFACTURING_VERTICAL.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}${PPV_AGENT_USE_CASE.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...MANUFACTURING_SPOKE_PAGES.map((page) => ({
      url: `${base}${page.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];

  const financialServicesPages = [
    {
      url: `${base}${FINANCIAL_SERVICES_VERTICAL.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}${FIELD_EXAM_ANALYZER_USE_CASE.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FINANCIAL_SERVICES_SPOKE_PAGES.map((page) => ({
      url: `${base}${page.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];

  const caseStudyPages = TRUST_CASE_STUDIES.map((caseStudy) => ({
    url: `${base}${caseStudy.detailHref}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...hubPages,
    ...trainingPages,
    ...caseStudyPages,
    ...manufacturingPages,
    ...financialServicesPages,
    {
      url: `${base}/managed-intelligence-provider`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}${AI_SEO_OVERVIEW.href}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...seoTierPages,
    {
      url: `${base}/insights`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...insightPages,
    {
      url: `${base}/services`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/services/ai-champion-program`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/pricing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/assessment`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
