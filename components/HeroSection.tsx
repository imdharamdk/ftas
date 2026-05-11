"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Sparkles, Zap } from "lucide-react";
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

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-10 lg:pt-32"
    >
      <div className="absolute inset-0 vertical-fade">
        <div className="absolute left-1/2 top-24 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-cyan-200/10 radial-mask" />
        <div className="absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-violet-300/10 radial-mask" />
        <div className="scanline absolute inset-x-0 top-10 h-44 animate-scan-line opacity-60" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.55 }}
            className="section-kicker"
          >
            <Cpu className="h-4 w-4" />
            MSME technology company
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.68 }}
          >
            <h1 className="mt-7 text-6xl font-black leading-none text-white sm:text-8xl lg:text-[8.5rem]">
              FTAS
            </h1>
            <p className="mt-4 text-2xl font-semibold text-cyan-50 sm:text-4xl">
              Fintech Automated Solutions
            </p>
            <p className="mt-6 max-w-2xl text-3xl font-semibold leading-tight text-hologram sm:text-5xl">
              Engineering Intelligent Digital Infrastructure
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.86 }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            FTAS combines AI, automation, cloud infrastructure, web systems,
            telecommunications, support, and research into future-ready digital
            operating systems for modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 1 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href="#contact">
              <Zap className="h-4 w-4" />
              Initialize Consultation
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#services" variant="secondary">
              <Sparkles className="h-4 w-4" />
              Explore Systems
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.08 }}
            className="max-w-2xl"
          >
            <TerminalTicker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.16 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5"
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
    { label: "AI Core", x: "15%", y: "10%" },
    { label: "Cloud Control", x: "64%", y: "10%" },
    { label: "Portal Mesh", x: "9%", y: "57%" },
    { label: "Linux Grid", x: "72%", y: "55%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.78 }}
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

      <div className="absolute left-[10%] top-[18%] z-0 aspect-square w-[54%] overflow-hidden rounded-full sm:left-[11%] sm:top-[16%] sm:w-[55%]">
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
            <div className="text-xs text-cyan-100/70">FTAS CORE</div>
            <div className="mt-2 text-3xl font-black text-white sm:text-4xl">AI</div>
            <SoundWave />
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

      <div className="absolute left-0 top-[41%] z-30 hidden w-40 -translate-y-1/2 rounded-lg border border-cyan-200/15 bg-black/70 p-3 shadow-2xl backdrop-blur-xl sm:block">
        <div className="mb-3 text-xs font-semibold uppercase text-cyan-100/60">Command Route</div>
        {["signal", "logic", "deploy"].map((item, index) => (
          <div key={item} className="mb-2 flex items-center gap-2 text-xs text-slate-300">
            <span className="status-dot" />
            <span>{item}</span>
            <span className="ml-auto text-cyan-100/45">0{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 z-30 w-[76%] -translate-x-1/2 rounded-lg border border-cyan-200/15 bg-black/70 p-4 shadow-2xl backdrop-blur-xl sm:bottom-3">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span>System Pulse</span>
          <span className="text-signal">Online</span>
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

function SoundWave() {
  return (
    <div className="mx-auto mt-4 flex h-10 w-28 items-center justify-center gap-1">
      {Array.from({ length: 13 }, (_, index) => (
        <span
          key={index}
          className="h-full w-1 rounded-sm bg-cyan-200"
          style={{
            animation: `signal-wave ${1.4 + (index % 4) * 0.16}s ease-in-out infinite`,
            animationDelay: `${index * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}
