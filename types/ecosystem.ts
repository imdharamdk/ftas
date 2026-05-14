export type DepartmentId =
  | "ceo-ai"
  | "cto-ai"
  | "product-manager-ai"
  | "research-ai"
  | "market-intelligence-ai"
  | "voice-ai"
  | "document-ai"
  | "memory-ai"
  | "security-ai"
  | "creative-ai"
  | "media-ai"
  | "3d-ai";

export type AgentStatus = "online" | "busy" | "degraded" | "offline";

export type AgentTaskStatus =
  | "queued"
  | "classifying"
  | "routing"
  | "processing"
  | "safety-check"
  | "memory-write"
  | "completed"
  | "failed";

export type ProviderId =
  | "openai"
  | "nvidia"
  | "qwen"
  | "deepseek"
  | "google"
  | "mistral"
  | "meta"
  | "stability-ai"
  | "black-forest-labs"
  | "microsoft"
  | "moonshot-ai"
  | "glm"
  | "others";

export type Role = "owner" | "admin" | "manager" | "analyst" | "member" | "viewer";

export interface DepartmentDefinition {
  id: DepartmentId;
  name: string;
  designation: string;
  icon: string;
  primaryModel: string;
  models: string[];
  responsibilities: string[];
  features: string[];
  route: string;
}

export interface DepartmentRuntimeState {
  enabled: boolean;
  routingPriority: number;
  activeModel: string;
  status: AgentStatus;
  avgLatencyMs: number;
  tokenUsage: number;
}

export interface ProviderDefinition {
  id: ProviderId;
  label: string;
}

export interface ProviderConfig {
  id: ProviderId;
  displayName: string;
  baseUrl: string;
  apiKey: string;
  enabled: boolean;
  rateLimitRpm: number;
  health: "healthy" | "degraded" | "down";
  models: string[];
}

export interface AgentTask {
  id: string;
  tenantId: string;
  createdBy: string;
  input: string;
  classification: string;
  targetDepartments: DepartmentId[];
  assignedModel: string;
  status: AgentTaskStatus;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowEvent {
  id: string;
  taskId: string;
  departmentId: DepartmentId;
  step: string;
  message: string;
  timestamp: string;
  status: "info" | "success" | "warning" | "error";
}

export interface ActivityLog {
  id: string;
  departmentId: DepartmentId;
  severity: "info" | "warning" | "critical";
  message: string;
  timestamp: string;
}

export interface OrchestrationResponse {
  task: AgentTask;
  events: WorkflowEvent[];
  output: string;
  safetyReport: {
    passed: boolean;
    checks: string[];
  };
}

export interface TenantContext {
  tenantId: string;
  orgName: string;
  plan: "starter" | "growth" | "enterprise";
}
