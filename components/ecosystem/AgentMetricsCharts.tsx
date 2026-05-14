"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ecosystemDepartments } from "@/data/ecosystem";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentMetricsCharts() {
  const [ready, setReady] = useState(false);
  const runtime = useEcosystemStore((state) => state.runtime);

  useEffect(() => {
    setReady(true);
  }, []);

  const chartData = ecosystemDepartments.map((department) => ({
    dept: department.designation.replace(" AI", ""),
    latency: runtime[department.id].avgLatencyMs,
    priority: runtime[department.id].routingPriority,
  }));

  return (
    <Card className="glass-panel-strong">
      <CardHeader>
        <CardTitle>Department Latency & Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {ready ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                <XAxis dataKey="dept" stroke="rgba(148, 163, 184, 0.65)" tick={{ fontSize: 11 }} />
                <YAxis stroke="rgba(148, 163, 184, 0.65)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(3, 10, 20, 0.92)",
                    border: "1px solid rgba(0, 231, 255, 0.2)",
                    borderRadius: "10px",
                  }}
                />
                <Bar dataKey="latency" fill="#00e7ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
