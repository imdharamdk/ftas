export const logger = {
  info(message, payload = {}) {
    // Structured logging placeholder for pino/datadog integration.
    console.log(JSON.stringify({ level: "info", message, ...payload, timestamp: new Date().toISOString() }));
  },
  warn(message, payload = {}) {
    console.warn(JSON.stringify({ level: "warn", message, ...payload, timestamp: new Date().toISOString() }));
  },
  error(message, payload = {}) {
    console.error(JSON.stringify({ level: "error", message, ...payload, timestamp: new Date().toISOString() }));
  },
};
