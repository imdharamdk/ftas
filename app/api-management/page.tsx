import { BarChart3, Gauge } from "lucide-react";
import { ProviderManager } from "@/components/ecosystem/ProviderManager";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const usageRows = [
  { provider: "OpenAI", tokens: "2.4M", calls: "12,920", health: "healthy" },
  { provider: "NVIDIA", tokens: "1.1M", calls: "6,288", health: "healthy" },
  { provider: "DeepSeek", tokens: "860k", calls: "4,919", health: "degraded" },
];

export default function ApiManagementPage() {
  return (
    <WorkspaceShell
      title="API Management"
      description="Manually register provider keys, monitor health, set limits, and track token usage by department and model."
    >
      <ProviderManager />
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-cyan-100" />
            Token Usage & API Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="text-left text-cyan-100/70">
                  <th className="pb-2">Provider</th>
                  <th className="pb-2">Tokens</th>
                  <th className="pb-2">Calls</th>
                  <th className="pb-2">Health</th>
                </tr>
              </thead>
              <tbody>
                {usageRows.map((row) => (
                  <tr key={row.provider} className="border-t border-white/10 text-slate-200">
                    <td className="py-2">{row.provider}</td>
                    <td className="py-2">{row.tokens}</td>
                    <td className="py-2">{row.calls}</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs">
                        <Gauge className="h-3.5 w-3.5 text-cyan-100" />
                        {row.health}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </WorkspaceShell>
  );
}
