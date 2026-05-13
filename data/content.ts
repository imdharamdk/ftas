import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRightLeft,
  Blocks,
  Bot,
  BrainCircuit,
  CloudCog,
  Code2,
  DatabaseZap,
  Gauge,
  GitBranch,
  Globe2,
  HardDrive,
  Headset,
  Layers3,
  LineChart,
  LockKeyhole,
  Network,
  PlugZap,
  RadioTower,
  Rocket,
  ScanLine,
  ServerCog,
  ShieldCheck,
  Target,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  signal: string;
  Icon: LucideIcon;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type TechModule = {
  name: string;
  layer: string;
  tone: string;
};

export type IconContent = {
  title: string;
  description: string;
  meta?: string;
  Icon: LucideIcon;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  output: string;
  Icon: LucideIcon;
};

export type PricingPlan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  idealFor: string;
  highlight?: string;
  features: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type RoadmapSignal = {
  title: string;
  detail: string;
  stage: string;
};

export const services: Service[] = [
  {
    title: "AI Automation",
    description:
      "Automate approvals, triage, alerts, and recurring operations with AI-assisted workflow routing and API orchestration.",
    signal: "Autonomous Ops",
    Icon: Bot,
  },
  {
    title: "Web Platforms",
    description:
      "Build secure product-grade portals, admin systems, and customer interfaces that feel fast, modern, and reliable.",
    signal: "Product Experience",
    Icon: Code2,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Design and run resilient cloud environments with deployment pipelines, observability, backup strategy, and uptime guardrails.",
    signal: "Elastic Runtime",
    Icon: CloudCog,
  },
  {
    title: "Linux & Server Operations",
    description:
      "Harden Linux hosts, optimize workloads, and maintain stable production environments with operational discipline.",
    signal: "Core Compute",
    Icon: ServerCog,
  },
  {
    title: "Software Support",
    description:
      "Maintain and improve live systems through issue response, release care, incident handling, and continuity workflows.",
    signal: "Lifecycle Care",
    Icon: Headset,
  },
  {
    title: "Technology Consultancy",
    description:
      "Get architecture and implementation guidance for scale, performance, security, tooling, and digital process modernization.",
    signal: "Decision Intelligence",
    Icon: BrainCircuit,
  },
  {
    title: "Portal Ecosystems",
    description:
      "Unify customer, operations, and internal workflows through custom web portals with integrated automation.",
    signal: "Portal Mesh",
    Icon: Globe2,
  },
  {
    title: "Telecom-Integrated Systems",
    description:
      "Connect communication channels, service operations, and infrastructure tooling for responsive digital support.",
    signal: "Signal Fabric",
    Icon: RadioTower,
  },
  {
    title: "Digital Transformation",
    description:
      "Modernize legacy operations into scalable digital systems by combining AI, infrastructure, and practical engineering.",
    signal: "Future Shift",
    Icon: Layers3,
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "01",
    title: "MSME Foundation",
    description:
      "FTAS operates as a registered MSME with a clear mandate: build dependable digital systems for ambitious businesses.",
  },
  {
    year: "02",
    title: "Automation Lab",
    description:
      "Workflow automation and AI decision layers are engineered as maintainable systems, not isolated scripts.",
  },
  {
    year: "03",
    title: "Fintech Infrastructure Track",
    description:
      "Cloud, Linux, portals, support, and telemetry are delivered as one cohesive infrastructure stack.",
  },
  {
    year: "04",
    title: "R&D to Product Pipeline",
    description:
      "Experiments are validated and translated into production-ready capabilities that drive measurable outcomes.",
  },
];

export const techModules: TechModule[] = [
  { name: "React", layer: "Interface Runtime", tone: "cyan" },
  { name: "Node.js", layer: "Service Engine", tone: "green" },
  { name: "TypeScript", layer: "Typed Systems", tone: "blue" },
  { name: "Linux", layer: "Server Kernel", tone: "amber" },
  { name: "WordPress", layer: "CMS Portals", tone: "violet" },
  { name: "PHP", layer: "Web Backend", tone: "indigo" },
  { name: "Cloud", layer: "Infrastructure Fabric", tone: "cyan" },
  { name: "AI APIs", layer: "Cognitive Layer", tone: "purple" },
  { name: "Automation", layer: "Workflow Mesh", tone: "green" },
];

export const rdPipelines = [
  {
    title: "AI Systems",
    detail: "Model-assisted routing, intelligent decision support, and operational copilots.",
    Icon: BrainCircuit,
  },
  {
    title: "Automation Workflows",
    detail: "Signals, triggers, actions, human checkpoints, and reliability instrumentation.",
    Icon: Workflow,
  },
  {
    title: "Intelligent Infrastructure",
    detail: "Cloud, Linux, portals, monitoring, and secure support pipelines for continuous delivery.",
    Icon: DatabaseZap,
  },
  {
    title: "Innovation Pipelines",
    detail: "Rapid prototyping loops that mature into stable enterprise-grade platform modules.",
    Icon: Network,
  },
];

export const visionSignals = [
  "AI-guided operating intelligence",
  "Autonomous workflows with human governance",
  "Secure multi-product fintech architecture",
  "Scalable systems for high-growth teams",
  "Research-to-production delivery cadence",
];

export const trustSignals = [
  { label: "Compliance", value: "Security-first" },
  { label: "Automation", value: "AI-native" },
  { label: "Cloud", value: "Scalable" },
  { label: "Delivery", value: "Product-grade" },
  { label: "Support", value: "Continuity" },
];

export const proofMetrics = [
  { label: "Service domains", value: "09" },
  { label: "Core delivery layers", value: "04" },
  { label: "Infrastructure posture", value: "99.9% ready" },
  { label: "Automation focus", value: "AI-first" },
];

export const valuePillars: IconContent[] = [
  {
    title: "One accountable technology partner",
    description:
      "From frontend portals to cloud operations, FTAS aligns strategy, implementation, and maintenance under a single execution model.",
    meta: "Unified ownership",
    Icon: Blocks,
  },
  {
    title: "AI that improves business throughput",
    description:
      "Automation is applied to real operational bottlenecks like ticket intake, routing, SLA handling, and status intelligence.",
    meta: "Practical intelligence",
    Icon: BrainCircuit,
  },
  {
    title: "Infrastructure-grade execution quality",
    description:
      "Systems are designed for resilience, observability, security, and growth so products can scale with confidence.",
    meta: "Production mindset",
    Icon: ServerCog,
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Audit workflows, users, systems, data boundaries, and automation opportunities.",
    output: "Delivery blueprint",
    Icon: ScanLine,
  },
  {
    step: "02",
    title: "Architect",
    description: "Define stack choices, cloud model, integration strategy, and security-operational controls.",
    output: "Solution architecture",
    Icon: GitBranch,
  },
  {
    step: "03",
    title: "Build",
    description: "Develop portals, APIs, dashboards, and infrastructure modules with product-quality standards.",
    output: "Production baseline",
    Icon: Code2,
  },
  {
    step: "04",
    title: "Automate",
    description: "Attach AI logic, event triggers, approval flows, and telemetry-driven orchestration.",
    output: "Autonomous workflows",
    Icon: Workflow,
  },
  {
    step: "05",
    title: "Operate",
    description: "Run support, monitor system health, ship improvements, and scale platform capabilities.",
    output: "Continuous reliability",
    Icon: Activity,
  },
];

export const infrastructureLayers: IconContent[] = [
  {
    title: "Experience Layer",
    description: "Web applications, portals, dashboards, and operator interfaces for teams and clients.",
    meta: "React / WordPress / PHP",
    Icon: Globe2,
  },
  {
    title: "Automation Layer",
    description: "AI workflows, rule engines, integrations, event logic, and process orchestration.",
    meta: "AI APIs / Workflow engine",
    Icon: PlugZap,
  },
  {
    title: "Compute Layer",
    description: "Cloud hosts, Linux servers, storage, deployment pipelines, and backup strategies.",
    meta: "Cloud / Linux / Server",
    Icon: HardDrive,
  },
  {
    title: "Operations Layer",
    description: "Monitoring, issue response, support operations, and lifecycle maintenance playbooks.",
    meta: "Observability / Support",
    Icon: ShieldCheck,
  },
];

export const automationWorkflow: IconContent[] = [
  {
    title: "Capture",
    description: "Collect events from forms, login actions, APIs, tickets, schedules, and partner systems.",
    meta: "Inputs",
    Icon: Target,
  },
  {
    title: "Understand",
    description: "Apply AI and rules to classify context, assess urgency, and decide the right workflow path.",
    meta: "Intelligence",
    Icon: BrainCircuit,
  },
  {
    title: "Execute",
    description: "Trigger jobs, update records, notify teams, create tasks, and synchronize connected tools.",
    meta: "Automation",
    Icon: ArrowRightLeft,
  },
  {
    title: "Observe",
    description: "Track SLA health, system performance, response cycles, and quality improvements in real time.",
    meta: "Telemetry",
    Icon: LineChart,
  },
];

export const productHighlights: IconContent[] = [
  {
    title: "Secure login and access governance",
    description: "Role-based access, audit trails, and account controls protect customer and operations workflows.",
    meta: "Identity",
    Icon: LockKeyhole,
  },
  {
    title: "Realtime analytics and KPI visibility",
    description: "Live dashboards surface workload health, SLA trends, and operational performance metrics.",
    meta: "Analytics",
    Icon: LineChart,
  },
  {
    title: "AI automation and workflow orchestration",
    description: "Automatically route tasks, trigger actions, and manage cross-team operations at scale.",
    meta: "Automation",
    Icon: Workflow,
  },
  {
    title: "Subscription and lifecycle support",
    description: "Recurring plan workflows, retention insights, and customer journey checkpoints for growth.",
    meta: "Subscriptions",
    Icon: Layers3,
  },
];

export const deliverySignals: IconContent[] = [
  {
    title: "Scalable foundations",
    description: "Architecture decisions are made for growth, integration depth, and future operational complexity.",
    Icon: Rocket,
  },
  {
    title: "Secure-by-default thinking",
    description: "Access boundaries, backups, server care, and hardening controls are part of every delivery.",
    Icon: LockKeyhole,
  },
  {
    title: "Client-ready execution",
    description: "Systems are structured, documented, and maintainable for internal teams and external stakeholders.",
    Icon: UserRoundCheck,
  },
  {
    title: "Measurable business impact",
    description: "FTAS optimizes throughput, reliability, visibility, and operational consistency over time.",
    Icon: Gauge,
  },
];

export const caseStudySignals = [
  { label: "Challenge", value: "Manual support queues, fragmented tools, low visibility." },
  { label: "FTAS platform", value: "Secure portal + workflow automation + infrastructure observability." },
  { label: "Outcome", value: "Faster response loops, higher uptime confidence, scalable operations." },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Launch",
    price: "Pilot",
    cadence: "plan",
    tagline: "For early-stage teams building their first intelligent operations layer.",
    idealFor: "Startup platforms and focused automation initiatives",
    features: [
      "Secure login + role controls",
      "One automation pipeline with monitoring",
      "Core dashboard with KPI tracking",
      "Monthly performance review",
    ],
  },
  {
    name: "Scale",
    price: "Growth",
    cadence: "plan",
    tagline: "For teams scaling product, operations, and customer service workflows.",
    idealFor: "SMEs and growth-stage SaaS products",
    highlight: "Most selected",
    features: [
      "Multi-workflow automation orchestration",
      "Advanced analytics and alerting",
      "Subscription lifecycle integrations",
      "Priority support and optimization cadence",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "architecture",
    tagline: "For organizations requiring high-trust, multi-team fintech infrastructure.",
    idealFor: "Complex operations, compliance-heavy products, and high scale",
    features: [
      "Dedicated architecture and security track",
      "Cross-system integrations + data governance",
      "SLA-driven support and incident response",
      "Roadmap ownership with R&D enablement",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "FTAS converted fragmented operations into a unified platform with cleaner visibility and faster support execution.",
    name: "Operations Director",
    role: "Fintech services client",
  },
  {
    quote:
      "Their team delivered production-ready automation without unnecessary complexity, then stayed to optimize outcomes.",
    name: "Product Lead",
    role: "Digital lending platform",
  },
  {
    quote:
      "The combination of portal engineering and infrastructure reliability gave us confidence to scale subscriptions.",
    name: "Founder",
    role: "B2B SaaS startup",
  },
];

export const futureRoadmap: RoadmapSignal[] = [
  {
    title: "AI Copilot for Operations",
    detail: "Context-aware assistant for ticket triage, incident summaries, and action recommendations.",
    stage: "In planning",
  },
  {
    title: "Trading Intelligence Extensions",
    detail: "Event-driven strategy signals and analytics workflows for future fintech product tracks.",
    stage: "Research",
  },
  {
    title: "Social Insight Layer",
    detail: "Customer and market sentiment inputs routed into product and support decision systems.",
    stage: "Exploration",
  },
];

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Why FTAS", href: "#why-ftas" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Dashboard", href: "#infrastructure" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
];

export const securitySignals = [
  {
    title: "Continuity",
    description: "Maintenance cadence, monitoring, backups, and structured support operations.",
    Icon: ShieldCheck,
  },
  {
    title: "Systems",
    description: "Connected infrastructure, workflows, communication layers, and observability.",
    Icon: Network,
  },
];
