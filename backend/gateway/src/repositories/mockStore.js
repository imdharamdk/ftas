import { randomUUID } from "node:crypto";
import { departments, providers } from "../domain/departments.js";

const now = () => new Date().toISOString();

export const db = {
  tasks: [],
  events: [],
  logs: [],
  providers: providers.map((name) => ({
    id: name.toLowerCase().replaceAll(" ", "-"),
    displayName: name,
    enabled: true,
    baseUrl: `https://api.${name.toLowerCase().replaceAll(" ", "")}.com/v1`,
    rateLimitRpm: 120,
    health: "healthy",
  })),
  apiKeys: [],
  departments: departments.map((department, index) => ({
    ...department,
    enabled: true,
    routingPriority: index + 1,
    activeModel: department.primaryModel,
  })),
  users: [
    {
      id: "usr-owner",
      tenantId: "tenant-ftas-demo",
      name: "Owner",
      email: "owner@ftas.ai",
      role: "owner",
    },
    {
      id: "usr-admin",
      tenantId: "tenant-ftas-demo",
      name: "Admin",
      email: "admin@ftas.ai",
      role: "admin",
    },
  ],
};

export function createTask(payload) {
  const task = {
    id: `task-${randomUUID()}`,
    attempts: 0,
    status: "queued",
    createdAt: now(),
    updatedAt: now(),
    ...payload,
  };
  db.tasks.unshift(task);
  return task;
}

export function updateTask(taskId, patch) {
  db.tasks = db.tasks.map((task) =>
    task.id === taskId ? { ...task, ...patch, updatedAt: now() } : task,
  );
  return db.tasks.find((task) => task.id === taskId);
}

export function addEvent(payload) {
  const event = {
    id: `evt-${randomUUID()}`,
    timestamp: now(),
    ...payload,
  };
  db.events.unshift(event);
  return event;
}

export function addLog(payload) {
  const log = {
    id: `log-${randomUUID()}`,
    timestamp: now(),
    ...payload,
  };
  db.logs.unshift(log);
  return log;
}
