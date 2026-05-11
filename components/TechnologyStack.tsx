"use client";

import { motion } from "framer-motion";
import { Boxes } from "lucide-react";
import { techModules } from "@/data/content";

const toneMap: Record<string, string> = {
  cyan: "from-cyan-300/30 to-cyan-300/5 border-cyan-200/30 text-cyan-50",
  green: "from-emerald-300/25 to-emerald-300/5 border-emerald-200/30 text-emerald-50",
  blue: "from-blue-300/25 to-blue-300/5 border-blue-200/30 text-blue-50",
  amber: "from-amber-300/25 to-amber-300/5 border-amber-200/30 text-amber-50",
  violet: "from-violet-300/25 to-violet-300/5 border-violet-200/30 text-violet-50",
  indigo: "from-indigo-300/25 to-indigo-300/5 border-indigo-200/30 text-indigo-50",
  purple: "from-fuchsia-300/25 to-fuchsia-300/5 border-fuchsia-200/30 text-fuchsia-50",
};

export function TechnologyStack() {
  return (
    <section id="technology" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl text-center"
      >
        <div className="section-kicker">
          <Boxes className="h-4 w-4" />
          Technology stack
        </div>
        <h2 className="section-title mx-auto">Floating modules for modern software, AI, and infrastructure.</h2>
        <p className="section-copy mx-auto">
          FTAS selects tools by outcome: stable interfaces, maintainable code,
          reliable servers, AI-ready integrations, and automation systems that
          can keep evolving.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-14 min-h-[32rem] max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-black/25 p-5 backdrop-blur">
        <div className="absolute inset-0 fine-grid opacity-35" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15" />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techModules.map((tech, index) => (
            <motion.article
              key={tech.name}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              animate={{ y: [0, index % 2 ? 10 : -10, 0] }}
              transition={{
                opacity: { duration: 0.45, delay: index * 0.06 },
                y: { duration: 5 + index * 0.12, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 0.45 },
              }}
              className={`relative overflow-hidden rounded-lg border bg-gradient-to-br p-5 shadow-2xl backdrop-blur-xl ${
                toneMap[tech.tone] ?? toneMap.cyan
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="text-2xl font-black">{tech.name}</div>
              <div className="mt-2 text-sm opacity-75">{tech.layer}</div>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-current" />
                <span className="text-xs font-semibold uppercase opacity-70">holographic module</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
