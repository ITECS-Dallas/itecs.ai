import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://itecs.ai"),
  title: {
    template: "%s | ITECS AI",
    default: "Dallas AI Consulting & Automation for Small Business | ITECS AI",
  },
  description:
    "ITECS helps Dallas businesses with 10–300 employees save time and cut costs with AI automation, custom ChatGPT development, and hands-on AI consulting. 22+ years of IT expertise.",
  keywords: [
    "small business AI Dallas",
    "AI consulting Dallas",
    "custom ChatGPT Dallas",
    "AI automation Dallas",
    "AI training Dallas",
    "ITECS",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ITECS AI",
  },
  twitter: {
    card: "summary_large_image",
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
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateLocalBusinessSchema()} />
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
