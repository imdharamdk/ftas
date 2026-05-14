import { Code2, TerminalSquare } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { OrchestrationConsole } from "@/components/ecosystem/OrchestrationConsole";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const ctoDepartment = getDepartmentById("cto-ai");

export default function AIChatWorkspacePage() {
  return (
    <WorkspaceShell
      title="AI Chat Workspace"
      description="Engineering control room for code generation, debugging, repository planning, and deployment orchestration through CTO AI."
    >
      <OrchestrationConsole />
      <DepartmentStudio
        department={ctoDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                <TerminalSquare className="h-4 w-4" />
                ai.code.console
              </div>
              <span className="rounded-md border border-signal/30 bg-signal/10 px-2 py-1 text-xs text-signal">
                live
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs text-slate-200">
              <p>$ scan repo --intent "multi-tenant rbac + api gateway"</p>
              <p>$ generate service --name orchestration-router --framework fastapi</p>
              <p>$ create deploy --target docker-compose --env production</p>
            </div>
            <div className="mt-4 rounded-md border border-cyan-200/20 bg-cyan-200/10 p-3 text-xs text-cyan-50">
              CTO AI models active: qwen3-coder-480b-a35b-instruct, deepseek-v4-pro, llama-3.3-nemotron-super-49b-v1.5
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-300">
              <Code2 className="h-4 w-4 text-cyan-100" />
              AI code editor and repo integration endpoints are wired through gateway adapters.
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
