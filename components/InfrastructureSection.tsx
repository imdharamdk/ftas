"use client";

import { motion } from "framer-motion";
import { DatabaseZap } from "lucide-react";
import { caseStudySignals, infrastructureLayers } from "@/data/content";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="section-shell">
      <SectionIntro
        eyebrow="Intelligent infrastructure"
        title="A connected architecture for interfaces, automation, compute, and operations."
        copy="The FTAS model is built around layers that can be delivered independently or composed into a stronger digital operating system."
        Icon={DatabaseZap}
        align="center"
        className="max-w-5xl"
      />

      <div className="relative mt-14 grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <Reveal className="hud-scan glass-panel-strong rounded-lg p-5 sm:p-7">
          <div className="relative min-h-[34rem] overflow-hidden rounded-lg border border-cyan-200/10 bg-black/35 p-4">
            <div className="absolute inset-0 fine-grid opacity-40" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15" />
            <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-cyan-200/35 bg-black/70 shadow-neon backdrop-blur-xl">
              <div className="text-center">
                <div className="text-xs text-cyan-100/65">FTAS OS</div>
                <div className="mt-2 text-2xl font-black text-white">CORE</div>
              </div>
            </div>

            {infrastructureLayers.map((layer, index) => {
              const positions = [
                "left-4 top-5",
                "right-4 top-20",
                "left-4 bottom-24",
                "right-4 bottom-5",
              ];
              return (
                <motion.article
                  key={layer.title}
                  className={`absolute ${positions[index]} w-[min(14rem,42vw)] rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur-xl`}
                  animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
                  transition={{ duration: 4.6 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <layer.Icon className="h-5 w-5 text-cyan-200" />
                  <div className="mt-3 text-sm font-semibold text-white">{layer.title}</div>
                  <div className="mt-1 text-xs text-cyan-100/60">{layer.meta}</div>
                </motion.article>
              );
            })}
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
