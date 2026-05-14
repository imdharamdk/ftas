"use client";

import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import Link from "next/link";
import { automationWorkflow, productHighlights } from "@/data/content";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function AutomationWorkflowSection() {
  return (
    <section id="automation-workflow" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SectionIntro
          eyebrow="AI automation workflow"
          title="From business signal to automated execution."
          copy="FTAS designs SaaS automation flows around measurable lifecycle steps: capture events, classify context, execute actions, and monitor outcomes."
          Icon={Workflow}
        />

        <Reveal className="glass-panel-strong hud-scan rounded-lg p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between rounded-lg border border-signal/20 bg-black/45 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-signal">
              <span className="status-dot" />
              automation.pipeline
            </div>
            <div className="text-xs text-cyan-100/50">live model</div>
          </div>
          <div className="space-y-3">
            {automationWorkflow.map((stage, index) => (
              <motion.article
                key={stage.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.52, delay: index * 0.08 }}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                    <stage.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-cyan-100/55">{stage.meta}</div>
                    <h3 className="mt-1 text-lg font-semibold text-white">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <Link href="/features" className="holo-button holo-button-secondary mt-5 w-full">
            Explore Full Feature Library
          </Link>
        </Reveal>
      </div>

      <Reveal className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {productHighlights.map((item) => (
          <article key={item.title} className="premium-card p-5">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
              <item.Icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-xs font-semibold uppercase text-cyan-100/55">{item.meta}</div>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
