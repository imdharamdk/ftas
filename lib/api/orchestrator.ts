import type { AgentTask, OrchestrationResponse } from "@/types/ecosystem";
import { apiRequest } from "./http";

export async function submitOrchestrationTask(payload: {
  tenantId: string;
  input: string;
  requestedBy: string;
  context?: Record<string, unknown>;
}) {
  return apiRequest<OrchestrationResponse>("/api/v1/orchestrator/execute", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchTaskQueue() {
  return apiRequest<{ tasks: AgentTask[] }>("/api/v1/orchestrator/tasks");
}

export async function fetchWorkflowEvents(taskId: string) {
  return apiRequest<{ events: OrchestrationResponse["events"] }>(
    `/api/v1/orchestrator/tasks/${taskId}/events`,
  );
}
