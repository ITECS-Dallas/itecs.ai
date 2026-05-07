import type { Metadata } from "next";
import ProposalContent from "@/components/proposals/fcc-marketplace-posting-assistant-c2be7f";

export const metadata: Metadata = {
  title: "FCC Marketplace Posting Assistant Proposal | ITECS",
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
