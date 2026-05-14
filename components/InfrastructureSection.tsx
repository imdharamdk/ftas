"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, DatabaseZap, RefreshCw } from "lucide-react";
import { caseStudySignals, infrastructureLayers } from "@/data/content";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

const dashboardMetrics = [
  { label: "API Uptime", value: "99.94%", trend: "+0.3%" },
  { label: "Alerts Resolved", value: "248", trend: "+21" },
  { label: "Workflow Success", value: "98.1%", trend: "+1.2%" },
  { label: "Avg Response", value: "1.7m", trend: "-14s" },
];

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="section-shell">
      <SectionIntro
        eyebrow="Dashboard preview"
        title="A live product view for operations, automation, and infrastructure confidence."
        copy="FTAS combines system health, workflow telemetry, and support observability into one interface so teams can execute faster with less operational uncertainty."
        Icon={DatabaseZap}
        align="center"
        className="max-w-5xl"
      />

      <div className="relative mt-14 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <Reveal className="hud-scan glass-panel-strong rounded-lg p-4 sm:p-6">
          <div className="relative min-h-[34rem] overflow-hidden rounded-lg border border-cyan-200/10 bg-black/35 p-4">
            <div className="absolute inset-0 fine-grid opacity-40" />
            <div className="relative">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <div>
                  <div className="text-xs uppercase text-cyan-100/60">FTAS Command Center</div>
                  <div className="text-sm font-semibold text-white">Realtime Operations Monitor</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-signal/20 bg-signal/10 px-3 py-1.5 text-xs font-semibold text-signal">
                  <span className="status-dot" />
                  System Healthy
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {dashboardMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-cyan-100/60">{metric.label}</div>
                    <div className="mt-1 text-2xl font-black text-white">{metric.value}</div>
                    <div className="mt-1 text-xs text-signal">{metric.trend}</div>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Workflow throughput</span>
                  <span className="text-cyan-100/70">24h</span>
                </div>
                <div className="grid grid-cols-12 items-end gap-1">
                  {Array.from({ length: 24 }, (_, index) => (
                    <motion.span
                      key={index}
                      className="block rounded-sm bg-gradient-to-t from-cyan-400 to-violet-300"
                      initial={{ scaleY: 0.2 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.02 }}
                      style={{
                        height: `${18 + ((index * 11) % 54)}px`,
                        transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                {[
                  "automation.pipeline.route completed in 1.2s",
                  "billing.webhook.sync reconciled 124 events",
                  "support.alert.priority-high assigned to on-call",
                ].map((line, index) => (
                  <div key={line} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="status-dot" />
                    <span>{line}</span>
                    <span className="ml-auto text-cyan-100/50">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-4">
          {infrastructureLayers.map((layer) => (
            <article key={layer.title} className="premium-card p-5">
              <div className="relative flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                  <layer.Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-cyan-100/60">{layer.meta}</div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{layer.description}</p>
                </div>
              </div>
            </article>
          ))}

          <article className="premium-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <Activity className="h-4 w-4" />
              API status + health monitoring
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Service reliability indicators and incident streams are available in the dashboard to support operational decisions in real time.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["payments-api", "analytics-api", "notification-api"].map((api) => (
                <span key={api} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">
                  {api}: operational
                </span>
              ))}
            </div>
            <Link href="/dashboard" className="holo-button holo-button-secondary mt-5">
              <RefreshCw className="h-4 w-4" />
              View Full Product Dashboard
            </Link>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-5 grid gap-4 lg:grid-cols-3">
        {caseStudySignals.map((signal) => (
          <div key={signal.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <div className="text-xs font-semibold uppercase text-cyan-100/60">{signal.label}</div>
            <div className="mt-3 text-lg font-semibold leading-7 text-white">{signal.value}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
