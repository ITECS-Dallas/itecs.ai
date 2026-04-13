import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { INSIGHTS_FAQ } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { InsightsHero } from "@/components/sections/InsightsHero";
import { InsightCards } from "@/components/sections/InsightCards";
import { InsightsTopics } from "@/components/sections/InsightsTopics";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Insights & Guides for Dallas Small Businesses",
  description:
    "Practical AI guides for Dallas business owners with 10–300 employees. Learn how to use ChatGPT safely, automate lead follow-up, and deploy AI tools — written by IT veterans, not marketers.",
  path: "/insights",
  keywords: [
    "AI guides for small business",
    "how to use AI small business",
    "ChatGPT for business guide",
    "AI automation guide Dallas",
    "small business AI tips",
    "AI security for business",
  ],
});

export default function InsightsPage() {
  return (
    <>
      {/* 1. Hero — H1, eyebrow, stats row, ambient effects */}
      <InsightsHero />

      {/* 2. Featured article + article cards grid */}
      <InsightCards />

      {/* 3. Topic categories — hub link reinforcement */}
      <InsightsTopics />

      {/* 4. FAQ — LAST content section before CTA */}
      <FAQ items={INSIGHTS_FAQ} heading="AI Insights FAQ" />

      {/* 5. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateFAQSchema(INSIGHTS_FAQ)} />
    </>
  );
}
