"use client";

import { footerLinks, socialLinks } from "@/data/content";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/45 px-5 py-10 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="absolute inset-0 background-grid opacity-20" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <LogoMark compact animated={false} />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            FTAS - Fintech Automated Solutions. AI, automation, infrastructure,
            software support, web systems, and digital transformation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-200/50 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="grid h-10 min-w-10 place-items-center rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 text-sm font-semibold text-cyan-50 transition hover:border-cyan-100/60 hover:bg-cyan-200/20"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
