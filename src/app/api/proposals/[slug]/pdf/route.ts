import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { getProposalConfig, hasProposalAccess } from "@/lib/proposals/access";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const proposal = getProposalConfig(slug);

  if (!proposal) {
    return NextResponse.json({ message: "Proposal not found." }, { status: 404 });
  }

  if (!(await hasProposalAccess(slug))) {
    return NextResponse.redirect(new URL(`/p/${slug}/access`, request.url));
  }

  const filePath = join(
    process.cwd(),
    "public",
    proposal.pdfPublicPath.replace(/^\/+/, ""),
  );
  const file = await readFile(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
