"use client";

import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { processSteps } from "@/data/content";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function ProcessSection() {
  return (
    <section id="process" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <SectionIntro
          eyebrow="Operating process"
          title="A clean delivery model from research to maintained systems."
          copy="The process is structured for real clients: clear discovery, practical architecture, production development, automation, and ongoing operational care."
          Icon={Settings2}
        />

        <div className="relative">
          <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan-200/0 via-cyan-200/35 to-violet-300/0 sm:block" />
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.58, delay: index * 0.06 }}
                className="premium-card p-5 sm:ml-12"
              >
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-sm font-black text-cyan-50 shadow-neon">
                    {step.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <div className="hud-label">{step.output}</div>
                    </div>
                    <p className="mt-3 leading-7 text-slate-300">{step.description}</p>
                  </div>
                  <step.Icon className="absolute right-0 top-0 h-5 w-5 text-cyan-100/40 sm:static sm:h-6 sm:w-6" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mt-10 rounded-lg border border-cyan-200/15 bg-black/35 p-4 backdrop-blur">
        <div className="grid gap-3 md:grid-cols-5">
          {processSteps.map((step) => (
            <div key={step.step} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="text-xs text-cyan-100/55">{step.step}</div>
              <div className="mt-2 text-sm font-semibold text-white">{step.title}</div>
              <div className="mt-3 h-1 rounded-md bg-gradient-to-r from-cyan-300 to-violet-300" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
