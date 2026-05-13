"use client";

import Link from "next/link";
import { ArrowUp, CircleHelp, MessageCircleMore, Rocket } from "lucide-react";

const actions = [
  {
    href: "/contact#demo",
    label: "Request Demo",
    Icon: Rocket,
  },
  {
    href: "https://wa.me/910000000000",
    label: "WhatsApp",
    Icon: MessageCircleMore,
    external: true,
  },
  {
    href: "/faq",
    label: "Support",
    Icon: CircleHelp,
  },
] as const;

export function QuickActions() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-8 sm:right-6">
      <div className="pointer-events-auto flex flex-col gap-2">
        {actions.map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noreferrer"
              className="holo-button holo-button-secondary min-w-40 justify-start"
            >
              <action.Icon className="h-4 w-4" />
              {action.label}
            </a>
          ) : (
            <Link key={action.label} href={action.href} className="holo-button holo-button-secondary min-w-40 justify-start">
              <action.Icon className="h-4 w-4" />
              {action.label}
            </Link>
          ),
        )}
      </div>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="h-10 w-10 rounded-full border border-cyan-200/35 bg-cyan-200/10 text-cyan-50 shadow-neon transition hover:bg-cyan-200/20"
      >
        <ArrowUp className="mx-auto h-4 w-4" />
      </button>
    </div>
  );
}
