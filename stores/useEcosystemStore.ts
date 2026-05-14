"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ecosystemDepartments } from "@/data/ecosystem";
import type {
  ActivityLog,
  AgentTask,
  DepartmentId,
  DepartmentRuntimeState,
  TenantContext,
  WorkflowEvent,
} from "@/types/ecosystem";

type EcosystemState = {
  tenant: TenantContext;
  runtime: Record<DepartmentId, DepartmentRuntimeState>;
  tasks: AgentTask[];
  activity: ActivityLog[];
  events: WorkflowEvent[];
  realtime: {
    queueDepth: number;
    activeAgents: number;
    safetyPassRate: number;
    avgLatencyMs: number;
  };
  setTenant: (tenant: TenantContext) => void;
  setDepartmentEnabled: (departmentId: DepartmentId, enabled: boolean) => void;
  setDepartmentPriority: (departmentId: DepartmentId, routingPriority: number) => void;
  setDepartmentModel: (departmentId: DepartmentId, model: string) => void;
  addTask: (task: AgentTask) => void;
  updateTaskStatus: (taskId: string, status: AgentTask["status"]) => void;
  addEvent: (event: WorkflowEvent) => void;
  addActivity: (log: ActivityLog) => void;
  tickRealtime: () => void;
};

const initialRuntime = ecosystemDepartments.reduce(
  (acc, department, index) => {
    acc[department.id] = {
      enabled: true,
      routingPriority: index + 1,
      activeModel: department.primaryModel,
      status: "online",
      avgLatencyMs: 420 + index * 18,
      tokenUsage: 0,
    };
    return acc;
  },
  {} as Record<DepartmentId, DepartmentRuntimeState>,
);

export const useEcosystemStore = create<EcosystemState>()(
  persist(
    (set) => ({
      tenant: {
        tenantId: "tenant-ftas-demo",
        orgName: "FTAS AI Ecosystem",
        plan: "enterprise",
      },
      runtime: initialRuntime,
      tasks: [],
      activity: [],
      events: [],
      realtime: {
        queueDepth: 12,
        activeAgents: ecosystemDepartments.length,
        safetyPassRate: 99.2,
        avgLatencyMs: 712,
      },
      setTenant: (tenant) => set({ tenant }),
      setDepartmentEnabled: (departmentId, enabled) =>
        set((state) => ({
          runtime: {
            ...state.runtime,
            [departmentId]: {
              ...state.runtime[departmentId],
              enabled,
            },
          },
        })),
      setDepartmentPriority: (departmentId, routingPriority) =>
        set((state) => ({
          runtime: {
            ...state.runtime,
            [departmentId]: {
              ...state.runtime[departmentId],
              routingPriority,
            },
          },
        })),
      setDepartmentModel: (departmentId, model) =>
        set((state) => ({
          runtime: {
            ...state.runtime,
            [departmentId]: {
              ...state.runtime[departmentId],
              activeModel: model,
            },
          },
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [task, ...state.tasks].slice(0, 150),
        })),
      updateTaskStatus: (taskId, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task,
          ),
        })),
      addEvent: (event) =>
        set((state) => ({
          events: [event, ...state.events].slice(0, 250),
        })),
      addActivity: (log) =>
        set((state) => ({
          activity: [log, ...state.activity].slice(0, 250),
        })),
      tickRealtime: () =>
        set((state) => {
          const delta = (Math.random() - 0.5) * 0.8;
          return {
            realtime: {
              queueDepth: Math.max(1, state.realtime.queueDepth + Math.round((Math.random() - 0.4) * 3)),
              activeAgents: state.realtime.activeAgents,
              safetyPassRate: Math.max(95, Math.min(100, state.realtime.safetyPassRate + delta)),
              avgLatencyMs: Math.max(220, Math.round(state.realtime.avgLatencyMs + (Math.random() - 0.5) * 30)),
            },
          };
        }),
    }),
    {
      name: "ftas-ecosystem-store",
      partialize: (state) => ({
        tenant: state.tenant,
        runtime: state.runtime,
      }),
    },
  ),
);
