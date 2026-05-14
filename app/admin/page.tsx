import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard"
        title="Administrative Controls For Platform Reliability And Governance."
        description="Use admin mode to review system health, role policies, workflow controls, and operational audit surfaces."
        actions={
          <Link href="/dashboard" className="holo-button holo-button-primary">
            Open Dashboard Preview
          </Link>
        }
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="premium-card p-5">
            <h2 className="text-lg font-semibold text-white">Role policy control</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Manage feature access, account states, and workflow permissions for user and manager groups.
            </p>
          </article>
          <article className="premium-card p-5">
            <h2 className="text-lg font-semibold text-white">System governance</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Track incident SLA, approval chains, and infrastructure health across enterprise environments.
            </p>
          </article>
        </div>
        <div className="glass-panel mt-4 rounded-lg p-5 text-sm text-slate-300">
          <div className="inline-flex items-center gap-2 rounded-md border border-signal/25 bg-signal/10 px-3 py-2 text-xs font-semibold text-signal">
            <ShieldCheck className="h-4 w-4" />
            Admin visibility mode active
          </div>
        </div>
      </section>
    </>
  );
}
