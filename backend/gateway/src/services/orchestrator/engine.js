import { classifyTask } from "./classifier.js";
import { routeToDepartments } from "./router.js";
import { runModelCompletion } from "../providers/providerClient.js";
import { validateSafety } from "../safety/safetyClient.js";
import { writeMemory } from "../memory/memoryClient.js";
import { addEvent, addLog, createTask, db, updateTask } from "../../repositories/mockStore.js";
import { eventHub } from "../../websocket/hub.js";

function emitEvent(event) {
  eventHub.publish("workflow.event", event);
}

export async function executeOrchestration({ tenantId, requestedBy, input, context = {} }) {
  const classification = classifyTask(input);
  const selectedDepartments = routeToDepartments(classification, db.departments);

  const task = createTask({
    tenantId,
    createdBy: requestedBy,
    input,
    classification,
    targetDepartments: selectedDepartments.map((department) => department.id),
    assignedModel: selectedDepartments[0]?.activeModel ?? "gpt-oss-120b",
  });

  const classifyEvent = addEvent({
    taskId: task.id,
    departmentId: "ceo-ai",
    step: "Task Classification",
    message: `CEO AI classified request as ${classification}.`,
    status: "info",
  });
  emitEvent(classifyEvent);

  updateTask(task.id, { status: "routing" });
  const routeEvent = addEvent({
    taskId: task.id,
    departmentId: "ceo-ai",
    step: "Department Routing",
    message: `Selected departments: ${selectedDepartments.map((department) => department.designation).join(", ")}`,
    status: "info",
  });
  emitEvent(routeEvent);

  let chainedOutput = "";
  updateTask(task.id, { status: "processing" });

  for (const [index, department] of selectedDepartments.entries()) {
    const enabledProviders = db.providers.filter((item) => item.enabled);
    const provider =
      enabledProviders.length > 0
        ? enabledProviders[index % enabledProviders.length]
        : db.providers[0];
    let usedModel = department.activeModel;
    let result = "";

    try {
      result = await runModelCompletion({
        provider,
        model: usedModel,
        prompt: input,
        context: {
          ...context,
          previousOutput: chainedOutput,
          department: department.designation,
        },
      });
    } catch {
      const fallbackModel =
        department.models.find((model) => model !== department.activeModel) ??
        department.activeModel;
      usedModel = fallbackModel;
      result = await runModelCompletion({
        provider,
        model: fallbackModel,
        prompt: input,
        context: {
          ...context,
          previousOutput: chainedOutput,
          department: department.designation,
          fallback: true,
        },
      });
      addLog({
        departmentId: department.id,
        severity: "warning",
        message: `${department.designation} switched to fallback model ${fallbackModel}.`,
      });
    }

    chainedOutput = `${chainedOutput}\n\n[${department.designation}] ${result}`.trim();
    const processEvent = addEvent({
      taskId: task.id,
      departmentId: department.id,
      step: "Specialized AI Processing",
      message: `${department.designation} processed segment with ${usedModel}.`,
      status: "success",
    });
    emitEvent(processEvent);
  }

  updateTask(task.id, { status: "safety-check" });
  const safety = await validateSafety({
    taskId: task.id,
    input,
    output: chainedOutput,
  });

  const safetyEvent = addEvent({
    taskId: task.id,
    departmentId: "security-ai",
    step: "Safety Validation",
    message: safety.passed ? "Safety checks passed." : "Safety checks flagged response.",
    status: safety.passed ? "success" : "warning",
  });
  emitEvent(safetyEvent);

  updateTask(task.id, { status: "memory-write" });
  const memory = await writeMemory({
    tenantId,
    taskId: task.id,
    classification,
    content: chainedOutput,
    metadata: {
      createdBy: requestedBy,
      departments: selectedDepartments.map((department) => department.id),
    },
  });

  const memoryEvent = addEvent({
    taskId: task.id,
    departmentId: "memory-ai",
    step: "Memory Storage",
    message: memory.stored
      ? "Memory write persisted."
      : "Memory write queued with fallback mode.",
    status: memory.stored ? "success" : "warning",
  });
  emitEvent(memoryEvent);

  const finalOutput = safety.passed
    ? chainedOutput
    : "Security AI blocked the response due to policy checks.";

  updateTask(task.id, { status: safety.passed ? "completed" : "failed" });

  const finalEvent = addEvent({
    taskId: task.id,
    departmentId: "ceo-ai",
    step: "Final Response",
    message: safety.passed
      ? "CEO AI compiled and approved final response."
      : "CEO AI halted response after safety rejection.",
    status: safety.passed ? "success" : "error",
  });
  emitEvent(finalEvent);

  addLog({
    departmentId: "ceo-ai",
    severity: safety.passed ? "info" : "critical",
    message: `Task ${task.id} completed with status ${safety.passed ? "completed" : "failed"}.`,
  });

  const updatedTask = db.tasks.find((item) => item.id === task.id) ?? task;
  const events = db.events.filter((event) => event.taskId === task.id);

  return {
    task: updatedTask,
    events,
    output: finalOutput,
    safetyReport: {
      passed: Boolean(safety.passed),
      checks: safety.checks ?? [],
    },
  };
}
