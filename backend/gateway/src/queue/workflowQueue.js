const queue = [];
let processing = false;

export function enqueue(job) {
  queue.push(job);
  return queue.length;
}

export function size() {
  return queue.length;
}

export async function processQueue(worker) {
  if (processing) return;
  processing = true;

  while (queue.length > 0) {
    const job = queue.shift();
    try {
      await worker(job);
    } catch {
      // Worker-level errors are handled by orchestrator; queue loop continues.
    }
  }

  processing = false;
}
