import { PageHero } from "@/components/PageHero";

const terms = [
  {
    title: "Service scope",
    body: "FTAS delivers software, automation, infrastructure, and support services based on agreed project scopes, milestones, and operational requirements.",
  },
  {
    title: "Client responsibilities",
    body: "Clients are responsible for accurate requirements, timely approvals, access provisioning, and compliance obligations specific to their domain.",
  },
  {
    title: "Billing and subscriptions",
    body: "Pricing and invoicing follow selected plans or custom enterprise agreements, including renewal and support terms where applicable.",
  },
  {
    title: "Support and uptime",
    body: "Support coverage, response windows, and incident workflows are defined by service tier and formal engagement terms.",
  },
  {
    title: "Intellectual property",
    body: "Ownership, licensing, and usage rights for deliverables are governed by the applicable signed contract between FTAS and the client.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="These terms govern usage of FTAS services, platform features, and contractual engagement expectations."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4">
          {terms.map((item) => (
            <article key={item.title} className="premium-card p-5">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
