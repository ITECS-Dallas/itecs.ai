import { Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  CaseStudyCard,
  InsightCard,
  ServiceCard,
  StatCard,
  TestimonialCard,
  TierCard,
} from "@/components/ui/Card";

export function Epic1ComponentContracts() {
  return (
    <div hidden>
      <Button variant="primary" size="sm" type="button" disabled>
        Disabled primary
      </Button>
      <Button variant="secondary" size="md" href="/services">
        Secondary link
      </Button>
      <Button variant="tertiary" size="lg" href="/managed-intelligence-provider">
        Learn more
      </Button>
      <Button
        variant="icon"
        aria-label="Open settings"
        icon={<Settings aria-hidden="true" className="h-4 w-4" />}
      />
      <ServiceCard
        title="Managed Intelligence"
        description="Operational AI programs with governance, monitoring, and accountable delivery."
        href="/managed-intelligence-provider"
      />
      <StatCard value="92" unit="%" label="Client retention" source="ITECS approved proof set" />
      <StatCard value={null} label="Unapproved metric" />
      <CaseStudyCard
        clientName="Anonymized manufacturing client"
        anonymized
        industry="Manufacturing"
        outcome="Reduced manual variance review"
        summary="A real client engagement summarized without disclosing private operating data."
        href="/contact"
      />
      <InsightCard
        category="Managed AI"
        title="How operators govern AI agents"
        href="/insights"
        date="May 31, 2026"
        readTime="6 min read"
      />
      <TestimonialCard
        quote="ITECS helped us move from experimentation to governed AI operations."
        attribution={{ name: "Approved Client", title: "Executive Sponsor", company: "ITECS Client" }}
      />
      <TierCard
        name="Enterprise"
        price="Custom"
        description="A managed intelligence program matched to operating complexity."
        features={["Readiness assessment", "Governance model", "Operational reporting"]}
        ctaHref="/contact"
      />
    </div>
  );
}
