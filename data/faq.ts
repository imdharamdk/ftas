export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: "Platform" | "Pricing" | "Security" | "Support";
};

export const faqItems: FAQItem[] = [
  {
    id: "how-fast-can-ftas-onboard",
    question: "How quickly can FTAS onboard a new client?",
    answer:
      "Most onboarding tracks start with discovery in week one, architecture in week two, and initial implementation milestones in the first 30 days.",
    category: "Platform",
  },
  {
    id: "does-ftas-support-role-based-access",
    question: "Does FTAS support role-based access and feature controls?",
    answer:
      "Yes. User, manager, and admin roles can be configured with feature-level entitlement controls, scoped permissions, and operational audit trails.",
    category: "Security",
  },
  {
    id: "can-we-integrate-existing-tools",
    question: "Can FTAS integrate with our current systems?",
    answer:
      "Yes. FTAS is designed for API-driven integration with existing CRMs, support tools, payment workflows, data stores, and custom internal systems.",
    category: "Platform",
  },
  {
    id: "is-pricing-fixed-or-custom",
    question: "Is FTAS pricing fixed or customizable?",
    answer:
      "Launch and Scale plans are structured, while Enterprise engagements are architecture-based and quoted according to integration scope, support model, and security requirements.",
    category: "Pricing",
  },
  {
    id: "what-support-model-is-available",
    question: "What support and incident response model is available?",
    answer:
      "FTAS provides operational support with SLA checkpoints, issue triage flows, monitoring, and continuous optimization cycles for production systems.",
    category: "Support",
  },
  {
    id: "how-is-data-protected",
    question: "How does FTAS handle security and data protection?",
    answer:
      "Delivery includes access boundaries, hardened infrastructure patterns, backup workflows, and observability-driven controls to reduce operational and data risk.",
    category: "Security",
  },
];
