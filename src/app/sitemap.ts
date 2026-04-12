import type { MetadataRoute } from "next";
import { SERVICES, INSIGHTS } from "@/lib/constants";

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

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...hubPages,
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
