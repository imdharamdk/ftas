"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu } from "lucide-react";
import { pricingPlans, services } from "@/data/content";

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
        <h2 className="section-title">Premium engineering modules for fintech SaaS, automation, and infrastructure.</h2>
        <p className="section-copy">
          FTAS services are productized into connected layers so design,
          development, automation, support, and infrastructure move as one
          scalable operating system.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/services" className="holo-button holo-button-secondary">
            View Full Service Catalog
          </Link>
          <Link href="/pricing" className="holo-button holo-button-primary">
            Explore Pricing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
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

      <div id="pricing" className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="display-title text-2xl font-semibold text-white sm:text-3xl">Platform plans for every growth stage.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              Start with a pilot, scale into full workflow orchestration, or request a custom enterprise architecture engagement.
            </p>
          </div>
          <Link href="/pricing" className="hidden text-sm font-semibold text-cyan-50 hover:text-cyan-100 sm:inline-flex">
            Compare plans in detail
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.54, delay: index * 0.05 }}
              className={`premium-card p-6 ${plan.highlight ? "ring-1 ring-cyan-200/35" : ""}`}
            >
              {plan.highlight && (
                <div className="mb-4 inline-flex rounded-md border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-50">
                  {plan.highlight}
                </div>
              )}
              <h4 className="text-xl font-semibold text-white">{plan.name}</h4>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-black text-white">{plan.price}</span>
                <span className="pb-1 text-xs uppercase tracking-wide text-cyan-100/70">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{plan.tagline}</p>
              <p className="mt-3 text-xs text-slate-400">{plan.idealFor}</p>
              <div className="mt-5 grid gap-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                    {feature}
                  </div>
                ))}
              </div>
              <Link href="/contact#demo" className="holo-button holo-button-primary mt-5 w-full">
                Request {plan.name} Consultation
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
