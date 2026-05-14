import { retryWithBackoff } from "../orchestrator/retry.js";

export async function runModelCompletion({
  provider,
  model,
  prompt,
  context,
}) {
  return retryWithBackoff(async () => {
    // In production this is where provider adapters execute.
    // This scaffold returns deterministic orchestration output.
    const summary = prompt.slice(0, 240);
    return `[${provider.displayName}:${model}] ${summary}\n\nContext: ${JSON.stringify(context ?? {}, null, 2)}`;
  }, 1);
}
