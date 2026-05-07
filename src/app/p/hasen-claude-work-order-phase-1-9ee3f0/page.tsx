import type { Metadata } from "next";
import ProposalContent from "@/components/proposals/hasen-claude-work-order-phase-1-9ee3f0";

export const metadata: Metadata = {
  title: "Hasen Phase 1 Claude Work Order Proposal | ITECS",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function ProposalPage() {
  return (
    <div className="min-h-screen">
      <ProposalContent />
    </div>
  );
}
