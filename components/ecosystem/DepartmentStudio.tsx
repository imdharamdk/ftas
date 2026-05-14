"use client";

import type { ReactNode } from "react";
import { UploadCloud } from "lucide-react";
import type { DepartmentDefinition } from "@/types/ecosystem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "./icon-map";

type DepartmentStudioProps = {
  department: DepartmentDefinition;
  rightPane?: ReactNode;
};

export function DepartmentStudio({ department, rightPane }: DepartmentStudioProps) {
  const Icon = iconMap[department.icon] ?? UploadCloud;

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <Card className="glass-panel-strong">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
              <Icon className="h-6 w-6" />
            </div>
            <Badge>{department.designation}</Badge>
          </div>
          <CardTitle>{department.name}</CardTitle>
          <CardDescription>
            Primary model: {department.primaryModel}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-sm font-semibold text-cyan-100/70">Capabilities</h3>
          <div className="grid gap-2">
            {department.features.map((feature) => (
              <div key={feature} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button>
              <UploadCloud className="h-4 w-4" />
              Upload Input
            </Button>
            <Button variant="secondary">Run {department.designation}</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Execution Workspace</CardTitle>
          <CardDescription>
            Department-specific tools, queues, and output preview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rightPane ?? (
            <div className="min-h-72 rounded-lg border border-dashed border-cyan-200/20 bg-black/30 p-4 text-sm text-slate-300">
              Workspace placeholder for {department.designation}: connect service endpoints and provider adapters from Admin Panel.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
