"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BellRing, Cpu, Gauge, Sparkles } from "lucide-react";
import { ecosystemPages } from "@/data/ecosystem";
import { cn } from "@/lib/utils";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { Badge } from "@/components/ui/badge";

type WorkspaceShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function WorkspaceShell({ title, description, children, actions }: WorkspaceShellProps) {
  const pathname = usePathname();
  const realtime = useEcosystemStore((state) => state.realtime);
  const tickRealtime = useEcosystemStore((state) => state.tickRealtime);

  useEffect(() => {
    const timer = window.setInterval(() => tickRealtime(), 3500);
    return () => window.clearInterval(timer);
  }, [tickRealtime]);

  return (
    <section className="section-shell pt-5">
      <div className="grid gap-4 xl:grid-cols-[16rem_1fr]">
        <aside className="glass-panel-strong hidden rounded-lg p-4 xl:block">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-100" />
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100/70">
              FTAS AI Ecosystem
            </p>
          </div>
          <nav className="grid gap-1">
            {ecosystemPages.map((page) => {
              const active = pathname === page.href;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition",
                    active
                      ? "border border-cyan-200/35 bg-cyan-200/15 font-semibold text-cyan-50"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {page.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-4">
          <div className="glass-panel-strong rounded-lg p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="section-kicker">
                  <Sparkles className="h-4 w-4" />
                  FTAS AI Ecosystem
                </div>
                <h1 className="display-title mt-5 text-3xl font-bold text-white sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
              </div>
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-cyan-100/60">Queue depth</div>
                <div className="text-lg font-semibold text-white">{realtime.queueDepth}</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-cyan-100/60">Safety pass rate</div>
                <div className="text-lg font-semibold text-white">{realtime.safetyPassRate.toFixed(1)}%</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-cyan-100/60">Avg latency</div>
                <div className="text-lg font-semibold text-white">{realtime.avgLatencyMs}ms</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="success">
                <Gauge className="h-3.5 w-3.5" />
                System healthy
              </Badge>
              <Badge variant="neutral">
                <BellRing className="h-3.5 w-3.5" />
                Live orchestration events
              </Badge>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
