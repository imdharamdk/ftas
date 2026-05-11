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

export const services: Service[] = [
  {
    title: "AI Automation",
    description:
      "Custom AI workflows, process intelligence, API integrations, and automation layers that reduce repetitive operations.",
    signal: "Autonomous Ops",
    Icon: Bot,
  },
  {
    title: "Web Development",
    description:
      "Fast, secure, responsive digital products built for portals, startups, service platforms, and internal systems.",
    signal: "Experience Layer",
    Icon: Code2,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Deployment architecture, cloud configuration, monitoring, backup flows, and reliable digital infrastructure.",
    signal: "Elastic Systems",
    Icon: CloudCog,
  },
  {
    title: "Linux & Server Solutions",
    description:
      "Linux environments, server hardening, hosting operations, uptime workflows, and technical administration.",
    signal: "Core Compute",
    Icon: ServerCog,
  },
  {
    title: "Software Maintenance",
    description:
      "Operational support, issue resolution, upgrades, performance care, and continuity for active software systems.",
    signal: "Lifecycle Care",
    Icon: Headset,
  },
  {
    title: "Computer Consultancy",
    description:
      "Technology guidance for systems, tooling, architecture, process improvement, and business digitization.",
    signal: "Decision Intel",
    Icon: BrainCircuit,
  },
  {
    title: "Web Portals",
    description:
      "Custom portals for customers, staff, operations, reporting, service delivery, and digital collaboration.",
    signal: "Portal Mesh",
    Icon: Globe2,
  },
  {
    title: "Telecommunications",
    description:
      "Communication technology support, connectivity workflows, telecom-aligned systems, and infrastructure consulting.",
    signal: "Signal Fabric",
    Icon: RadioTower,
  },
  {
    title: "Digital Transformation",
    description:
      "Modernization programs that combine AI, automation, infrastructure, and practical software engineering.",
    signal: "Future Shift",
    Icon: Layers3,
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "01",
    title: "MSME Foundation",
    description:
      "FTAS operates as a registered MSME technology company with a practical focus on business-ready digital systems.",
  },
  {
    year: "02",
    title: "Automation Lab",
    description:
      "AI workflows, business automation, and support systems are designed as repeatable infrastructure, not one-off tools.",
  },
  {
    year: "03",
    title: "Infrastructure Layer",
    description:
      "Cloud, Linux, portals, telecom, and maintenance services connect into a single intelligent operating model.",
  },
  {
    year: "04",
    title: "R&D Pipeline",
    description:
      "Research and development turns emerging technologies into practical systems for next-generation companies.",
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
  { name: "Automation Systems", layer: "Workflow Grid", tone: "green" },
];

export const rdPipelines = [
  {
    title: "AI Systems",
    detail: "Model-assisted workflows, intelligent routing, and contextual business automation.",
    Icon: BrainCircuit,
  },
  {
    title: "Automation Workflows",
    detail: "Signals, triggers, actions, human approvals, and operational observability.",
    Icon: Workflow,
  },
  {
    title: "Intelligent Infrastructure",
    detail: "Cloud, Linux, server operations, portals, and secure support cycles.",
    Icon: DatabaseZap,
  },
  {
    title: "Innovation Pipelines",
    detail: "Research loops that convert experiments into stable production systems.",
    Icon: Network,
  },
];

export const visionSignals = [
  "AI-powered business infrastructure",
  "Intelligent automation across daily operations",
  "Next-generation digital ecosystems",
  "Secure, scalable systems for ambitious MSMEs",
  "Research-led software and infrastructure innovation",
];

export const trustSignals = [
  { label: "AI", value: "Automation" },
  { label: "Cloud", value: "Infrastructure" },
  { label: "R&D", value: "Innovation" },
  { label: "MSME", value: "Registered" },
  { label: "Ops", value: "Support" },
];

export const proofMetrics = [
  { label: "Service domains", value: "09" },
  { label: "Operating layers", value: "04" },
  { label: "Support model", value: "24/7-ready" },
  { label: "Build posture", value: "AI-first" },
];

export const valuePillars: IconContent[] = [
  {
    title: "One technical partner",
    description:
      "FTAS connects web systems, automation, cloud, Linux, portals, telecom, maintenance, and consulting under one accountable technology function.",
    meta: "Unified delivery",
    Icon: Blocks,
  },
  {
    title: "AI where it improves operations",
    description:
      "Automation is scoped around practical business workflows, not hype: intake, routing, support, reporting, alerts, and system assistance.",
    meta: "Useful intelligence",
    Icon: BrainCircuit,
  },
  {
    title: "Infrastructure-minded execution",
    description:
      "Every interface, portal, and workflow is planned with uptime, monitoring, maintenance, security, backups, and future expansion in mind.",
    meta: "Production posture",
    Icon: ServerCog,
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Map the business workflow, users, infrastructure, existing software, risk areas, and automation opportunities.",
    output: "System blueprint",
    Icon: ScanLine,
  },
  {
    step: "02",
    title: "Architect",
    description: "Define the stack, cloud/server model, integrations, data flows, security posture, and maintenance plan.",
    output: "Technical architecture",
    Icon: GitBranch,
  },
  {
    step: "03",
    title: "Build",
    description: "Develop portals, websites, dashboards, APIs, automation workflows, and support tooling with clean implementation standards.",
    output: "Production system",
    Icon: Code2,
  },
  {
    step: "04",
    title: "Automate",
    description: "Connect AI APIs, triggers, notifications, approval flows, scheduled tasks, and operational intelligence layers.",
    output: "Automated workflows",
    Icon: Workflow,
  },
  {
    step: "05",
    title: "Operate",
    description: "Maintain, improve, monitor, troubleshoot, document, and scale the platform as the business evolves.",
    output: "Managed continuity",
    Icon: Activity,
  },
];

export const infrastructureLayers: IconContent[] = [
  {
    title: "Experience Layer",
    description: "Websites, portals, dashboards, admin panels, and user-facing digital systems.",
    meta: "React / WordPress / PHP",
    Icon: Globe2,
  },
  {
    title: "Automation Layer",
    description: "AI-assisted workflows, API connectors, approvals, notifications, and recurring operations.",
    meta: "AI APIs / Workflow logic",
    Icon: PlugZap,
  },
  {
    title: "Compute Layer",
    description: "Linux servers, hosting, cloud infrastructure, storage, backups, and deployment environments.",
    meta: "Linux / Cloud / Server",
    Icon: HardDrive,
  },
  {
    title: "Operations Layer",
    description: "Maintenance, monitoring, support, improvements, telecom support, and continuity planning.",
    meta: "Support / Monitoring",
    Icon: ShieldCheck,
  },
];

export const automationWorkflow: IconContent[] = [
  {
    title: "Capture",
    description: "Business signals enter through forms, portals, support requests, schedules, integrations, or manual triggers.",
    meta: "Inputs",
    Icon: Target,
  },
  {
    title: "Understand",
    description: "AI and rule-based logic classify intent, extract context, score priority, and route the request.",
    meta: "Intelligence",
    Icon: BrainCircuit,
  },
  {
    title: "Execute",
    description: "Systems launch tasks, notify teams, update records, create follow-ups, and synchronize infrastructure actions.",
    meta: "Automation",
    Icon: ArrowRightLeft,
  },
  {
    title: "Observe",
    description: "Dashboards and support processes track status, performance, exceptions, and improvement opportunities.",
    meta: "Telemetry",
    Icon: LineChart,
  },
];

export const deliverySignals: IconContent[] = [
  {
    title: "Scalable foundations",
    description: "Architecture choices are made for future traffic, integrations, automation depth, and operational complexity.",
    Icon: Rocket,
  },
  {
    title: "Secure-by-default thinking",
    description: "The system model includes access control, backups, server care, maintenance windows, and platform hardening.",
    Icon: LockKeyhole,
  },
  {
    title: "Client-ready presentation",
    description: "Projects are documented and structured so teams can understand, use, maintain, and confidently expand them.",
    Icon: UserRoundCheck,
  },
  {
    title: "Measurable improvements",
    description: "FTAS focuses on cycle-time reduction, system reliability, digital clarity, and repeatable business execution.",
    Icon: Gauge,
  },
];

export const caseStudySignals = [
  { label: "Challenge", value: "Fragmented tools, manual support, weak visibility" },
  { label: "FTAS build", value: "Portal + automation workflows + cloud/server support" },
  { label: "Outcome", value: "Cleaner operations, faster response loops, scalable digital base" },
];

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Why FTAS", href: "#why-ftas" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "R&D", href: "#rd" },
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
    description: "Maintenance cycles, monitoring, backups, and operational support.",
    Icon: ShieldCheck,
  },
  {
    title: "Systems",
    description: "Portals, infrastructure, communication layers, and connected workflows.",
    Icon: Network,
  },
];
