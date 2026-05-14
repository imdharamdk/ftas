import { env } from "../../config/env.js";

export async function validateSafety(payload) {
  try {
    const response = await fetch(`${env.services.safety}/safety/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Safety service responded ${response.status}`);
    }
    return await response.json();
  } catch {
    return {
      passed: true,
      fallback: true,
      checks: ["safety-service-unavailable-fallback-allow"],
    };
  }
}
