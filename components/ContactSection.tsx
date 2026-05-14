"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MapPin, Send, TerminalSquare } from "lucide-react";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-kicker">
            <TerminalSquare className="h-4 w-4" />
            Contact
          </div>
          <h2 className="section-title">Start your FTAS onboarding and request a live SaaS demo.</h2>
          <p className="section-copy">
            Tell us what you need to launch or scale, and we will map a secure
            implementation plan across product, automation, and infrastructure.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="glass-panel flex items-center gap-4 rounded-lg p-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Email</div>
                <a href="mailto:contact@ftas.in" className="font-semibold text-white">
                  contact@ftas.in
                </a>
              </div>
            </div>
            <div className="glass-panel flex items-center gap-4 rounded-lg p-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-violet-200/25 bg-violet-300/10 text-violet-100">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Operating model</div>
                <div className="font-semibold text-white">Digital-first MSME technology partner</div>
              </div>
            </div>
            <Link id="demo" href="/contact" className="glass-panel flex items-center gap-4 rounded-lg p-4 transition hover:border-cyan-200/40">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Request demo flow</div>
                <div className="font-semibold text-white">Schedule strategy call and platform walkthrough</div>
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75 }}
          className="glass-panel-strong cyber-border rounded-lg p-5 sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between rounded-lg border border-signal/20 bg-black/35 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-signal">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_rgba(65,255,180,0.65)]" />
              terminal.contact
            </div>
            <div className="hidden text-xs text-cyan-100/55 sm:block">secure intake panel</div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-cyan-50">Name</span>
              <input className="form-field" placeholder="Your name" type="text" name="name" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-cyan-50">Email</span>
              <input className="form-field" placeholder="you@company.com" type="email" name="email" />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-cyan-50">Project Focus</span>
            <input
              className="form-field"
              placeholder="AI automation, web portal, cloud, support..."
              type="text"
              name="focus"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-cyan-50">Message</span>
            <textarea
              className="form-field min-h-36 resize-none"
              placeholder="Describe the infrastructure, software, or workflow you want to build."
              name="message"
            />
          </label>

          <button type="submit" className="holo-button holo-button-primary mt-6 w-full">
            <Send className="h-4 w-4" />
            Transmit Request
            <ArrowRight className="h-4 w-4" />
          </button>

          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg border border-signal/25 bg-signal/10 px-4 py-3 text-sm font-semibold text-signal"
            >
              Request signal staged. FTAS intake channel standing by.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
