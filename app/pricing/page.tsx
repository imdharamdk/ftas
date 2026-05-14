"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CreditCard, FileClock, SlidersHorizontal } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pricingPlans } from "@/data/content";

const billingHistory = [
  { invoice: "INV-3021", date: "2026-05-01", amount: "$2,400", status: "Paid" },
  { invoice: "INV-2988", date: "2026-04-01", amount: "$2,400", status: "Paid" },
  { invoice: "INV-2914", date: "2026-03-01", amount: "$2,100", status: "Paid" },
];

const featureAccessRows = [
  { feature: "Role-based access", launch: true, scale: true, enterprise: true },
  { feature: "Automation workflows", launch: true, scale: true, enterprise: true },
  { feature: "Advanced analytics", launch: false, scale: true, enterprise: true },
  { feature: "Dedicated architect", launch: false, scale: false, enterprise: true },
  { feature: "SLA incident response", launch: false, scale: true, enterprise: true },
];

export default function PricingPage() {
  const [sortOrder, setSortOrder] = useState<"default" | "name">("default");

  const sortedPlans = useMemo(() => {
    const next = [...pricingPlans];
    if (sortOrder === "name") {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }
    return next;
  }, [sortOrder]);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Subscription Plans Built For Fintech Product And Infrastructure Growth."
        description="Compare plans, evaluate feature access, and review billing flow placeholders for seamless payment integration."
        actions={
          <>
            <Link href="/contact#demo" className="holo-button holo-button-primary">
              Start Plan Consultation
            </Link>
            <a href="/ftas-brochure.pdf" download className="holo-button holo-button-secondary">
              Download Brochure
            </a>
          </>
        }
      />

      <section className="section-shell pt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">Plan comparison</h2>
          <label className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as "default" | "name")}
              className="bg-transparent text-sm text-white outline-none"
            >
              <option value="default" className="bg-[#041226]">
                Recommended
              </option>
              <option value="name" className="bg-[#041226]">
                Name
              </option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {sortedPlans.map((plan) => (
            <article key={plan.name} className={`premium-card p-6 ${plan.highlight ? "ring-1 ring-cyan-200/35" : ""}`}>
              {plan.highlight && (
                <div className="mb-4 inline-flex rounded-md border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-50">
                  {plan.highlight}
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="pb-1 text-xs uppercase tracking-wide text-cyan-100/60">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{plan.tagline}</p>
              <p className="mt-3 text-xs text-slate-400">{plan.idealFor}</p>
              <div className="mt-5 grid gap-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                    {feature}
                  </div>
                ))}
              </div>
              <Link href="/contact#demo" className="holo-button holo-button-primary mt-5 w-full">
                Choose {plan.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel-strong rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white">Feature access control</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="text-left text-cyan-100/70">
                    <th className="pb-3">Capability</th>
                    <th className="pb-3">Launch</th>
                    <th className="pb-3">Scale</th>
                    <th className="pb-3">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureAccessRows.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="py-2 text-slate-200">{row.feature}</td>
                      <PlanCell enabled={row.launch} />
                      <PlanCell enabled={row.scale} />
                      <PlanCell enabled={row.enterprise} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="glass-panel rounded-lg p-5">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <CreditCard className="h-5 w-5 text-cyan-100" />
                Subscription management
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Manage upgrades, downgrades, lifecycle renewals, and payment gateway callbacks through modular billing integrations.
              </p>
              <button type="button" className="holo-button holo-button-secondary mt-4 w-full">
                Payment Gateway Integration Placeholder
              </button>
            </article>

            <article className="glass-panel rounded-lg p-5">
              <div className="flex items-center gap-2 text-lg font-semibold text-white">
                <FileClock className="h-5 w-5 text-cyan-100" />
                Billing history
              </div>
              <div className="mt-4 grid gap-2 text-xs">
                {billingHistory.map((entry) => (
                  <div key={entry.invoice} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-slate-100">{entry.invoice}</span>
                    <span className="text-slate-300">{entry.date}</span>
                    <span className="text-cyan-100">{entry.amount}</span>
                    <span className="text-signal">{entry.status}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="premium-card p-6 text-center sm:p-8">
          <h2 className="display-title text-3xl font-semibold text-white">Need custom enterprise billing and compliance mapping?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            FTAS can tailor subscription architecture, invoice workflows, and controls for your finance and operations requirements.
          </p>
          <Link href="/contact#demo" className="holo-button holo-button-primary mt-5 inline-flex">
            Speak to Solution Architect
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PlanCell({ enabled }: { enabled: boolean }) {
  return (
    <td className="py-2">
      <span
        className={`inline-flex rounded-md border px-2 py-1 text-xs ${
          enabled
            ? "border-signal/25 bg-signal/10 text-signal"
            : "border-white/10 bg-white/5 text-slate-400"
        }`}
      >
        {enabled ? "Included" : "Not included"}
      </span>
    </td>
  );
}
