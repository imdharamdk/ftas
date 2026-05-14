"use client";

import { AlertTriangle, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const moderationQueue = [
  { id: "mod-101", type: "Potential jailbreak", status: "reviewing" },
  { id: "mod-102", type: "PII exposure risk", status: "blocked" },
  { id: "mod-103", type: "Unsafe media prompt", status: "reviewing" },
];

export function SecurityPanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <Card className="glass-panel-strong">
        <CardHeader>
          <CardTitle>Threat Monitor & AI Firewall</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <ShieldCheck className="h-5 w-5 text-signal" />
              <p className="mt-2 text-sm font-semibold text-white">Safety pass rate</p>
              <p className="text-xs text-slate-300">99.2%</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <LockKeyhole className="h-5 w-5 text-cyan-100" />
              <p className="mt-2 text-sm font-semibold text-white">PII detections</p>
              <p className="text-xs text-slate-300">14 in last 24h</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <ShieldAlert className="h-5 w-5 text-amber-200" />
              <p className="mt-2 text-sm font-semibold text-white">Jailbreak attempts</p>
              <p className="text-xs text-slate-300">9 mitigated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {moderationQueue.map((item) => (
              <div key={item.id} className="rounded-md border border-white/10 bg-white/5 p-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-100">{item.id}</span>
                  <Badge variant={item.status === "blocked" ? "danger" : "warning"}>{item.status}</Badge>
                </div>
                <p className="mt-2 flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {item.type}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
