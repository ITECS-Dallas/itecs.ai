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
import {
  CheckboxField,
  FormStatus,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormControls";
import {
  Accordion,
  Badge,
  ComparisonTable,
  Eyebrow,
  LiveIndicator,
  SectionDivider,
  Tabs,
} from "@/components/ui/Structural";

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
      <TextField
        id="work-email"
        label="Work email"
        name="email"
        type="email"
        required
        error="Use a valid work email."
      />
      <SelectField
        id="employee-range"
        label="Employee range"
        name="employeeRange"
        required
        options={[
          { label: "10-50", value: "10-50" },
          { label: "51-300", value: "51-300" },
        ]}
        successMessage="Range selected."
      />
      <TextAreaField
        id="top-goal"
        label="Top AI goal"
        name="goal"
        required
        hint="One or two operational outcomes is enough."
      />
      <CheckboxField
        id="permission"
        label="ITECS may contact me about the assessment."
        name="permission"
        required
      />
      <FormStatus tone="success" message="Your request was sent." />
      <Eyebrow tone="brand">Dallas managed intelligence</Eyebrow>
      <Badge tone="success">Governed</Badge>
      <SectionDivider variant="grid" />
      <LiveIndicator label="Live" />
      <Accordion
        items={[
          { id: "security", title: "How is data protected?", content: "ITECS applies governed access and monitoring." },
          { id: "ownership", title: "Who owns the workflow?", content: "The client retains approved business logic." },
        ]}
      />
      <Tabs
        items={[
          { id: "solutions", label: "Solutions", content: "AI agents, automation, and governance." },
          { id: "industries", label: "Industries", content: "Manufacturing, professional services, and healthcare." },
        ]}
      />
      <ComparisonTable
        columns={[
          { id: "msp", label: "MSP" },
          { id: "mip", label: "MIP" },
        ]}
        rows={[
          {
            label: "AI operations",
            cells: [
              { value: "Limited", tone: "muted" },
              { value: "Managed", tone: "success" },
            ],
          },
        ]}
      />
    </div>
  );
}
