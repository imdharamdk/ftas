import { PageHero } from "@/components/PageHero";

const sections = [
  {
    title: "Information we collect",
    body: "FTAS may collect contact details, organization information, usage events, and support communications submitted through platform forms and customer workflows.",
  },
  {
    title: "How information is used",
    body: "Data is used to deliver services, improve automation workflows, provide support, and maintain platform reliability and security controls.",
  },
  {
    title: "Security practices",
    body: "FTAS applies role-based controls, audit-friendly workflows, and infrastructure hardening patterns designed for high-trust digital operations.",
  },
  {
    title: "Data retention",
    body: "Data is retained only as needed for service delivery, compliance, and operational continuity. Retention scope can be tailored by contract.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy outlines how FTAS handles information across product interactions, service delivery, and operational support."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="premium-card p-5">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
