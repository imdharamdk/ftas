import process from "node:process";

function getEnv(name, fallback = "") {
  return process.env[name] ?? fallback;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const nodeEnv = getEnv("NODE_ENV", "development");

export const env = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  port: Number(getEnv("PORT", "8080")),
  jwtSecret:
    nodeEnv === "production"
      ? requireEnv("JWT_SECRET")
      : getEnv("JWT_SECRET", "dev-secret"),
  jwtIssuer: getEnv("JWT_ISSUER", "ftas-ai-ecosystem"),
  jwtAudience: getEnv("JWT_AUDIENCE", "ftas-enterprise"),
  apiKeyEncryptionSecret:
    nodeEnv === "production"
      ? requireEnv("API_KEY_ENCRYPTION_SECRET")
      : getEnv("API_KEY_ENCRYPTION_SECRET", "ftas-dev-encryption-secret"),
  databaseUrl: getEnv("DATABASE_URL", ""),
  redisUrl: getEnv("REDIS_URL", ""),
  services: {
    memory: getEnv("MEMORY_SERVICE_URL", "http://localhost:8101"),
    ocr: getEnv("OCR_SERVICE_URL", "http://localhost:8102"),
    voice: getEnv("VOICE_SERVICE_URL", "http://localhost:8103"),
    safety: getEnv("SAFETY_SERVICE_URL", "http://localhost:8104"),
    creative: getEnv("CREATIVE_SERVICE_URL", "http://localhost:8105"),
    media: getEnv("MEDIA_SERVICE_URL", "http://localhost:8106"),
    simulation: getEnv("SIMULATION_SERVICE_URL", "http://localhost:8107"),
  },
};
