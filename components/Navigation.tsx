"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, Radio, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./LogoMark";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Why", href: "#why-ftas" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "R&D", href: "#rd" },
  { label: "Technology", href: "#technology" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
      className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/10 bg-black/35 px-4 py-3 shadow-2xl backdrop-blur-2xl">
        <a href="#home" aria-label="FTAS home" className="flex items-center gap-3">
          <LogoMark compact />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">FTAS</div>
            <div className="text-xs text-cyan-100/70">Intelligent Infrastructure</div>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-10 items-center gap-2 rounded-md border border-cyan-200/30 bg-cyan-200/10 px-4 text-sm font-semibold text-cyan-50 shadow-neon transition hover:border-cyan-100/70 hover:bg-cyan-200/20 sm:inline-flex"
          >
            <Radio className="h-4 w-4" />
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-lg border border-white/10 bg-black/75 p-2 backdrop-blur-2xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-cyan-200/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-md border border-cyan-200/30 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-50"
            >
              <Radio className="h-4 w-4" />
              Contact FTAS
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
