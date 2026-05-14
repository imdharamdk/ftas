"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { automationWorkflow, productHighlights } from "@/data/content";

const roleMatrix = [
  { feature: "Dashboard analytics", user: true, manager: true, admin: true },
  { feature: "Workflow automation edit", user: false, manager: true, admin: true },
  { feature: "Billing and subscription controls", user: false, manager: false, admin: true },
  { feature: "Support ticket center", user: true, manager: true, admin: true },
  { feature: "Activity logs", user: true, manager: true, admin: true },
];

export default function FeaturesPage() {
  const [openCard, setOpenCard] = useState(productHighlights[0]?.title ?? "");

  const healthBadges = useMemo(
    () => [
      { label: "API Gateway", status: "Operational" },
      { label: "Auth Services", status: "Operational" },
      { label: "Data Pipeline", status: "Monitoring" },
      { label: "Notifications", status: "Operational" },
    ],
    [],
  );

  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Built Like A Real SaaS Product: Secure, Observable, And Automation-Ready."
        description="Explore the FTAS feature stack across authentication, analytics, subscriptions, workflow control, and reliability tooling."
        actions={
          <>
            <Link href="/dashboard" className="holo-button holo-button-primary">
              See Dashboard
            </Link>
            <Link href="/pricing" className="holo-button holo-button-secondary">
              View Plan Access
            </Link>
          </>
        }
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 xl:grid-cols-2">
          {productHighlights.map((feature) => {
            const expanded = openCard === feature.title;
            return (
              <article key={feature.title} className="premium-card p-5">
                <button
                  type="button"
                  onClick={() => setOpenCard(expanded ? "" : feature.title)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                      <feature.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-cyan-100/60">{feature.meta}</div>
                      <h2 className="mt-2 text-xl font-semibold text-white">{feature.title}</h2>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-cyan-100/70 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && <p className="mt-4 text-sm leading-7 text-slate-300">{feature.description}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel-strong rounded-lg p-6">
            <div className="section-kicker">
              <LockKeyhole className="h-4 w-4" />
              Feature access control
            </div>
            <h2 className="display-title mt-5 text-3xl font-semibold text-white">Role-based entitlement matrix.</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead>
                  <tr className="text-left text-cyan-100/70">
                    <th className="pb-3 pr-2">Capability</th>
                    <th className="pb-3 px-2">User</th>
                    <th className="pb-3 px-2">Manager</th>
                    <th className="pb-3 pl-2">Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {roleMatrix.map((row) => (
                    <tr key={row.feature} className="border-t border-white/10">
                      <td className="py-3 pr-2 text-slate-200">{row.feature}</td>
                      <AccessCell enabled={row.user} />
                      <AccessCell enabled={row.manager} />
                      <AccessCell enabled={row.admin} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="premium-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                <ShieldCheck className="h-4 w-4" />
                API Status
              </div>
              <div className="mt-4 grid gap-2">
                {healthBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
                    <span className="text-slate-100">{badge.label}</span>
                    <span className="text-signal">{badge.status}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="premium-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                <Sparkles className="h-4 w-4" />
                Real-time alerts
              </div>
              <div className="mt-4 grid gap-2 text-xs text-slate-200">
                <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  `high_priority.support_ticket` assigned to escalation queue.
                </p>
                <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  `billing.retry.success` payment flow recovered automatically.
                </p>
                <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  `automation.latency` below SLA threshold for 7-day streak.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {automationWorkflow.map((stage) => (
            <article key={stage.title} className="premium-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                <stage.Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs font-semibold uppercase text-cyan-100/55">{stage.meta}</div>
              <h3 className="mt-2 text-lg font-semibold text-white">{stage.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AccessCell({ enabled }: { enabled: boolean }) {
  return (
    <td className="px-2 py-3">
      <span
        className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
          enabled
            ? "border-signal/25 bg-signal/10 text-signal"
            : "border-white/10 bg-white/5 text-slate-400"
        }`}
      >
        {enabled ? "Allowed" : "Restricted"}
      </span>
    </td>
  );
}
