import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { SERVICES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { DataAuditCircuit } from "@/components/effects/circuits/DataAuditCircuit";
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

export const metadata = generatePageMetadata({
  title: "AI Data Readiness Audit for Small Business",
  description:
    "Flat-fee Microsoft 365 and Google Workspace security audit delivered in 7 days. Identify data risks, compliance gaps, and AI opportunities — from $2,500.",
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

      {/* 2. SMB Pain Point — validate the bleeding neck */}
      <PainPoint
        stat="60%"
        statLabel="of small businesses close within 6 months of a data breach"
        heading="You Don't Know What's Exposed in Your Cloud Environment"
        paragraphs={[
          "Your Microsoft 365 or Google Workspace has been accumulating permissions, shared links, and external access for years. Files shared with 'anyone with the link' from 2019 are still public. Former employees still have access. Sensitive data — client SSNs, financial records, stored credentials — sits in folders with no access controls.",
          "For a 30-person company, the average cloud environment has 200+ misconfigured sharing permissions. Each one is an open door for data exfiltration, compliance violations, or ransomware entry.",
        ]}
        scenario={{
          business: "A 45-person accounting firm in Richardson",
          problem:
            "discovered during our audit that 3 former employees still had full access to client tax documents in SharePoint. Over 400 files containing SSNs and financial records were shared via public links — accessible to anyone for over 2 years.",
          result:
            "We identified 23 critical security gaps, locked down all exposed data within 48 hours of the report, and built a compliance remediation roadmap that satisfied their SOX audit requirements.",
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
        heading="Environments We Audit"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your audit data stays protected throughout the entire engagement. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 22 years of enterprise security experience."
        points={[
          "Read-only API access — we scan configurations and metadata but cannot modify, copy, or download your files, emails, or documents",
          "Zero data retention — all scan findings are encrypted in transit and at rest, and deleted within 30 days of report delivery",
          "No agents installed — no software on your machines, no stored passwords, no disruption to your team's daily work",
          "HIPAA, SOX, FINRA, and CMMC alignment — our audit methodology maps to the regulatory frameworks your industry requires",
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
        heading="How Does the ITECS Audit Compare?"
        description="Most businesses either skip the audit entirely or overpay for it. Here's how the ITECS AI Data Readiness Audit compares to doing it yourself."
        traditionalLabel="DIY / Internal IT"
        aiLabel="ITECS AI Audit"
        comparison={[
          {
            label: "Time to complete",
            traditional: "4–8 weeks",
            ai: "7 days",
          },
          {
            label: "Cost",
            traditional: "$10,000–$50,000+",
            ai: "$2,500–$8,500 flat fee",
          },
          {
            label: "Scope",
            traditional: "Manual spot checks",
            ai: "Full-environment automated scan",
          },
          {
            label: "Compliance mapping",
            traditional: "Rarely included",
            ai: "HIPAA, SOX, FINRA, CMMC",
          },
          {
            label: "AI readiness",
            traditional: "Not assessed",
            ai: "Automation opportunities ranked by ROI",
          },
          {
            label: "Deliverable",
            traditional: "Spreadsheet or email summary",
            ai: "40+ page report with implementation roadmap",
          },
        ]}
        roiStatement="The average data breach costs small businesses $120,000+. A $2,500–$8,500 audit identifies the gaps before attackers do."
        pricingNotes={[
          "Essentials ($2,500): Core security scan for teams under 25 users",
          "Professional ($5,000): Full audit with compliance and AI opportunity mapping for 25–100 users",
          "Enterprise ($8,500): Comprehensive audit with executive briefing for 100+ users",
          "All tiers include a live review session — no report left unread",
        ]}
      />

      {/* 9. Flat-Fee Pricing Tiers — unique to data-audit */}
      <PricingTable />

      {/* 10. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 11. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Data Audit FAQ" />

      {/* 12. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
