"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { socialLinks } from "@/data/content";
import { LogoMark } from "./LogoMark";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative z-10 mt-14 border-t border-white/10 bg-black/45 px-5 py-12 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="absolute inset-0 background-grid opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr_0.8fr_0.95fr]">
        <div>
          <LogoMark compact animated={false} />
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
            FTAS builds AI-driven fintech infrastructure with product engineering, automation, cloud operations, and enterprise-grade support.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-signal/30 bg-signal/10 px-3 py-2 text-xs font-semibold text-signal">
            <ShieldCheck className="h-4 w-4" />
            Security-first delivery posture
          </div>
          <a href="/ftas-brochure.pdf" download className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-50 hover:text-cyan-100">
            Download FTAS Brochure
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Company" links={companyLinks} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-100/75">Newsletter</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Get monthly updates on product releases, automation playbooks, and fintech platform insights.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!email.trim()) return;
              toast.success("Subscribed to FTAS updates.");
              setEmail("");
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Newsletter email
            </label>
            <input
              id="newsletter-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="form-field h-11 flex-1 py-0"
              type="email"
              required
            />
            <button type="submit" className="holo-button holo-button-primary min-h-11 px-4 py-0">
              <Mail className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs font-semibold text-cyan-50 transition hover:border-cyan-100/60 hover:bg-cyan-200/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} FTAS - Fintech Automated Solutions. All rights reserved.</div>
        <div className="flex flex-wrap gap-3">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-200">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-100/75">{title}</h3>
      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
