import {
  BookOpenText,
  Check,
  FileImage,
  FolderOpen,
  Monitor,
  ShieldCheck,
} from "lucide-react";

const preservedContext = [
  "The written procedure",
  "Locally linked screenshots, photos, and diagrams",
  "Useful alt text",
  "The source path and exact heading",
  "The surrounding article context",
] as const;

export function OpsMemoryDesktopExperience() {
  return (
    <section
      aria-labelledby="opsmemory-visual-heading"
      className="border-y border-white/10 py-24 md:py-32"
      style={{ background: "var(--itecs-navy)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue-pale">
              Rich Desktop Article Experience
            </p>
            <h2
              id="opsmemory-visual-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-5xl"
            >
              Knowledge That Stays Visual
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#c5d2dc]">
              OpsMemory can keep a procedure and its local visual material
              together, so a cited answer does not lose the context that makes
              the article useful.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {preservedContext.map((item) => (
              <li
                key={item}
                className="chamfer-sm flex items-start gap-3 border border-white/15 bg-white/[0.06] p-4 text-sm leading-relaxed text-white"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-pale"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="mt-12" aria-labelledby="desktop-mockup-caption">
          <div className="overflow-hidden rounded-[var(--r-section)] border border-white/15 bg-[#09141f] shadow-2xl shadow-black/30">
            <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 bg-[#0d1b28] px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rotate-45 bg-itecs-blue-bright"
                />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
                  Approved AI workspace
                </span>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-white/45 sm:block">
                Sample Company · local project
              </span>
            </div>

            <div className="grid lg:grid-cols-[14rem_1fr]">
              <aside className="border-b border-white/10 bg-[#0a1722] p-5 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3 text-white">
                  <FolderOpen
                    aria-hidden="true"
                    className="h-4 w-4 text-itecs-blue-pale"
                  />
                  <p className="text-sm font-semibold">OpsMemory project</p>
                </div>
                <nav aria-label="Fictional article outline" className="mt-5">
                  <ul className="space-y-2 text-xs leading-relaxed text-white/60">
                    <li className="chamfer-sm bg-white/[0.06] px-3 py-2 text-white">
                      firewall-replacement.md
                    </li>
                    <li className="px-3 py-1.5">Purpose and approvals</li>
                    <li className="px-3 py-1.5">Replacement procedure</li>
                    <li className="border-l-2 border-itecs-blue-bright px-3 py-1.5 text-itecs-blue-pale">
                      Rack diagram
                    </li>
                    <li className="px-3 py-1.5">Review record</li>
                  </ul>
                </nav>
              </aside>

              <div className="min-w-0 p-4 sm:p-6 md:p-8">
                <div className="chamfer-md ml-auto max-w-2xl border border-itecs-blue/30 bg-itecs-blue/10 p-4 text-sm leading-relaxed text-white">
                  Show the firewall replacement procedure and rack diagram.
                </div>

                <article className="chamfer-md mt-5 border border-white/10 bg-white/[0.045] p-5 md:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="chamfer-sm inline-flex items-center gap-2 bg-itecs-blue px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                      <BookOpenText aria-hidden="true" className="h-3.5 w-3.5" />
                      Source-backed answer
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-white/60">
                      <FileImage aria-hidden="true" className="h-4 w-4" />
                      Article + linked diagram
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                    Approved replacement procedure
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#c5d2dc] md:text-base">
                    The approved article calls for a change record, a verified
                    backup, the scheduled replacement, and a post-change review.
                    Use the linked rack diagram to confirm the labeled device
                    position before work begins.
                  </p>

                  <ol className="mt-5 grid gap-3 md:grid-cols-3">
                    {[
                      "Confirm the approved change record and reviewer.",
                      "Follow the article's replacement checklist.",
                      "Record verification notes for human review.",
                    ].map((step, index) => (
                      <li
                        key={step}
                        className="chamfer-sm border border-white/10 bg-[#0b1925] p-4"
                      >
                        <p className="font-mono text-xs text-itecs-blue-pale">
                          0{index + 1}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 grid gap-5 xl:grid-cols-[1.12fr_0.88fr] xl:items-stretch">
                    <div className="chamfer-md border border-white/10 bg-[#07111a] p-4 md:p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-itecs-blue-pale">
                            Linked visual
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            Sample rack diagram
                          </p>
                        </div>
                        <span className="chamfer-sm bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                          Fictional
                        </span>
                      </div>

                      <svg
                        className="mt-4 h-auto w-full"
                        viewBox="0 0 640 400"
                        width="640"
                        height="400"
                        role="img"
                        aria-labelledby="sample-rack-title sample-rack-description"
                      >
                        <title id="sample-rack-title">
                          Fictional Sample Company rack diagram
                        </title>
                        <desc id="sample-rack-description">
                          A sanitized diagram showing a generic gateway, core
                          switch, and two application segments inside a sample
                          rack. It contains no real topology or operational data.
                        </desc>
                        <rect
                          x="74"
                          y="32"
                          width="492"
                          height="336"
                          rx="12"
                          fill="#0D1B28"
                          stroke="#4FAEFF"
                          strokeWidth="2"
                        />
                        <path
                          d="M320 102V150M320 206V248M202 300H438"
                          fill="none"
                          stroke="#7FC4FF"
                          strokeWidth="3"
                          strokeDasharray="8 8"
                        />
                        <path
                          d="M202 300V326M438 300V326"
                          fill="none"
                          stroke="#7FC4FF"
                          strokeWidth="3"
                        />
                        <g>
                          <rect
                            x="230"
                            y="62"
                            width="180"
                            height="40"
                            rx="6"
                            fill="#0B69B7"
                          />
                          <text
                            x="320"
                            y="87"
                            textAnchor="middle"
                            fill="white"
                            fontSize="16"
                            fontFamily="ui-monospace, monospace"
                          >
                            SAMPLE GATEWAY
                          </text>
                        </g>
                        <g>
                          <rect
                            x="214"
                            y="150"
                            width="212"
                            height="56"
                            rx="6"
                            fill="#132B3E"
                            stroke="#7FC4FF"
                          />
                          <text
                            x="320"
                            y="184"
                            textAnchor="middle"
                            fill="#DDEAF4"
                            fontSize="16"
                            fontFamily="ui-monospace, monospace"
                          >
                            CORE SWITCH
                          </text>
                        </g>
                        <g>
                          <rect
                            x="122"
                            y="326"
                            width="160"
                            height="28"
                            rx="5"
                            fill="#132B3E"
                            stroke="#52738B"
                          />
                          <text
                            x="202"
                            y="345"
                            textAnchor="middle"
                            fill="#DDEAF4"
                            fontSize="12"
                            fontFamily="ui-monospace, monospace"
                          >
                            APP SEGMENT A
                          </text>
                        </g>
                        <g>
                          <rect
                            x="358"
                            y="326"
                            width="160"
                            height="28"
                            rx="5"
                            fill="#132B3E"
                            stroke="#52738B"
                          />
                          <text
                            x="438"
                            y="345"
                            textAnchor="middle"
                            fill="#DDEAF4"
                            fontSize="12"
                            fontFamily="ui-monospace, monospace"
                          >
                            APP SEGMENT B
                          </text>
                        </g>
                        <text
                          x="320"
                          y="278"
                          textAnchor="middle"
                          fill="#7FC4FF"
                          fontSize="13"
                          fontFamily="ui-monospace, monospace"
                        >
                          VERIFY LABELS BEFORE CHANGE
                        </text>
                      </svg>
                    </div>

                    <div className="flex min-w-0 flex-col gap-4">
                      <div className="chamfer-sm border border-white/10 bg-[#0b1925] p-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
                          Cited source
                        </p>
                        <p className="mt-2 break-all font-mono text-xs leading-relaxed text-itecs-blue-pale">
                          /clients/sample-company/network/firewall-replacement.md#rack-diagram
                        </p>
                      </div>
                      <div className="chamfer-sm flex-1 border border-itecs-blue/25 bg-itecs-blue/10 p-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-itecs-blue-pale"
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Human review required
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-white/70">
                              Confirm the source, change record, and existing
                              approvals before any consequential action.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <figcaption
            id="desktop-mockup-caption"
            className="mt-5 text-center text-sm leading-relaxed text-white/60"
          >
            Original HTML/CSS and inline-SVG product mockup using fictional
            Sample Company content. It is not a client screenshot or topology.
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="chamfer-md border border-white/15 bg-white/[0.06] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <Monitor
                aria-hidden="true"
                className="h-5 w-5 text-itecs-blue-pale"
              />
              <h3 className="font-display text-2xl font-semibold text-white">
                Supported desktop experience
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#c5d2dc] md:text-base">
              In an approved project or workspace with local-folder access and
              required permissions, ChatGPT Work/Codex Desktop or Claude Cowork
              can open the Markdown article and associated local visual, use the
              surrounding context, and cite the source.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex"
                target="_blank"
                rel="noreferrer"
                className="chamfer-sm inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-itecs-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-itecs-blue-pale"
              >
                <BookOpenText aria-hidden="true" className="h-4 w-4" />
                ChatGPT Work and Codex
              </a>
              <a
                href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork"
                target="_blank"
                rel="noreferrer"
                className="chamfer-sm inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-itecs-blue-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-itecs-blue-pale"
              >
                <BookOpenText aria-hidden="true" className="h-4 w-4" />
                Claude Cowork
              </a>
            </div>
          </article>

          <aside className="chamfer-md border-l-2 border-itecs-blue-bright bg-[#0a1722] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <FolderOpen
                aria-hidden="true"
                className="h-5 w-5 text-itecs-blue-pale"
              />
              <h3 className="font-display text-2xl font-semibold text-white">
                Availability depends on the workspace
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#c5d2dc] md:text-base">
              Desktop behavior depends on the platform, plan or feature
              availability, device, folder permissions, and configuration. Not
              every image automatically renders in every ChatGPT or Claude
              interface, and this does not promise cloud sync or universal
              device support.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
