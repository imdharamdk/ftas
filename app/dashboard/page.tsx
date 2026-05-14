"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BellRing,
  CircleCheck,
  Clock4,
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  UserCog,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHero } from "@/components/PageHero";

const usageSeries = [
  { day: "Mon", throughput: 64, alerts: 9 },
  { day: "Tue", throughput: 72, alerts: 7 },
  { day: "Wed", throughput: 70, alerts: 6 },
  { day: "Thu", throughput: 84, alerts: 5 },
  { day: "Fri", throughput: 88, alerts: 4 },
  { day: "Sat", throughput: 79, alerts: 6 },
  { day: "Sun", throughput: 91, alerts: 3 },
];

const marketSeries = [
  { pair: "BTC/USD", value: 64320, delta: "+2.4%" },
  { pair: "ETH/USD", value: 3188, delta: "+1.3%" },
  { pair: "NIFTY-FIN", value: 22814, delta: "+0.8%" },
  { pair: "NASDAQ", value: 18104, delta: "+0.5%" },
];

const activityLogs = [
  { time: "10:34", action: "workflow.route executed", actor: "automation.bot", result: "success" },
  { time: "09:58", action: "subscription.renewal confirmed", actor: "billing.service", result: "success" },
  { time: "09:12", action: "incident.escalation opened", actor: "support.lead", result: "attention" },
  { time: "08:47", action: "role.policy updated", actor: "admin", result: "success" },
];

const onboardingSteps = [
  "Discovery and workflow mapping",
  "Environment and integration setup",
  "Automation and dashboard rollout",
  "Support handoff and optimization",
];

export default function DashboardPage() {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [savedWidgets, setSavedWidgets] = useState<string[]>(["Uptime", "Workflow Throughput"]);
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  const summaryCards = useMemo(
    () =>
      role === "admin"
        ? [
            { label: "Active users", value: "1,284", trend: "+8%" },
            { label: "MRR tracked", value: "$142k", trend: "+5.9%" },
            { label: "API success", value: "99.8%", trend: "+0.4%" },
            { label: "Incident SLA", value: "97.6%", trend: "+1.2%" },
          ]
        : [
            { label: "Tasks completed", value: "312", trend: "+16%" },
            { label: "Saved automations", value: "18", trend: "+3" },
            { label: "Alert response", value: "1.9m", trend: "-18s" },
            { label: "Plan utilization", value: "78%", trend: "+4%" },
          ],
    [role],
  );

  const toggleSavedWidget = (item: string) => {
    setSavedWidgets((current) =>
      current.includes(item) ? current.filter((widget) => widget !== item) : [...current, item],
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Interactive FTAS Product Preview For Operators And Admin Teams."
        description="Switch between user and admin roles, review analytics, monitor system health, and test support and onboarding flows."
        actions={
          <>
            <button
              type="button"
              onClick={() => setRole((current) => (current === "user" ? "admin" : "user"))}
              className="holo-button holo-button-primary"
            >
              <UserCog className="h-4 w-4" />
              Switch To {role === "user" ? "Admin" : "User"} View
            </button>
            <Link href="/contact#demo" className="holo-button holo-button-secondary">
              Request Live Demo
            </Link>
          </>
        }
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article key={card.label} className="premium-card p-5">
              <div className="text-xs text-cyan-100/60">{card.label}</div>
              <div className="mt-2 text-3xl font-black text-white">{card.value}</div>
              <div className="mt-2 text-xs text-signal">{card.trend}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel-strong rounded-lg p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Workflow Throughput</h2>
              <span className="inline-flex items-center gap-2 text-xs text-signal">
                <Activity className="h-4 w-4" />
                realtime
              </span>
            </div>
            <div className="h-64">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageSeries}>
                    <defs>
                      <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e7ff" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#00e7ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                    <XAxis dataKey="day" stroke="rgba(148, 163, 184, 0.65)" />
                    <YAxis stroke="rgba(148, 163, 184, 0.65)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(3, 10, 20, 0.92)",
                        border: "1px solid rgba(0, 231, 255, 0.2)",
                        borderRadius: "10px",
                      }}
                    />
                    <Area
                      dataKey="throughput"
                      stroke="#00e7ff"
                      fill="url(#throughputGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-lg border border-white/10 bg-white/5" />
              )}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white">Market Widget Preview</h2>
            <p className="mt-2 text-xs text-slate-300">
              Trading-style indicators for market-aware decision support modules.
            </p>
            <div className="mt-4 space-y-2">
              {marketSeries.map((item) => (
                <div key={item.pair} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
                  <span className="font-semibold text-slate-100">{item.pair}</span>
                  <span className="text-slate-300">{item.value.toLocaleString()}</span>
                  <span className="text-signal">{item.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <article className="glass-panel rounded-lg p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <BellRing className="h-5 w-5 text-cyan-100" />
              Notification center
            </div>
            <div className="grid gap-2 text-sm text-slate-200">
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                High-priority ticket assigned to incident responder.
              </p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                Billing sync completed successfully for 124 accounts.
              </p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                API latency spike detected and auto-scaled.
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-signal/20 bg-signal/10 px-3 py-2 text-xs font-semibold text-signal">
              <ShieldCheck className="h-4 w-4" />
              System health indicator: Stable
            </div>
          </article>

          <article className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white">Activity logs</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-xs">
                <thead>
                  <tr className="text-left text-cyan-100/65">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Action</th>
                    <th className="pb-2">Actor</th>
                    <th className="pb-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((log) => (
                    <tr key={`${log.time}-${log.action}`} className="border-t border-white/10">
                      <td className="py-2 text-slate-300">{log.time}</td>
                      <td className="py-2 text-slate-100">{log.action}</td>
                      <td className="py-2 text-slate-300">{log.actor}</td>
                      <td className="py-2">
                        <span
                          className={`rounded-md px-2 py-1 ${
                            log.result === "success"
                              ? "bg-signal/10 text-signal"
                              : "bg-amber-300/10 text-amber-200"
                          }`}
                        >
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="premium-card p-5">
            <h2 className="text-lg font-semibold text-white">Saved widgets</h2>
            <p className="mt-2 text-xs text-slate-300">Toggle dashboard modules to personalize the user experience.</p>
            <div className="mt-4 grid gap-2">
              {["Uptime", "Workflow Throughput", "Incident Queue", "Billing Summary"].map((item) => {
                const active = savedWidgets.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSavedWidget(item)}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                      active
                        ? "border-cyan-200/30 bg-cyan-200/10 text-cyan-50"
                        : "border-white/10 bg-white/5 text-slate-200"
                    }`}
                  >
                    {item}
                    {active && <CircleCheck className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="premium-card p-5">
            <h2 className="text-lg font-semibold text-white">Client onboarding flow</h2>
            <div className="mt-4 grid gap-2">
              {onboardingSteps.map((step, index) => (
                <div key={step} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                  <span className="mr-2 text-cyan-100/65">0{index + 1}</span>
                  {step}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact#demo" className="holo-button holo-button-primary">
                Request Demo Flow
              </Link>
              <Link href="/profile" className="holo-button holo-button-secondary">
                Open Profile
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <article className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white">Support ticket system</h2>
            <form className="mt-4 grid gap-3">
              <input className="form-field" placeholder="Issue title" />
              <textarea className="form-field min-h-28 resize-none" placeholder="Describe the issue..." />
              <button type="button" className="holo-button holo-button-primary w-full sm:w-auto">
                <LifeBuoy className="h-4 w-4" />
                Create Support Ticket
              </button>
            </form>
          </article>
          <article className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white">Alerts vs throughput snapshot</h2>
            <div className="mt-4 h-60">
              {chartsReady ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                    <XAxis dataKey="day" stroke="rgba(148, 163, 184, 0.65)" />
                    <YAxis stroke="rgba(148, 163, 184, 0.65)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(3, 10, 20, 0.92)",
                        border: "1px solid rgba(0, 231, 255, 0.2)",
                        borderRadius: "10px",
                      }}
                    />
                    <Bar dataKey="alerts" fill="#8a5cff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full rounded-lg border border-white/10 bg-white/5" />
              )}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-300">
              <Clock4 className="h-4 w-4" />
              Updated every 15 minutes
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="premium-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="display-title text-3xl font-semibold text-white">Need custom dashboards and alerts?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                FTAS can customize dashboard modules, workflow logic, and notification policies for your business model.
              </p>
            </div>
            <Link href="/contact#demo" className="holo-button holo-button-primary">
              <TrendingUp className="h-4 w-4" />
              Book Product Walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
