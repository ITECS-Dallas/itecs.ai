import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { FAQ_ITEMS, HOMEPAGE_FEATURES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { StatsBar } from "@/components/sections/StatsBar";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "Dallas AI Consulting & Strategy",
  description:
    "ITECS provides enterprise AI consulting, managed intelligence, chatbot development, and AI security compliance services in Dallas, TX. 22+ years of IT operations expertise.",
  path: "/",
  keywords: [
    "Dallas AI Consulting",
    "AI Strategy Dallas",
    "Enterprise AI Dallas",
    "Managed AI Dallas",
    "AI Chatbot Development Dallas",
    "AI Security Compliance Dallas",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeatureShowcase features={HOMEPAGE_FEATURES} />
      <StatsBar />
      <PartnerLogos />
      <FAQ items={FAQ_ITEMS} />
      <CTASection />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
    </>
  );
}
