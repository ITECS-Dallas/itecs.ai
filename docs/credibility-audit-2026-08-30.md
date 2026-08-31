# Website credibility audit response — 2026-08-30

This is the implementation record for `Report_ITECS_AI_Website_Credibility_Audit_2026-08-29.docx`. It records what was changed, which facts are authoritative, and where the site intentionally avoids inventing proof.

## Authoritative company facts

- ITECS manages 7,000+ endpoints.
- ITECS has a 24/7 NOC. The NOC is not represented as Dallas-based.
- The published retention figure is 95%.
- SOC 2 Type II applies only to ITECS Promus managed cloud hosting. It does not apply to the ITECS MSP or AI practice as a whole.
- CMMC is presented as a readiness service, not an ITECS certification.
- MIP means Managed Intelligence Provider.
- Displayed customer testimonials must link directly to Google Maps or G2.

Public references used by the site:

- Company and managed-services facts: https://itecsonline.com/
- Retention and company history: https://www.prnewswire.com/news-releases/dallas-it-firm-itecs-celebrates-23-years-of-technology-excellence-in-dallas-fort-worth-302630228.html
- Promus managed cloud hosting: https://itecsonline.com/managed-cloud/managed-cloud-hosting
- Google Maps reviews: https://maps.app.goo.gl/oFDotCsqC2SpdppV6
- G2 reviews: https://www.g2.com/products/itecs-outsourcing/reviews

## Systemic audit findings addressed

1. Removed ISO 27001 from public credential strips and eliminated MSP-wide SOC 2 claims. Added exact Promus scope and CMMC service wording.
2. Removed the same false security foundation from financial-services hub and spoke copy.
3. Replaced 92% retention and unsupported 200+ engagement proof with 95% retention and 7,000+ managed endpoints. Added source links to the homepage proof cards.
4. Corrected current About and shared company facts to 7,000+ endpoints; retained no unsupported current 500+ claim.
5. Changed service, manufacturing, and financial scenarios to explicit illustrative planning scenarios instead of implied anonymous client results.
6. Removed or reframed unsupported hero, metadata, FAQ, diagram, ROI, timing, savings, uptime, adoption, and conversion claims. Targets are labeled and require discovery baselines.
7. Rebuilt the testimonial set from direct Google Maps and G2 destinations. Removed the anonymous Pegasus quote and internal-page review links.
8. Preserved the July 8, 2026 AI Services Program v1.4 catalog and clarified that `/assessment` is a no-cost intake, while the formal AI Readiness Assessment is the separately priced catalog offer.
9. Company facts, modeled targets, solution designs, and source-reported historical metrics now have distinct labels.
10. Historical Pegasus, OpenText, and PepsiCo pages now foreground source dates, use past-tense/source-reported framing, remove the unsupported Pegasus testimonial, qualify the $2.1M estimate, remove the $1,467 false precision, and avoid treating PepsiCo governance language as an independent compliance audit.
11. Removed high-risk public jargon and stale promises where found, including the unverified next-business-day response promise and ambiguous “free assessment” calls to action.
12. Platform logos are labeled as technologies ITECS evaluates and implements; they do not imply formal partner status. The client logo wall is limited to organizations with linked historical ITECS source pages and explicitly disclaims current endorsement or AI outcomes.
13. Company proof cards now link to the published company/endpoint and retention sources, and every retained client logo links to its corresponding historical case-study page.
14. The contact form now explains how submitted information is used and links to the existing ITECS privacy policy before submission.
15. Insights pricing language was reconciled to the v1.4 catalog: prepaid hours have a 12-month expiry, and regression coverage rejects the superseded no-expiration wording across the complete Insights catalog.

## Page-group actions

- Home, MIP, About, Contact, Assessment, Services, Consulting, Custom Agents, Automation, AI DevOps, Training, AI Receptionist, CRM/Sales AI, Data Readiness, OpsMemory, and Change Assurance received direct claim and provenance corrections.
- Claude Cowork, ChatGPT Codex, and Microsoft Copilot training pages now present statistics and scenarios as modeled targets, remove universal timing/results language, and scope vendor security claims to plan and configuration.
- Manufacturing, PPV, demand/S&OP, and all manufacturing spoke scenarios are explicitly illustrative. Vendor stack names were generalized where they could identify a client, and the manufacturing hub now links the historical Pegasus case summary.
- Financial Services, Field Examination Analyzer, Cash Flow, Portfolio Monitoring, and Receivables content no longer claims ITECS-wide SOC 2/ISO status or universal no-training data handling. Financial scenarios are explicitly illustrative.
- Stale 2025 GA4 analytics were removed from the public AI-SEO page rather than presented as current proof.
- Pricing remains controlled by `AI_PRICING_CATEGORIES`; the existing v1.4 regression suite continues to reject stale SKUs, prices, and no-expiration terms.
- The currently published August 31, 2026 AI knowledge-management article and its maintained Insights inventory entry are preserved in this release candidate so the credibility remediation does not regress live content.

## Scope boundary and remaining owner decisions

The source report audits public conversion pages and excludes private `/p/` proposal routes and the broader historical Insights archive. This remediation preserves that boundary. One private proposal still contains legacy ISO 27001 and broad SOC 2 wording; it was not changed because proposal content has its own customer, access, and approval workflow. It should receive a proposal-specific factual review before that proposal is reused or shared again.

The private proposal observation remains deliberately unresolved by owner direction on August 31, 2026: proposal facts are excluded from this work. No `/p/` route or proposal source was changed.

## Public Insights archive follow-up — 2026-08-31

The separately approved archive review corrected the highest-risk public legacy articles while preserving every original publication date and adding a visible August 31, 2026 modification date. The work did not silently rewrite publication history.

- Revalidated the high-traffic Claude plan comparison against Anthropic's current pricing, Team, Enterprise, and BAA documentation. Team now reflects a two-member minimum. Enterprise pricing is described as plan- or contract-specific, and BAA eligibility is explicitly feature- and configuration-specific; Team is not eligible and Cowork is not currently covered.
- Replaced universal ChatGPT and Azure privacy/compliance claims with product-, plan-, feature-, configuration-, contract-, retention-, and data-flow-specific guidance. Azure compliance scope is no longer presented as automatic workload compliance.
- Removed unsupported client anecdotes and exact outcomes from the small-business adoption, lead follow-up, ROI, agentic-operations, Cowork, Fable launch, and OpenClaw articles. Planning examples are labeled illustrative, and results must be measured against an organization-specific baseline.
- Removed universal implementation and payback periods, guaranteed conversion or savings claims, and stale vendor price assertions where they could mislead a current buyer.
- Clarified that self-hosted file synchronization governs only the agent-file repository; model inference, connectors, tools, and client-data sources retain separate processing and permission boundaries.
- Reframed the Codex-versus-Claude Code comparison around repeatable evaluation rather than volatile model names, context limits, token prices, or permanent winner labels.
- Reframed MCP as a growing open protocol whose publisher, version, authentication, schema, side effects, permissions, and security boundary must be tested. It is not universal, inherently secure, or a substitute for APIs, identity, contracts, or exit planning.
- Clarified that runtime secret injection reduces plaintext exposure but does not prevent an authorized process, child process, plugin, tool, log, or agent-selected command from disclosing a value.

Regression coverage in `tests/insights-archive-credibility.test.mjs` requires preserved publication dates, maintained modification dates, current primary documentation on volatile comparison routes, and rejects the corrected absolute and unsupported claim patterns.

## Recurring SEO evidence — 2026-08-31

The read-only collector compared complete 29-day windows, 2026-07-31 through 2026-08-28 versus 2026-07-02 through 2026-07-30. Search Console reported 157 clicks and 28,173 impressions in the current window versus 74 clicks and 15,342 impressions previously. Average position improved from 23.83 to 15.92 and CTR improved from 0.482% to 0.557%.

The Claude plan comparison generated 136 clicks and 20,646 impressions and therefore carries unusual factual and reputational leverage. GA4 recorded 27 Organic Search sessions versus 13 previously; 22 current organic sessions landed on that article. No key events were recorded in either window. Conversion instrumentation was repaired on August 17 and its action-ledger review date is September 17, so the zero-event signal is tracked as a yellow diagnostic rather than proof of a new defect.

The collector previously summarized only the first 1,000 query rows, which materially understated site totals. It now requests dimensionless Search Console totals and comparable previous-window GA4 channel, landing-page, AI-referral, and key-event reports. Query rows remain available for diagnosis without being mislabeled as complete totals.

## Deliberately not fabricated

The audit requests more practitioner names, current demos, public client references, current analytics, and additional measured outcomes on several pages. Those items require new first-party evidence or authorization. The site now discloses solution designs and modeled examples honestly instead of inventing substitutes. Add those proof assets only when the responsible ITECS owner supplies a publishable source, measurement definition, date, and permission.
