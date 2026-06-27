import {
  SITE_CONFIG,
  SERVICES,
  AI_SEO_TIERS,
  MIP_DEFINITION_CAPABILITIES,
  type ServiceItem,
  type AISEOTier,
  type AISEOOverview,
} from "./constants";

function generateContactPoints() {
  return [
    {
      "@type": "ContactPoint",
      name: "International Line",
      telephone: SITE_CONFIG.phoneE164,
      contactType: "customer service",
      areaServed: "International",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      name: "Toll-Free Line",
      telephone: SITE_CONFIG.supportPhoneE164,
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "US",
      availableLanguage: "English",
    },
  ];
}

function generateProviderReference() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: "ITECS AI",
    url: SITE_CONFIG.url,
    parentOrganization: {
      "@type": "LocalBusiness",
      name: "ITECS",
      url: SITE_CONFIG.mainSiteUrl,
    },
  };
}

function generateAISEOAreaServed() {
  return [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Plano" },
    { "@type": "Place", name: "Dallas-Fort Worth" },
  ];
}

function generateAISEOTierServiceReference(tier: AISEOTier) {
  return {
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}${tier.href}#service`,
    name: tier.title,
    url: `${SITE_CONFIG.url}${tier.href}`,
    serviceType: `AI-Optimized SEO - ${tier.shortName}`,
    provider: generateProviderReference(),
    areaServed: generateAISEOAreaServed(),
  };
}

function generateOfferEntity(tier: AISEOTier) {
  return {
    "@type": "Offer",
    "@id": `${SITE_CONFIG.url}${tier.href}#offer`,
    name: tier.name,
    description: tier.overview,
    url: `${SITE_CONFIG.url}${tier.href}`,
    price: tier.priceNumeric,
    priceCurrency: tier.priceCurrency,
    priceSpecification: {
      "@type":
        tier.priceModel === "monthly"
          ? "UnitPriceSpecification"
          : "PriceSpecification",
      price: tier.priceNumeric,
      priceCurrency: tier.priceCurrency,
      ...(tier.priceModel === "monthly"
        ? {
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          }
        : {}),
    },
    availability: "https://schema.org/InStock",
    eligibleRegion: { "@type": "Place", name: "Dallas-Fort Worth" },
    itemOffered: generateAISEOTierServiceReference(tier),
    seller: generateProviderReference(),
  };
}

function generateAggregateOfferEntity(tiers: AISEOTier[]) {
  const prices = tiers.map((t) => t.priceNumeric);

  return {
    "@type": "AggregateOffer",
    "@id": `${SITE_CONFIG.url}/ai-optimized-seo#offers`,
    priceCurrency: "USD",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: tiers.length,
    offers: tiers.map((t) => generateOfferEntity(t)),
  };
}

// ---------------------------------------------------------------------------
// Organization (global — injected in root layout)
// ---------------------------------------------------------------------------

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    alternateName: ["ITECS", "iTecs"],
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`,
    foundingDate: String(SITE_CONFIG.foundingYear),
    contactPoint: generateContactPoints(),
    parentOrganization: {
      "@type": "Organization",
      name: "ITECS",
      url: SITE_CONFIG.mainSiteUrl,
    },
    sameAs: [
      SITE_CONFIG.mainSiteUrl,
      SITE_CONFIG.googleMapsUrl,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.x,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.github,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
  };
}

// ---------------------------------------------------------------------------
// LocalBusiness (global — injected in root layout)
// Per Google SEO report: use LocalBusiness (not Corporation) for DFW proximity
// citations, with parentOrganization tie to itecsonline.com for authority transfer.
// ---------------------------------------------------------------------------

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: "ITECS AI",
    legalName: SITE_CONFIG.legalName,
    alternateName: ["ITECS", "iTecs"],
    url: SITE_CONFIG.url,
    description:
      "Practical AI automation, custom AI agent development, managed intelligence, and AI consulting for Dallas mid-market and enterprise organizations with 10-300 employees.",
    telephone: SITE_CONFIG.phoneE164,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`,
    priceRange: "$$",
    hasMap: SITE_CONFIG.googleMapsUrl,
    contactPoint: generateContactPoints(),
    sameAs: [
      SITE_CONFIG.mainSiteUrl,
      SITE_CONFIG.googleMapsUrl,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.x,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.github,
    ],
    parentOrganization: {
      "@type": "LocalBusiness",
      name: "ITECS",
      url: SITE_CONFIG.mainSiteUrl,
      foundingDate: String(SITE_CONFIG.foundingYear),
    },
    knowsAbout: [
      "Managed Intelligence Provider",
      "Enterprise AI Consulting",
      "Custom AI Agents for Business",
      "AI Workflow Automation",
      "Employee AI Training",
      "AI CRM Integration",
      "AI Receptionist and Voice Agents",
      "Internal AI Knowledge Bases",
      "AI Data Readiness Audits",
      "AI Security and Compliance",
      "Generative Engine Optimization",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.lat,
      longitude: SITE_CONFIG.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Dallas",
        sameAs: "https://en.wikipedia.org/wiki/Dallas",
      },
      {
        "@type": "City",
        name: "Plano",
        sameAs: "https://en.wikipedia.org/wiki/Plano,_Texas",
      },
      {
        "@type": "State",
        name: "Texas",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      itemOffered: SERVICES.map((s) => ({
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: `${SITE_CONFIG.url}${s.href}`,
      })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Managed AI Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.shortTitle,
          description: s.description,
          url: `${SITE_CONFIG.url}${s.href}`,
        },
      })),
    },
  };
}

// ---------------------------------------------------------------------------
// ContactPage (page-specific — reinforces office, map, and phone details)
// ---------------------------------------------------------------------------

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_CONFIG.url}/contact#contactpage`,
    url: `${SITE_CONFIG.url}/contact`,
    name: "Contact ITECS AI",
    description:
      "Contact ITECS AI at the ITECS corporate office in Dallas, Texas for AI consulting, training, security, and DevOps services for Dallas-Fort Worth businesses.",
    about: {
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
    },
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
      name: "ITECS AI",
      legalName: SITE_CONFIG.legalName,
      alternateName: ["ITECS", "iTecs"],
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phoneE164,
      email: SITE_CONFIG.email,
      image: `${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`,
      priceRange: "$$",
      hasMap: SITE_CONFIG.googleMapsUrl,
      sameAs: [
        SITE_CONFIG.mainSiteUrl,
        SITE_CONFIG.googleMapsUrl,
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.x,
        SITE_CONFIG.social.youtube,
        SITE_CONFIG.social.github,
      ],
      parentOrganization: {
        "@type": "LocalBusiness",
        name: "ITECS",
        url: SITE_CONFIG.mainSiteUrl,
        foundingDate: String(SITE_CONFIG.foundingYear),
      },
      contactPoint: generateContactPoints(),
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.zip,
        addressCountry: SITE_CONFIG.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONFIG.geo.lat,
        longitude: SITE_CONFIG.geo.lng,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Dallas",
        },
        {
          "@type": "City",
          name: "Plano",
        },
        {
          "@type": "State",
          name: "Texas",
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Service (per service page)
// ---------------------------------------------------------------------------

export function generateServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_CONFIG.url}${service.href}`,
    provider: {
      "@type": "LocalBusiness",
      name: "ITECS AI",
      url: SITE_CONFIG.url,
      parentOrganization: {
        "@type": "LocalBusiness",
        name: "ITECS",
        url: SITE_CONFIG.mainSiteUrl,
      },
    },
    areaServed: {
      "@type": "City",
      name: "Dallas",
    },
    serviceType: service.shortTitle,
  };
}

export function generateNationalServiceSchema(service: {
  title: string;
  description: string;
  href: string;
  shortTitle: string;
  keywords?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_CONFIG.url}${service.href}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      parentOrganization: {
        "@type": "LocalBusiness",
        name: "ITECS",
        url: SITE_CONFIG.mainSiteUrl,
      },
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Manufacturing executives",
    },
    serviceType: service.shortTitle,
    category: service.keywords ?? ["Manufacturing AI"],
  };
}

export function generateManagedIntelligenceProviderServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}/managed-intelligence-provider#service`,
    name: "Managed Intelligence Provider",
    alternateName: ["MIP", "Managed AI Operations"],
    description: MIP_DEFINITION_CAPABILITIES.definition,
    url: `${SITE_CONFIG.url}/managed-intelligence-provider`,
    provider: generateProviderReference(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/managed-intelligence-provider`,
    },
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "City", name: "Plano" },
      { "@type": "Place", name: "Dallas-Fort Worth" },
      { "@type": "Country", name: "United States" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Mid-market and enterprise organizations with 10-300 employees",
    },
    serviceType: "Managed Intelligence Provider",
    category: [
      "Managed AI operations",
      "AI governance",
      "AI agent operations",
      "Workflow automation",
      "Executive AI reporting",
    ],
    offers: {
      "@type": "Offer",
      name: "AI Readiness Assessment",
      url: `${SITE_CONFIG.url}/assessment`,
      availability: "https://schema.org/InStock",
      seller: generateProviderReference(),
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

export function generateFAQSchema(
  items: readonly {
    question: string;
    answer: unknown;
    schemaAnswer?: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          item.schemaAnswer ??
          (typeof item.answer === "string" ? item.answer : ""),
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Article / BlogPosting
// ---------------------------------------------------------------------------

interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  keywords?: readonly string[];
  citations?: readonly string[];
}

export function generateArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  keywords = [],
  citations = [],
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: image ? [image] : [`${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "The ITECS Team",
      url: `${SITE_CONFIG.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`,
      },
    },
    keywords,
    citation: citations,
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

export function generateBreadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// HowTo (per service page — GEO strategy for numbered process extraction)
// ---------------------------------------------------------------------------

export function generateHowToSchema(
  service: ServiceItem
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${service.shortTitle} Works at ITECS`,
    description: service.description,
    step: service.howItWorks.map((item, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: item.step,
      text: item.description,
    })),
  };
}

// ---------------------------------------------------------------------------
// AI-SEO: Service schema for the overview hub
// ---------------------------------------------------------------------------

export function generateAISEOServiceSchema(overview: AISEOOverview) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_CONFIG.url}${overview.href}#service`,
    name: overview.title,
    description: overview.description,
    url: `${SITE_CONFIG.url}${overview.href}`,
    mainEntityOfPage: `${SITE_CONFIG.url}${overview.href}#webpage`,
    serviceType: "AI-Optimized SEO (Generative Engine Optimization)",
    provider: generateProviderReference(),
    areaServed: generateAISEOAreaServed(),
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Dallas-Fort Worth businesses",
    },
    category: [
      "Search Engine Optimization",
      "Generative Engine Optimization",
      "AI Search Visibility",
    ],
    offers: generateAggregateOfferEntity(AI_SEO_TIERS),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI-Optimized SEO Engagement Tiers",
      itemListElement: AI_SEO_TIERS.map((tier, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: generateOfferEntity(tier),
      })),
    },
  };
}

// ---------------------------------------------------------------------------
// AI-SEO: Service schema for individual tier (Foundation / Momentum / Velocity)
// ---------------------------------------------------------------------------

export function generateAISEOTierServiceSchema(tier: AISEOTier) {
  return {
    "@context": "https://schema.org",
    ...generateAISEOTierServiceReference(tier),
    description: tier.description,
    mainEntityOfPage: `${SITE_CONFIG.url}${tier.href}#webpage`,
    isPartOf: {
      "@type": "Service",
      "@id": `${SITE_CONFIG.url}/ai-optimized-seo#service`,
      name: "AI-Optimized SEO Services Dallas",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Dallas-Fort Worth businesses",
    },
    offers: generateOfferEntity(tier),
  };
}

// ---------------------------------------------------------------------------
// Offer schema for a single AI-SEO tier
// ---------------------------------------------------------------------------

export function generateOfferSchema(tier: AISEOTier) {
  return {
    "@context": "https://schema.org",
    ...generateOfferEntity(tier),
  };
}

// ---------------------------------------------------------------------------
// AggregateOffer schema for the parent AI-SEO page showing all 3 tiers
// ---------------------------------------------------------------------------

export function generateAggregateOfferSchema(tiers: AISEOTier[]) {
  return {
    "@context": "https://schema.org",
    ...generateAggregateOfferEntity(tiers),
  };
}
