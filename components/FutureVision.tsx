"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Orbit, Sparkles } from "lucide-react";
import { futureRoadmap, visionSignals } from "@/data/content";

export function FutureVision() {
  return (
    <section id="vision" className="section-shell">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 px-5 py-16 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="absolute inset-0 fine-grid opacity-30" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-kicker">
              <Sparkles className="h-4 w-4" />
              Future vision
            </div>
            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
              FTAS is evolving into a full-stack AI fintech SaaS ecosystem.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              The roadmap includes copilots, intelligent signal processing, and
              market-aware workflow modules that keep enterprise teams adaptive
              without sacrificing trust and control.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/features" className="holo-button holo-button-primary">
                Explore Product Roadmap
              </Link>
              <Link href="/contact#demo" className="holo-button holo-button-secondary">
                Book Strategy Session
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[26rem]"
          >
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="h-72 w-72 rounded-full border border-dashed border-cyan-200/25"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute h-52 w-52 rounded-full border border-violet-300/30"
              />
              <div className="absolute grid h-36 w-36 place-items-center rounded-lg border border-cyan-200/35 bg-black/55 text-center shadow-neon backdrop-blur-xl">
                <Orbit className="mx-auto h-8 w-8 text-cyan-100" />
                <div className="mt-3 text-sm font-semibold text-white">Digital Ecosystem</div>
              </div>
            </div>
            {visionSignals.map((signal, index) => (
              <motion.div
                key={signal}
                className="absolute hidden max-w-48 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 backdrop-blur-xl sm:block"
                style={{
                  left: `${index % 2 === 0 ? 0 : 58}%`,
                  top: `${8 + index * 17}%`,
                }}
                animate={{ x: [0, index % 2 ? -8 : 8, 0] }}
                transition={{ duration: 4.4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" />
                {signal}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="relative mt-8 grid gap-3 sm:hidden">
          {visionSignals.map((signal) => (
            <div key={signal} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-200" />
              {signal}
            </div>
          ))}
        </div>

        <div className="relative mt-10 grid gap-4 lg:grid-cols-3">
          {futureRoadmap.map((item) => (
            <article key={item.title} className="premium-card p-5">
              <div className="inline-flex rounded-md border border-cyan-200/30 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold text-cyan-50">
                {item.stage}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
