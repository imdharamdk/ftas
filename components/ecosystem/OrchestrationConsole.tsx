"use client";

import { useMemo, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { ecosystemDepartments } from "@/data/ecosystem";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import type { AgentTask, DepartmentId } from "@/types/ecosystem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const taskSamples = [
  "Create a multi-tenant billing API with role-based controls and deployment scripts.",
  "Analyze crypto market volatility and generate risk-aware portfolio signals.",
  "Extract invoice totals from uploaded PDF and summarize anomalies.",
];

function classifyInput(input: string): { classification: string; departments: DepartmentId[] } {
  const text = input.toLowerCase();
  if (text.includes("invoice") || text.includes("ocr") || text.includes("pdf")) {
    return { classification: "document-intelligence", departments: ["document-ai", "security-ai", "memory-ai"] };
  }
  if (text.includes("voice") || text.includes("call") || text.includes("transcript")) {
    return { classification: "voice-communication", departments: ["voice-ai", "security-ai", "memory-ai"] };
  }
  if (text.includes("design") || text.includes("image") || text.includes("brand")) {
    return { classification: "creative-generation", departments: ["creative-ai", "security-ai", "memory-ai"] };
  }
  if (text.includes("market") || text.includes("portfolio") || text.includes("trading")) {
    return {
      classification: "fintech-intelligence",
      departments: ["market-intelligence-ai", "research-ai", "security-ai", "memory-ai"],
    };
  }
  if (text.includes("3d") || text.includes("simulation") || text.includes("usd")) {
    return { classification: "3d-simulation", departments: ["3d-ai", "security-ai", "memory-ai"] };
  }
  return {
    classification: "engineering-orchestration",
    departments: ["ceo-ai", "cto-ai", "security-ai", "memory-ai"],
  };
}

export function OrchestrationConsole() {
  const [prompt, setPrompt] = useState("");
  const [streamOutput, setStreamOutput] = useState("");
  const addTask = useEcosystemStore((state) => state.addTask);
  const addEvent = useEcosystemStore((state) => state.addEvent);
  const addActivity = useEcosystemStore((state) => state.addActivity);
  const runtime = useEcosystemStore((state) => state.runtime);

  const departmentLookup = useMemo(
    () => Object.fromEntries(ecosystemDepartments.map((department) => [department.id, department])),
    [],
  );

  const sendTask = async (input: string) => {
    const { classification, departments } = classifyInput(input);
    const target = departments[0];
    const model = runtime[target].activeModel;

    const task: AgentTask = {
      id: `task-${crypto.randomUUID()}`,
      tenantId: "tenant-ftas-demo",
      createdBy: "web-user",
      input,
      classification,
      targetDepartments: departments,
      assignedModel: model,
      status: "queued",
      attempts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(task);
    addActivity({
      id: `log-${crypto.randomUUID()}`,
      departmentId: "ceo-ai",
      severity: "info",
      message: `CEO AI accepted task ${task.id} and started routing.`,
      timestamp: new Date().toISOString(),
    });

    const eventSteps = [
      { step: "Task Classification", status: "info" as const },
      { step: "Department Routing", status: "info" as const },
      { step: "Safety Validation", status: "success" as const },
      { step: "Memory Storage", status: "success" as const },
      { step: "Final Response", status: "success" as const },
    ];

    setStreamOutput("");

    for (let index = 0; index < eventSteps.length; index += 1) {
      const step = eventSteps[index];
      addEvent({
        id: `evt-${crypto.randomUUID()}`,
        taskId: task.id,
        departmentId: departments[Math.min(index, departments.length - 1)],
        step: step.step,
        message:
          index === 1
            ? `Departments selected: ${departments.map((department) => departmentLookup[department]?.designation).join(", ")}`
            : `${step.step} completed for ${task.classification}`,
        timestamp: new Date().toISOString(),
        status: step.status,
      });

      const chunk =
        index === eventSteps.length - 1
          ? `CEO AI response: Task routed to ${departmentLookup[target].designation} (${model}) with safety + memory pipeline enabled.`
          : `• ${step.step} complete\n`;
      setStreamOutput((current) => `${current}${chunk}\n`);

      await new Promise((resolve) => window.setTimeout(resolve, 350));
    }
  };

  return (
    <Card className="glass-panel-strong">
      <CardHeader>
        <CardTitle>AI Routing Engine Console</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="form-field min-h-36 resize-none text-sm"
              placeholder="Describe a task for FTAS AI Ecosystem orchestration..."
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {taskSamples.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-200/40"
                  onClick={() => setPrompt(sample)}
                >
                  {sample}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  const input = prompt.trim();
                  if (!input) return;
                  void sendTask(input);
                  setPrompt("");
                }}
              >
                <Send className="h-4 w-4" />
                Execute Orchestration
              </Button>
              <Button variant="secondary" onClick={() => setPrompt("")}>
                Clear
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs text-cyan-100/90">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                stream.console
              </div>
              <Badge variant="success">
                <Sparkles className="h-3.5 w-3.5" />
                live
              </Badge>
            </div>
            <pre className="whitespace-pre-wrap leading-6">
              {streamOutput || "Waiting for orchestration input..."}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
