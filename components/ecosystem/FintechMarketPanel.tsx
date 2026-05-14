"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sentimentRows = [
  { segment: "Banking APIs", sentiment: 74 },
  { segment: "Consumer Lending", sentiment: 62 },
  { segment: "Crypto Payments", sentiment: 81 },
  { segment: "Wealth Management", sentiment: 68 },
];

const trendSeries = [
  { hour: "09:00", alpha: 18, beta: 10 },
  { hour: "10:00", alpha: 21, beta: 12 },
  { hour: "11:00", alpha: 26, beta: 13 },
  { hour: "12:00", alpha: 23, beta: 14 },
  { hour: "13:00", alpha: 28, beta: 17 },
  { hour: "14:00", alpha: 31, beta: 16 },
  { hour: "15:00", alpha: 34, beta: 19 },
];

export function FintechMarketPanel() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="glass-panel-strong">
        <CardHeader>
          <CardTitle>Market Intelligence Trendline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            {ready ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendSeries}>
                  <defs>
                    <linearGradient id="alphaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00e7ff" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#00e7ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="betaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8a5cff" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#8a5cff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis dataKey="hour" stroke="rgba(148, 163, 184, 0.65)" />
                  <YAxis stroke="rgba(148, 163, 184, 0.65)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(3, 10, 20, 0.92)",
                      border: "1px solid rgba(0, 231, 255, 0.2)",
                      borderRadius: "10px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="alpha"
                    stroke="#00e7ff"
                    fill="url(#alphaGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="beta"
                    stroke="#8a5cff"
                    fill="url(#betaGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-md border border-white/10 bg-white/5" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Sentiment Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sentimentRows.map((row) => (
              <div key={row.segment} className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-slate-100">{row.segment}</span>
                  <Badge variant={row.sentiment > 75 ? "success" : row.sentiment > 65 ? "warning" : "danger"}>
                    {row.sentiment}%
                  </Badge>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-signal"
                    style={{ width: `${row.sentiment}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
