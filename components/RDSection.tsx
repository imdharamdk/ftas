"use client";

import { motion } from "framer-motion";
import { FlaskConical, TerminalSquare } from "lucide-react";
import { rdPipelines, securitySignals } from "@/data/content";

export function RDSection() {
  return (
    <section id="rd" className="section-shell overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-kicker">
            <FlaskConical className="h-4 w-4" />
            R&D center
          </div>
          <h2 className="section-title">A cyber laboratory for automation, infrastructure, and applied intelligence.</h2>
          <p className="section-copy">
            FTAS treats research as a production pipeline: identify the signal,
            prototype the workflow, connect the infrastructure, and stabilize
            the system for real business use.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {rdPipelines.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="premium-card p-5"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                  <item.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[36rem]"
        >
          <LabDiagram />
        </motion.div>
      </div>
    </section>
  );
}

function LabDiagram() {
  const stream = ["input.signal", "ai.classify", "workflow.route", "infra.deploy", "support.observe"];

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 rounded-lg border border-cyan-200/10 bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-5 fine-grid rounded-lg opacity-55" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-300/20"
      />

      <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-cyan-200/35 bg-black/60 shadow-neon backdrop-blur-xl">
        <div className="text-center">
          <div className="text-xs text-cyan-100/70">R&D NODE</div>
          <div className="mt-2 text-3xl font-black text-white">FTAS</div>
        </div>
      </div>

      {rdPipelines.map((item, index) => {
        const positions = [
          "left-3 top-10",
          "right-3 top-20",
          "right-8 bottom-16",
          "left-8 bottom-20",
        ];
        return (
          <motion.div
            key={item.title}
            className={`absolute ${positions[index]} w-40 rounded-lg border border-white/10 bg-black/55 p-4 shadow-neon backdrop-blur-lg`}
            animate={{ y: [0, index % 2 ? 12 : -12, 0] }}
            transition={{ duration: 4 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
          >
            <item.Icon className="h-5 w-5 text-cyan-200" />
            <div className="mt-3 text-sm font-semibold text-white">{item.title}</div>
            <div className="mt-2 h-1 rounded-md bg-gradient-to-r from-cyan-300 to-violet-300" />
          </motion.div>
        );
      })}

      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-signal/20 bg-black/70 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-signal">
          <TerminalSquare className="h-4 w-4" />
          Research telemetry
        </div>
        <div className="space-y-2 font-mono text-xs text-cyan-100/80">
          {stream.map((line, index) => (
            <motion.div
              key={line}
              initial={{ opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.18 }}
              className="flex items-center justify-between gap-3"
            >
              <span>{line}</span>
              <span className="text-signal">active</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-5 top-5 grid gap-3">
        {securitySignals.map((signal) => (
          <div
            key={signal.title}
            className="hidden max-w-48 rounded-lg border border-cyan-200/15 bg-cyan-200/10 p-3 text-xs text-cyan-50 backdrop-blur md:block"
          >
            <signal.Icon className="mb-2 h-4 w-4" />
            <div className="font-semibold">{signal.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
