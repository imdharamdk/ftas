"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { services } from "@/data/content";

export function ServicesSection() {
  return (
    <section id="services" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <div className="section-kicker">
          <Cpu className="h-4 w-4" />
          Service matrix
        </div>
        <h2 className="section-title">Premium engineering services for intelligent digital operations.</h2>
        <p className="section-copy">
          Each service is designed as part of a connected technology stack:
          user interfaces, infrastructure, automation, support, telecom, and
          research moving as one system.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
            whileHover={{ y: -8, scale: 1.01 }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
              event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
            }}
            className="group premium-card cyber-border min-h-72 p-6"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-cyan-200/10" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-neon">
                  <service.Icon className="h-6 w-6" />
                </div>
                <span className="rounded-md border border-violet-200/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  {service.signal}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{service.description}</p>
              <div className="mt-7 h-1 overflow-hidden rounded-md bg-white/5">
                <motion.span
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: index * 0.04 }}
                  className="block h-full bg-gradient-to-r from-cyan-300 via-violet-300 to-signal"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
