"use client";

import { useMemo } from "react";
import { Clock4, PlayCircle, ShieldCheck } from "lucide-react";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusColor: Record<string, "neutral" | "success" | "warning" | "danger"> = {
  queued: "warning",
  classifying: "neutral",
  routing: "neutral",
  processing: "neutral",
  "safety-check": "warning",
  "memory-write": "neutral",
  completed: "success",
  failed: "danger",
};

export function TaskMonitor() {
  const tasks = useEcosystemStore((state) => state.tasks);
  const events = useEcosystemStore((state) => state.events);
  const activity = useEcosystemStore((state) => state.activity);

  const timeline = useMemo(
    () => [...events].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)).slice(0, 12),
    [events],
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>AI Task Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-300">No tasks yet. Submit prompts in AI Chat Workspace.</p>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 10).map((task) => (
                <div
                  key={task.id}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-slate-100">{task.classification}</span>
                    <Badge variant={statusColor[task.status] ?? "neutral"}>{task.status}</Badge>
                  </div>
                  <div className="mt-1 text-slate-400">Model: {task.assignedModel}</div>
                  <div className="mt-1 flex items-center gap-2 text-slate-400">
                    <Clock4 className="h-3.5 w-3.5" />
                    {new Date(task.updatedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Workflow Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {timeline.length === 0 ? (
              <p className="text-sm text-slate-300">Routing events will appear after orchestration starts.</p>
            ) : (
              <div className="space-y-2">
                {timeline.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-100">{event.step}</span>
                      <span className="text-slate-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-1 text-slate-300">{event.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Decision Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-sm text-slate-300">No activity logs yet.</p>
            ) : (
              <div className="space-y-2">
                {activity.slice(0, 8).map((log) => (
                  <div key={log.id} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-100">
                      {log.severity === "critical" ? (
                        <ShieldCheck className="h-3.5 w-3.5 text-rose-300" />
                      ) : (
                        <PlayCircle className="h-3.5 w-3.5 text-cyan-100" />
                      )}
                      {log.message}
                    </div>
                    <div className="mt-1 text-slate-400">{new Date(log.timestamp).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
