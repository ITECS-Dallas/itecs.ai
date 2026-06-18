import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const defaultTitle =
  "Dallas Managed AI Consulting & Automation | ITECS AI";
const defaultDescription = SITE_CONFIG.description;
const defaultOgImage = `${SITE_CONFIG.url}/images/og/itecs-og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  applicationName: SITE_CONFIG.name,
  title: {
    template: "%s | ITECS AI",
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    "managed AI consulting Dallas",
    "AI consulting Dallas",
    "custom AI agents Dallas",
    "AI automation Dallas",
    "AI training Dallas",
    "ITECS",
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "ITECS AI Dallas AI consulting and automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1622",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateLocalBusinessSchema()} />
        <meta
          property="business:contact_data:street_address"
          content={SITE_CONFIG.address.street}
        />
        <meta
          property="business:contact_data:locality"
          content={SITE_CONFIG.address.city}
        />
        <meta
          property="business:contact_data:region"
          content={SITE_CONFIG.address.state}
        />
        <meta
          property="business:contact_data:postal_code"
          content={SITE_CONFIG.address.zip}
        />
        <meta
          property="business:contact_data:country_name"
          content={SITE_CONFIG.address.country}
        />
        <meta
          property="business:contact_data:email"
          content={SITE_CONFIG.email}
        />
        <meta
          property="business:contact_data:phone_number"
          content={SITE_CONFIG.phoneE164}
        />
        <meta property="place:location:latitude" content={String(SITE_CONFIG.geo.lat)} />
        <meta property="place:location:longitude" content={String(SITE_CONFIG.geo.lng)} />
        <meta
          name="geo.region"
          content={`${SITE_CONFIG.address.country}-${SITE_CONFIG.address.state}`}
        />
        <meta
          name="geo.placename"
          content={`${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state}`}
        />
        <meta
          name="geo.position"
          content={`${SITE_CONFIG.geo.lat};${SITE_CONFIG.geo.lng}`}
        />
        <meta name="ICBM" content={`${SITE_CONFIG.geo.lat}, ${SITE_CONFIG.geo.lng}`} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-accent focus:text-bg-void focus:rounded-lg"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
