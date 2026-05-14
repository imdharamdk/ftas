import { Router } from "express";
import { z } from "zod";
import { db } from "../repositories/mockStore.js";
import { executeOrchestration } from "../services/orchestrator/engine.js";
import { enqueue, processQueue, size } from "../queue/workflowQueue.js";

export const orchestratorRouter = Router();

const taskSchema = z.object({
  tenantId: z.string().min(1),
  requestedBy: z.string().min(1),
  input: z.string().min(3),
  context: z.record(z.unknown()).optional(),
});

orchestratorRouter.post("/orchestrator/execute", async (req, res) => {
  const parsed = taskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  let orchestrationResult = null;
  enqueue(parsed.data);
  await processQueue(async (job) => {
    orchestrationResult = await executeOrchestration(job);
  });

  if (!orchestrationResult) {
    const latestTask = db.tasks[0];
    return res.status(202).json({
      task: latestTask,
      events: db.events.filter((event) => event.taskId === latestTask.id),
      output: "",
      safetyReport: { passed: false, checks: ["processing"] },
    });
  }

  return res.status(201).json(orchestrationResult);
});

orchestratorRouter.get("/orchestrator/tasks", (_req, res) => {
  res.json({
    queueDepth: size(),
    tasks: db.tasks,
  });
});

orchestratorRouter.get("/orchestrator/tasks/:taskId/events", (req, res) => {
  const events = db.events.filter((event) => event.taskId === req.params.taskId);
  res.json({ events });
});
