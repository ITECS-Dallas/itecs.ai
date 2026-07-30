import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import {
  getAIPricingOffering,
  SERVICES,
} from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { DataAuditCircuit } from "@/components/effects/circuits/DataAuditCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DataAuditDiagram } from "@/components/sections/DataAuditDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { PricingTable } from "@/components/sections/PricingTable";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "data-audit")!;
const dataReadinessSprint = getAIPricingOffering("Data Readiness Sprint");

export const metadata = generatePageMetadata({
  title: "AI Data Readiness Sprint for Growing Organizations",
  description: `Prepare one department or use case for a reliable AI build with the ${dataReadinessSprint.name}, published at ${dataReadinessSprint.price}.`,
  path: service.href,
  keywords: service.keywords,
});

export default function DataAuditPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: service.shortTitle, href: service.href },
          ]}
        />
      </div>

      {/* 1. Hero — H1 + Zero-Click Answer Block */}
      <ServiceHero service={service} circuit={<DataAuditCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. Operating pain point — validate the source-readiness risk */}
      <PainPoint
        stat="1"
        statLabel="approved source set for the target workflow"
        heading="Reliable AI Starts With Build-Ready Source Material"
        paragraphs={[
          "Useful business knowledge is often spread across duplicated folders, inconsistent names, stale documents, and permissions that were never designed for an AI workflow. A build cannot be reliable when its source set is unclear.",
          "The Data Readiness Sprint concentrates on one department or use case. ITECS inventories the corpus, reviews access, organizes the relevant libraries, improves metadata, and prepares approved sources for ingestion before engineering begins.",
        ]}
        scenario={{
          business: "A growing operations team",
          problem:
            "has the documents an agent needs, but the approved versions are mixed with duplicates, inconsistent permissions, and folders that reflect years of ad hoc storage.",
          result:
            "The sprint creates a governed source set and a written readiness decision, giving the build team a dependable starting point instead of discovering data problems during implementation.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="What the Audit Covers"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Data Audit Diagram — multimedia visual */}
      <DataAuditDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Common Source Environments"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description={
          <>
            Your source material stays governed throughout the engagement.
            ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP
            operating since 2002. For ongoing protection beyond the audit,
            the{" "}
            <a
              href="https://itecsonline.com/cybersecurity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
            >
              ITECS cybersecurity team
            </a>{" "}
            delivers endpoint detection, managed firewalls, email security,
            and penetration testing for businesses across Dallas–Fort Worth.
          </>
        }
        points={[
          "Enterprise-grade, no-training platform configurations for client work",
          "Client data remains in the client's tenant wherever the platform allows",
          "Client-managed, least-privilege credentials for in-scope systems",
          "No client data submitted to consumer-grade or non-contracted AI services; a DPA is available on request",
        ]}
        internalLink={{
          text: "Explore AI consulting to plan your post-audit implementation roadmap",
          href: "/consulting",
        }}
        externalLink={{
          text: "NIST Cybersecurity Framework Guidelines",
          href: "https://www.nist.gov/cyberframework",
        }}
      />

      {/* 8. Pricing Transparency & ROI — comparison table */}
      <PricingROI
        heading="Prepare the Sources Before Engineering Begins"
        description="The sprint turns an uncertain document corpus into a defined, governed source set for one department or use case."
        traditionalLabel="Unprepared Sources"
        aiLabel="Data Readiness Sprint"
        comparison={[
          {
            label: "Source set",
            traditional: "Scattered or undefined",
            ai: "Inventoried for one department or use case",
          },
          {
            label: "Cost",
            traditional: "Internal cleanup cost varies with source condition",
            ai: dataReadinessSprint.price,
          },
          {
            label: "Permissions",
            traditional: "Inherited and inconsistent",
            ai: "Reviewed for the target workflow",
          },
          {
            label: "Organization",
            traditional: "Ad hoc folders and names",
            ai: "Restructured with naming and metadata hygiene",
          },
          {
            label: "Build readiness",
            traditional: "Discovered during engineering",
            ai: "Confirmed in writing before engineering",
          },
          {
            label: "Deliverable",
            traditional: "Unverified corpus",
            ai: "Approved sources prepared for ingestion",
          },
        ]}
        roiStatement={`${dataReadinessSprint.name} prepares one department or use case for a reliable build before engineering begins.`}
        pricingNotes={[
          `${dataReadinessSprint.name}: ${dataReadinessSprint.price}`,
          "Includes source inventory, permission review, folder or library restructuring, metadata and naming hygiene, and ingestion preparation",
          "Every build proposal includes a data-readiness line item or written confirmation that sources were verified build-ready during discovery",
        ]}
      />

      {/* 9. Published sprint pricing */}
      <PricingTable />

      {/* 10. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 11. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Data Readiness Sprint FAQ" />

      {/* 12. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
