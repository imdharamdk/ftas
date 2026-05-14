"use client";

import { useMemo } from "react";
import { Activity, ArrowUpDown, BrainCircuit, Power } from "lucide-react";
import { ecosystemDepartments } from "@/data/ecosystem";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import type { DepartmentId } from "@/types/ecosystem";
import { iconMap } from "./icon-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DepartmentGrid() {
  const runtime = useEcosystemStore((state) => state.runtime);
  const setDepartmentEnabled = useEcosystemStore((state) => state.setDepartmentEnabled);
  const setDepartmentPriority = useEcosystemStore((state) => state.setDepartmentPriority);
  const setDepartmentModel = useEcosystemStore((state) => state.setDepartmentModel);

  const sorted = useMemo(
    () =>
      [...ecosystemDepartments].sort(
        (a, b) => runtime[a.id].routingPriority - runtime[b.id].routingPriority,
      ),
    [runtime],
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sorted.map((department) => {
        const Icon = iconMap[department.icon] ?? BrainCircuit;
        const state = runtime[department.id];
        return (
          <Card key={department.id} className={state.enabled ? "" : "opacity-70"}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={state.enabled ? "success" : "warning"}>
                  <Power className="h-3.5 w-3.5" />
                  {state.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <CardTitle>{department.designation}</CardTitle>
              <CardDescription>{department.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-xs text-slate-200">
                <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  Active model: <span className="font-semibold">{state.activeModel}</span>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  Priority: <span className="font-semibold">{state.routingPriority}</span>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  Avg latency: <span className="font-semibold">{state.avgLatencyMs}ms</span>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  Token usage: <span className="font-semibold">{state.tokenUsage.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant={state.enabled ? "secondary" : "default"}
                  size="sm"
                  onClick={() => setDepartmentEnabled(department.id, !state.enabled)}
                >
                  <Power className="h-4 w-4" />
                  {state.enabled ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setDepartmentPriority(
                      department.id,
                      Math.max(1, runtime[department.id].routingPriority - 1),
                    )
                  }
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Raise priority
                </Button>
              </div>

              <label className="mt-3 block">
                <span className="mb-1 block text-xs font-semibold text-cyan-100/70">Model assignment</span>
                <select
                  className="form-field py-2 text-xs"
                  value={state.activeModel}
                  onChange={(event) =>
                    setDepartmentModel(department.id as DepartmentId, event.target.value)
                  }
                >
                  {department.models.map((model) => (
                    <option key={model} value={model} className="bg-[#041226] text-white">
                      {model}
                    </option>
                  ))}
                </select>
              </label>

              <div className="mt-3 flex items-center gap-2 text-xs text-cyan-100/70">
                <Activity className="h-4 w-4" />
                Routing target: {department.route}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
