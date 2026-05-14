"use client";

import { useState } from "react";
import { Globe2, Shield, Workflow } from "lucide-react";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [fallbackEnabled, setFallbackEnabled] = useState(true);
  const [queueConcurrency, setQueueConcurrency] = useState(8);

  return (
    <WorkspaceShell
      title="Settings"
      description="Configure orchestration behavior, routing fallbacks, queue concurrency, and platform execution defaults."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="glass-panel-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-cyan-100" />
              Orchestration Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <ToggleRow
                label="Streaming responses"
                enabled={streamingEnabled}
                onToggle={() => setStreamingEnabled((current) => !current)}
              />
              <ToggleRow
                label="Fallback model chaining"
                enabled={fallbackEnabled}
                onToggle={() => setFallbackEnabled((current) => !current)}
              />
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-cyan-100/70">
                  Workflow queue concurrency
                </span>
                <input
                  className="form-field py-2 text-xs"
                  type="number"
                  min={1}
                  max={64}
                  value={queueConcurrency}
                  onChange={(event) => setQueueConcurrency(Number(event.target.value))}
                />
              </label>
              <Button>Save orchestration settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-100" />
              Security & Rate Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-xs text-slate-200">
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                JWT session TTL: 12h
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                Tenant rate limit baseline: 120 req/min
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                Safety gate policy: strict enterprise mode
              </div>
            </div>
            <Button variant="secondary" className="mt-4">
              <Globe2 className="h-4 w-4" />
              Configure environment variables
            </Button>
          </CardContent>
        </Card>
      </div>
    </WorkspaceShell>
  );
}

function ToggleRow({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-100"
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-2 py-1 text-xs ${
          enabled ? "border border-signal/30 bg-signal/10 text-signal" : "border border-white/10 bg-white/5 text-slate-400"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </span>
    </button>
  );
}
