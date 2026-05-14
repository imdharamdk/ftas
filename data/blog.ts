export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime: string;
  tags: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "launching-ftas-command-center",
    title: "Launching The FTAS Command Center For Fintech Ops",
    excerpt:
      "A look at how FTAS unifies automation, analytics, and infrastructure signals into one enterprise control surface.",
    publishedAt: "2026-04-19",
    category: "Product",
    readTime: "6 min",
    tags: ["dashboard", "automation", "fintech"],
    content: `## Why this release matters

Fintech operations often suffer from fragmented tools. FTAS Command Center aligns product, infrastructure, and support telemetry into one decision surface.

### What teams can now track

- Workflow completion rates by business domain
- API latency and failure trends
- Incident queue health with priority routing
- Subscription lifecycle activity and retention risk

\`\`\`ts
type Alert = {
  service: string;
  severity: "low" | "medium" | "high";
  status: "open" | "resolved";
};
\`\`\`

### What comes next

The next iteration adds AI copilots for incident summaries and smarter escalation recommendations.`,
  },
  {
    slug: "designing-role-aware-fintech-workflows",
    title: "Designing Role-Aware Fintech Workflows",
    excerpt:
      "How role-based access and feature control reduce risk while keeping automation velocity high.",
    publishedAt: "2026-03-05",
    category: "Security",
    readTime: "5 min",
    tags: ["access", "security", "workflow"],
    content: `## Role-aware by default

FTAS uses role boundaries to separate client operators, support teams, and administrators while preserving workflow visibility.

### Practical policy layers

1. Identity and access controls
2. Feature entitlements per plan
3. Audit logs for operational actions
4. Controlled approval gates for risky actions

### Result

Teams retain speed without compromising compliance posture.`,
  },
  {
    slug: "from-manual-support-to-autonomous-ops",
    title: "From Manual Support To Autonomous Ops",
    excerpt:
      "A case-style walkthrough of moving from inbox-based support to a measurable AI-assisted operations model.",
    publishedAt: "2026-02-12",
    category: "Case Study",
    readTime: "7 min",
    tags: ["case-study", "support", "ai"],
    content: `## Starting point

The client had manual intake, delayed ticket routing, and no reliable SLA visibility.

## FTAS implementation layers

- Unified intake portal
- AI-assisted triage and priority scoring
- Workflow automations with human checkpoints
- Health dashboard and recurring review loop

## Outcome

Response times improved, alert fatigue decreased, and support throughput became predictable.`,
  },
];
