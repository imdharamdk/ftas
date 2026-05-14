"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="section-shell pt-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58 }}
        className="glass-panel-strong relative overflow-hidden rounded-lg p-6 sm:p-9"
      >
        <div className="absolute inset-0 fine-grid opacity-25" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="relative">
          <div className="section-kicker">{eyebrow}</div>
          <h1 className="display-title mt-6 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </motion.div>
    </section>
  );
}
