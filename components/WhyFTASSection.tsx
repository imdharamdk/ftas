"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { deliverySignals, proofMetrics, valuePillars } from "@/data/content";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function WhyFTASSection() {
  return (
    <section id="why-ftas" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionIntro
          eyebrow="Why FTAS"
          title="A believable technology partner for companies that need more than a website."
          copy="FTAS positions digital products as operating infrastructure: software that can be maintained, automated, monitored, and improved as the business grows."
          Icon={ShieldCheck}
        />

        <div className="grid gap-4">
          {valuePillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.62, delay: index * 0.07 }}
              whileHover={{ x: -4 }}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
              }}
              className="premium-card p-5 sm:p-6"
            >
              <div className="relative flex flex-col gap-5 sm:flex-row">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-neon">
                  <pillar.Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="hud-label">{pillar.meta}</div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{pillar.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Reveal className="mt-10 grid gap-4 md:grid-cols-4">
        {proofMetrics.map((metric) => (
          <div key={metric.label} className="glass-panel rounded-lg p-5">
            <div className="text-3xl font-black text-white">{metric.value}</div>
            <div className="mt-2 text-sm text-slate-400">{metric.label}</div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {deliverySignals.map((signal) => (
          <article key={signal.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-signal/20 bg-signal/10 text-signal">
                <signal.Icon className="h-5 w-5" />
              </div>
              <CheckCircle2 className="ml-auto h-5 w-5 text-cyan-100/70" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{signal.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{signal.description}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
