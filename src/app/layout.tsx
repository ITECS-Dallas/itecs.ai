import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle =
  "Dallas AI Consulting & Automation for Small Business | ITECS AI";
const defaultDescription = SITE_CONFIG.description;
const defaultOgImage = `${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  applicationName: SITE_CONFIG.name,
  title: {
    template: "%s | ITECS AI",
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    "small business AI Dallas",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J49FJ2JM1N"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J49FJ2JM1N');
          `}
        </Script>
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
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
