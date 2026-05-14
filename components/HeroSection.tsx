"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { trustSignals } from "@/data/content";
import { MagneticButton } from "./MagneticButton";
import { TerminalTicker } from "./TerminalTicker";

const ThreeAICore = dynamic(
  () => import("./ThreeAICore").then((module) => module.ThreeAICore),
  {
    ssr: false,
    loading: () => <div className="absolute inset-[18%] rounded-full border border-cyan-200/10" />,
  },
);

const SaaSPoints = [
  "Secure login and role-based access control",
  "Realtime analytics with automation alerts",
  "Subscription-ready fintech operations stack",
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-6rem)] items-center overflow-hidden px-5 pb-16 pt-12 sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 vertical-fade">
        <div className="absolute left-1/2 top-16 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-cyan-200/10 radial-mask" />
        <div className="absolute left-1/2 top-6 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-violet-300/10 radial-mask" />
        <div className="scanline absolute inset-x-0 top-10 h-44 animate-scan-line opacity-60" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.35 }}
            className="section-kicker"
          >
            <Cpu className="h-4 w-4" />
            AI-driven fintech SaaS platform
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.48 }}
          >
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/70">
              FTAS - Fintech Automated Solutions
            </p>
            <h1 className="display-title mt-5 max-w-3xl text-5xl font-bold leading-tight text-white sm:text-6xl xl:text-7xl">
              Build A Trusted Fintech Operating System With AI Automation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              FTAS helps teams launch secure products, orchestrate workflows, and run high-confidence infrastructure with enterprise-grade SaaS discipline.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.66 }}
            className="mt-7 grid gap-2"
          >
            {SaaSPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-slate-200">
                <ShieldCheck className="h-4 w-4 text-signal" />
                <span>{point}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.82 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href="/command-center">
              <Zap className="h-4 w-4" />
              Launch AI Command Center
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="/api-management" variant="secondary">
              <Sparkles className="h-4 w-4" />
              Configure Providers
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.92 }}
            className="max-w-2xl"
          >
            <TerminalTicker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.08 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5"
          >
            {trustSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 backdrop-blur"
              >
                <div className="text-xs text-cyan-100/65">{signal.label}</div>
                <div className="mt-1 text-sm font-semibold text-white">{signal.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div data-parallax-depth="0.08">
          <HeroLabVisual />
        </div>
      </div>
    </section>
  );
}

function HeroLabVisual() {
  const rings = [0, 1, 2];
  const nodes = [
    { label: "Auth Hub", x: "14%", y: "9%" },
    { label: "Analytics", x: "66%", y: "11%" },
    { label: "Automation", x: "8%", y: "58%" },
    { label: "Billing", x: "72%", y: "58%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.64 }}
      className="relative mx-auto aspect-square w-full max-w-[36rem]"
    >
      <div className="absolute inset-0 rounded-full border border-cyan-200/15 radial-mask" />
      <div className="absolute inset-[8%] rounded-full border border-violet-300/15 radial-mask" />
      <div className="absolute inset-[14%] animate-rotate-slow rounded-full border border-dashed border-cyan-200/25 radial-mask" />
      <div className="absolute inset-[4%] rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(0,231,255,0.12),transparent,rgba(138,92,255,0.12),transparent)] blur-xl" />

      {rings.map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-cyan-200/20"
          style={{ inset: `${18 + ring * 10}%` }}
          animate={{ rotate: ring % 2 ? -360 : 360 }}
          transition={{ duration: 26 + ring * 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-neon" />
        </motion.div>
      ))}

      <div className="absolute left-[10%] top-[16%] z-0 aspect-square w-[56%] overflow-hidden rounded-full">
        <ThreeAICore />
      </div>

      <div className="absolute right-1 top-[38%] z-30 h-32 w-32 -translate-y-1/2 sm:right-2 sm:h-40 sm:w-40">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-full w-full place-items-center rounded-lg border border-cyan-200/35 bg-black/25 shadow-neon backdrop-blur-md"
        >
          <div className="absolute inset-0 fine-grid opacity-35" />
          <div className="relative text-center">
            <div className="text-xs text-cyan-100/70">LIVE OPS</div>
            <div className="mt-2 text-3xl font-black text-white sm:text-4xl">99.94%</div>
            <div className="mt-1 text-[11px] font-semibold uppercase text-signal">uptime</div>
          </div>
        </motion.div>
      </div>

      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute z-30 rounded-lg border border-white/10 bg-black/65 px-3 py-2 text-xs font-semibold text-cyan-50 shadow-neon backdrop-blur-xl"
          style={{ left: node.x, top: node.y }}
          animate={{ y: [0, index % 2 ? 10 : -10, 0] }}
          transition={{ duration: 4.4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          {node.label}
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-1/2 z-30 w-[78%] -translate-x-1/2 rounded-lg border border-cyan-200/15 bg-black/70 p-4 shadow-2xl backdrop-blur-xl sm:bottom-3">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span>Realtime Throughput</span>
          <span className="text-signal">+31% this month</span>
        </div>
        <div className="grid grid-cols-12 items-end gap-1">
          {Array.from({ length: 24 }, (_, index) => (
            <span
              key={index}
              className="block rounded-sm bg-gradient-to-t from-cyan-400 to-violet-300"
              style={{
                height: `${14 + ((index * 13) % 42)}px`,
                animation: `signal-wave ${1.8 + (index % 5) * 0.2}s ease-in-out infinite`,
                animationDelay: `${index * 0.04}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
