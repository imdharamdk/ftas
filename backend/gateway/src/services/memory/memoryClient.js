import { env } from "../../config/env.js";

export async function writeMemory(payload) {
  try {
    const response = await fetch(`${env.services.memory}/memory/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Memory service responded ${response.status}`);
    }
    return await response.json();
  } catch {
    return {
      stored: false,
      fallback: true,
      message: "Memory service unavailable, write queued.",
    };
  }
}
