"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, Search, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSelector } from "./LanguageSelector";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Features", href: "/features" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const activePath = useMemo(() => pathname, [pathname]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearch("");
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.68, ease: "easeOut", delay: 0.12 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <nav className="glass-panel-strong mx-auto flex max-w-7xl items-center gap-3 rounded-lg px-3 py-2.5 sm:px-4">
        <Link href="/" aria-label="FTAS home" className="flex shrink-0 items-center gap-3">
          <LogoMark compact />
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-white">FTAS Platform</div>
            <div className="text-xs text-cyan-100/70">Fintech Automated Solutions</div>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(activePath, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "border border-cyan-200/35 bg-cyan-200/15 font-semibold text-cyan-50 shadow-neon"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <form onSubmit={submitSearch} className="hidden items-center gap-2 lg:flex">
          <div className="flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Search className="h-4 w-4 text-cyan-100/70" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services, blog, FAQ..."
              className="w-52 bg-transparent text-xs text-white outline-none placeholder:text-slate-500 xl:w-64"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <LanguageSelector />
            <ThemeToggle />
          </div>
          <Link href="/login" className="hidden min-h-10 items-center rounded-md border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-100 transition hover:border-cyan-200/40 hover:text-white lg:inline-flex">
            Login
          </Link>
          <Link href="/contact#demo" className="hidden min-h-10 items-center gap-2 rounded-md border border-cyan-200/35 bg-cyan-200/15 px-3 text-xs font-semibold text-cyan-50 shadow-neon transition hover:border-cyan-100/80 hover:bg-cyan-200/20 sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            Request Demo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-white xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-strong mx-auto mt-2 grid max-w-7xl gap-2 rounded-lg p-3 xl:hidden"
          >
            <form onSubmit={submitSearch} className="mb-1 flex items-center gap-2">
              <div className="flex h-10 flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
                <Search className="h-4 w-4 text-cyan-100/70" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <button type="submit" className="holo-button holo-button-secondary min-h-10 px-3 py-0 text-xs">
                Go
              </button>
            </form>
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active = isActiveRoute(activePath, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "border border-cyan-200/35 bg-cyan-200/15 text-cyan-50"
                        : "text-slate-200 hover:bg-cyan-200/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <Link href="/login" onClick={() => setOpen(false)} className="holo-button holo-button-secondary min-h-10 px-4 py-0 text-xs">
                Login
              </Link>
              <Link href="/contact#demo" onClick={() => setOpen(false)} className="holo-button holo-button-primary min-h-10 px-4 py-0 text-xs">
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
