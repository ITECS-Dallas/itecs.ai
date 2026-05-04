import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = "/images/logos/itecs-horizontal.svg",
}: PageMetaInput): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_CONFIG.url}${ogImage}`;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "ITECS",
      "AI Consulting",
      "Dallas",
      "Managed IT Services",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ITECS AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
