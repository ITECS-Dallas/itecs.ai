import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Diamond, Hex } from "@/components/ui/Motifs";
import { SectionHeading } from "@/components/ui/SectionHeading";

type GuidedBuildContext = "general" | "claude" | "codex";

const contextContent: Record<
  GuidedBuildContext,
  {
    description: string;
    fitSignals: readonly string[];
    takeaways: readonly string[];
    runtimeLayers: readonly string[];
    caption: string;
    ariaLabel: string;
  }
> = {
  general: {
    description:
      "Guided Build Sessions are build-together working sessions, not lectures. We plan one workflow with your team, build the agent live in your project folder, and test it against real work so your people can maintain and extend it.",
    fitSignals: [
      "You already pay for AI licenses, but adoption is uneven.",
      "Your team has seen demonstrations, but nothing runs on your own data.",
      "You want your people to maintain the workflow without paying a consultant for every prompt change.",
    ],
    takeaways: [
      "A working agent in your own project folder — not a prototype on our laptop.",
      "The plain-language workflow specification the agent was built from.",
      "Reference files organized so the agent and your team can reuse them.",
      "A team that has watched the method end to end and can run it again.",
    ],
    runtimeLayers: [
      "Claude or ChatGPT desktop app",
      "Your project folder and reference files",
      "The workflow your team runs every week",
    ],
    caption:
      "When your team already licenses a supported desktop app, there is no separate agent platform to buy.",
    ariaLabel:
      "Three-layer Guided Build environment: the Claude or ChatGPT desktop app uses the client's project folder and reference files to support a workflow the team runs every week.",
  },
  claude: {
    description:
      "Guided Build Sessions are build-together working sessions, not lectures. We plan one repeatable business workflow, build the agent live in your Claude project folder, and test it against real work so your team can maintain and extend it.",
    fitSignals: [
      "You already pay for Claude licenses, but adoption is uneven.",
      "Your team has seen Claude demonstrations, but nothing runs on your own documents and data.",
      "You want staff to maintain the workflow without paying a consultant for every prompt change.",
    ],
    takeaways: [
      "A working Claude agent in your own project folder — not a prototype on our laptop.",
      "The plain-language workflow specification the agent was built from.",
      "Reference files organized so Claude and your team can reuse them.",
      "A team that has watched the method end to end and can run it again.",
    ],
    runtimeLayers: [
      "Claude desktop app",
      "Your project folder and reference files",
      "The business workflow your team runs every week",
    ],
    caption:
      "When your team already licenses a supported Claude plan, there is no separate agent platform to buy.",
    ariaLabel:
      "Three-layer Claude Guided Build environment: the Claude desktop app uses the client's project folder and reference files to support a business workflow the team runs every week.",
  },
  codex: {
    description:
      "Guided Build Sessions are build-together working sessions, not lectures. We plan one engineering workflow, write the agent instructions inside your repository, and run Codex against a real task so your developers can maintain and extend the method.",
    fitSignals: [
      "You already pay for Codex access, but adoption varies by developer.",
      "Your team has seen coding-agent demonstrations, but no repeatable workflow runs in your repository.",
      "You want developers to own the instructions without paying a consultant for every change.",
    ],
    takeaways: [
      "A working Codex workflow in your own repository — not a prototype on our laptop.",
      "The plain-language engineering specification and approval boundaries it was built from.",
      "Project instructions and reference files organized so Codex and your developers can reuse them.",
      "A team that has watched the method end to end and can run it again.",
    ],
    runtimeLayers: [
      "ChatGPT Codex in the CLI, IDE, or app",
      "Your repository, project instructions, and reference files",
      "The engineering workflow your team runs every sprint",
    ],
    caption:
      "When your engineering team already licenses Codex, the guided workflow runs inside the development tools and repository it already uses.",
    ariaLabel:
      "Three-layer Codex Guided Build environment: ChatGPT Codex in the CLI, IDE, or app uses the client's repository, project instructions, and reference files to support an engineering workflow the team runs every sprint.",
  },
};

const engagementFormats = [
  {
    title: "Single guided-build session",
    description: "One workflow and one working agent. The usual starting point.",
  },
  {
    title: "Session pack",
    description:
      "A discounted block of sessions when you already know there is more than one workflow.",
  },
  {
    title: "Prepaid-hour retainer",
    description:
      "Hours on the books, drawn down as needed, with no pressure to consume them on a schedule.",
  },
  {
    title: "Shared session bank",
    description:
      "One balance that multiple departments can draw from, so finance funds the work once.",
  },
  {
    title: "Executive briefing",
    description:
      "A half-day, onsite or remote session to align stakeholders on funded use cases and AI governance rules.",
  },
] as const;

export function GuidedBuildEngagement({
  context = "general",
}: {
  context?: GuidedBuildContext;
}) {
  const content = contextContent[context];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Guided Agent Build"
          title="We teach while we build."
          description={content.description}
        />

        <div className="mt-8 flex justify-center">
          <Button
            href="/downloads/itecs-ai-guided-build.pdf"
            download="ITECS_AI_GUIDED_BUILD.pdf"
            variant="secondary"
            size="lg"
            icon={<Download className="h-5 w-5" />}
          >
            Download the Guided Build brief
          </Button>
        </div>

        <div className="chamfer-md mt-12 border-l-2 border-itecs-blue bg-canvas-sunken p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">
            A Guided Build fits when
          </h3>
          <ul className="mt-5 grid gap-4 lg:grid-cols-3">
            {content.fitSignals.map((signal) => (
              <li
                key={signal}
                className="flex min-w-0 items-start gap-3 text-sm leading-relaxed text-ink-body"
              >
                <Diamond className="sm mt-1.5 shrink-0" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
            <p className="eyebrow">What You Keep</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Working assets, not workshop notes
            </h3>
            <ul className="mt-6 space-y-4">
              {content.takeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-body"
                >
                  <Diamond className="sm mt-1.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </article>

          <figure
            role="img"
            aria-label={content.ariaLabel}
            className="chamfer-md border border-[var(--card-line)] bg-canvas-sunken p-6 md:p-8"
          >
            <p className="eyebrow">Where It Runs</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
              Inside the tools and files you control
            </h3>
            <div className="mt-6 space-y-3">
              {content.runtimeLayers.map((layer, index) => (
                <div key={layer}>
                  <div className="chamfer-sm flex items-center gap-4 border border-[var(--card-line)] bg-card p-4">
                    <Hex className="h-10 w-10 shrink-0 bg-brand-subtle font-mono text-xs font-semibold text-itecs-blue">
                      {String(index + 1).padStart(2, "0")}
                    </Hex>
                    <p className="font-medium text-ink">{layer}</p>
                  </div>
                  {index < content.runtimeLayers.length - 1 ? (
                    <ArrowDown
                      aria-hidden="true"
                      className="mx-auto mt-3 h-5 w-5 text-itecs-blue-bright"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <figcaption className="mt-5 text-sm leading-relaxed text-ink-muted">
              {content.caption}
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Ways to Engage</p>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
              Pick the format that fits how your team works
            </h3>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {engagementFormats.map((format, index) => (
              <article
                key={format.title}
                className={`chamfer-sm border p-6 ${
                  index === engagementFormats.length - 1
                    ? "border-itecs-blue bg-itecs-blue text-white md:col-span-2"
                    : "border-[var(--card-line)] bg-card"
                }`}
              >
                <p
                  className={`font-mono text-xs ${
                    index === engagementFormats.length - 1
                      ? "text-itecs-blue-pale"
                      : "text-ink-faint"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4
                  className={`mt-3 font-display text-xl font-semibold ${
                    index === engagementFormats.length - 1
                      ? "text-white"
                      : "text-ink"
                  }`}
                >
                  {format.title}
                </h4>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    index === engagementFormats.length - 1
                      ? "text-[#d8e7f1]"
                      : "text-ink-body"
                  }`}
                >
                  {format.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
