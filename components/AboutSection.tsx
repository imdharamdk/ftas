"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, CircuitBoard, Factory, FlaskConical } from "lucide-react";
import { timeline } from "@/data/content";

export function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-kicker">
            <BadgeCheck className="h-4 w-4" />
            About FTAS
          </div>
          <h2 className="section-title">A high-trust fintech technology partner built for modern digital operations.</h2>
          <p className="section-copy">
            FTAS combines product engineering, AI automation, cloud reliability,
            and operational support into a unified SaaS delivery model for
            fintech, service, and growth-stage businesses.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: "AI-native automation", Icon: CircuitBoard },
              { label: "Product + infrastructure", Icon: FlaskConical },
              { label: "MSME registered company", Icon: Factory },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
              >
                <item.Icon className="h-5 w-5 text-cyan-200" />
                {item.label}
              </div>
            ))}
          </div>
          <Link href="/about" className="holo-button holo-button-secondary mt-6">
            Explore Company Profile
          </Link>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-200/0 via-cyan-200/40 to-violet-300/0 sm:block" />
          <div className="grid gap-5">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="premium-card cyber-border p-5 sm:ml-12"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-200/10 text-sm font-black text-cyan-50 shadow-neon">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
