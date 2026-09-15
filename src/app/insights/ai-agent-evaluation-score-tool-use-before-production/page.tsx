import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIAgentEvaluationScorecard } from "@/components/sections/AIAgentEvaluationScorecard";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-evaluation-score-tool-use-before-production",
)!;

export const metadata = generatePageMetadata({
  title: "AI Agent Evaluation: Score Tool Use Before Production",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
});

const sources: ArticleSource[] = [
  {
    label: "AWS — Evaluate any agent framework with AgentCore Evaluations",
    href: "https://aws.amazon.com/blogs/machine-learning/evaluate-any-agent-framework-with-amazon-bedrock-agentcore-evaluations/",
    description:
      "AWS's August 26, 2026 explanation of framework-agnostic evaluation through OpenTelemetry and OpenInference traces, supported scope names, session grouping, message-event requirements, and session-, trace-, and tool-level scoring.",
  },
  {
    label: "AWS — AgentCore evaluation types",
    href: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/evaluations-types.html",
    description:
      "Current documentation for on-demand, batch, and online evaluation, including ground-truth regression tests, aggregate comparisons, live-traffic sampling, filtering, score trends, and low-scoring-session investigation.",
  },
  {
    label: "AWS — AgentCore Evaluations general availability",
    href: "https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/",
    description:
      "AWS's March 31, 2026 general-availability announcement for AgentCore Evaluations, including online and on-demand evaluation, built-in and custom evaluators, ground truth, production monitoring, and regional availability at launch.",
  },
  {
    label: "AWS — Ground-truth evaluations",
    href: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/ground-truth-evaluations.html",
    description:
      "Current mappings for expected responses, behavioral assertions, and exact-, in-order-, or any-order tool trajectories across correctness, goal-success, and trajectory evaluators.",
  },
  {
    label: "AWS — Built-in evaluator prompt templates",
    href: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/prompt-templates-builtin.html",
    description:
      "Current definitions for goal success, correctness, helpfulness, harmfulness and other response checks, plus tool-selection and tool-parameter accuracy at the tool-call level.",
  },
  {
    label: "AWS — AgentCore Observability",
    href: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability.html",
    description:
      "Current OpenTelemetry-compatible observability guidance covering trace-level execution paths and operational metrics such as latency, duration, token usage, sessions, and errors.",
  },
  {
    label: "NVIDIA — Evaluating AI Agent Skill Performance with SkillEvaluator",
    href: "https://developer.nvidia.com/blog/evaluating-ai-agent-skill-performance-with-nvidia-skillevaluator/",
    description:
      "NVIDIA's August 19, 2026 methodology for static checks and isolated with-skill versus without-skill live trials, Skill Lift, task datasets, correctness, effectiveness, efficiency, security, tokens, execution time, and disclosed benchmark limitations.",
  },
  {
    label: "NVIDIA — SkillEvaluator documentation",
    href: "https://docs.nvidia.com/skills/skillevaluator/quickstart",
    description:
      "Current documentation for three independent evaluation tiers, isolated live runs, datasets, reports, CI gates, provider requirements, and the experimental support status of SkillEvaluator.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS operating model for versioned agents, prompts, tools, evaluations, observability, release gates, incident response, rollback, and managed production improvement.",
  },
];

export default function AIAgentEvaluationScoreToolUsePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Evaluation"
      faqHeading="AI Agent Evaluation FAQ"
      sources={sources}
      ctaText="Preparing an AI agent for production? ITECS can turn business tasks into a versioned evaluation suite, instrument the full tool trajectory, define risk-weighted release thresholds, build human-review routing, and connect quality evidence to production observability and rollback."
      heroCaption="A production evaluation follows the whole task: business outcome, agent response, tool choice, parameters, sequence, safety, repeatability, operating cost, human judgment, and release evidence."
      blocks={{
        AGENT_EVALUATION_SCORECARD: <AIAgentEvaluationScorecard />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="17 min read"
    />
  );
}
