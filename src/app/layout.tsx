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
    default: "Dallas AI Consulting & Strategy | ITECS AI",
  },
  description:
    "ITECS provides enterprise AI consulting, managed intelligence, chatbot development, and AI security compliance services in Dallas, TX. 22+ years of IT operations expertise.",
  keywords: [
    "AI Consulting Dallas",
    "AI Strategy Dallas",
    "Managed AI Dallas",
    "Enterprise AI",
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
