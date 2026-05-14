import { randomUUID } from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { addLog, db } from "../repositories/mockStore.js";
import { decryptSecret, encryptSecret, hashSecret } from "../security/crypto.js";

export const adminRouter = Router();

adminRouter.get("/admin/providers", (_req, res) => {
  res.json({ providers: db.providers });
});

const providerPatchSchema = z.object({
  enabled: z.boolean().optional(),
  baseUrl: z.string().url().optional(),
  rateLimitRpm: z.number().int().min(1).max(10000).optional(),
});

adminRouter.patch("/admin/providers/:providerId", (req, res) => {
  const parsed = providerPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const provider = db.providers.find((item) => item.id === req.params.providerId);
  if (!provider) {
    return res.status(404).json({ error: "Provider not found" });
  }
  Object.assign(provider, parsed.data);
  return res.json({ provider });
});

adminRouter.get("/admin/departments", (_req, res) => {
  res.json({ departments: db.departments });
});

const departmentPatchSchema = z.object({
  enabled: z.boolean().optional(),
  routingPriority: z.number().int().min(1).max(100).optional(),
  activeModel: z.string().min(1).optional(),
});

adminRouter.patch("/admin/departments/:departmentId", (req, res) => {
  const parsed = departmentPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const department = db.departments.find((item) => item.id === req.params.departmentId);
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  Object.assign(department, parsed.data);
  return res.json({ department });
});

adminRouter.get("/admin/api-keys", (_req, res) => {
  // Return only metadata, never encrypted payloads.
  res.json({
    keys: db.apiKeys.map((key) => ({
      id: key.id,
      providerId: key.providerId,
      label: key.label,
      maskedKey: key.maskedKey,
      createdAt: key.createdAt,
      lastUsedAt: key.lastUsedAt,
      isActive: key.isActive,
    })),
  });
});

const keyCreateSchema = z.object({
  providerId: z.string().min(1),
  label: z.string().min(1),
  value: z.string().min(10),
});

adminRouter.post("/admin/api-keys", (req, res) => {
  const parsed = keyCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const payload = parsed.data;
  const encrypted = encryptSecret(payload.value);
  const hashed = hashSecret(payload.value);
  const record = {
    id: `key-${randomUUID()}`,
    providerId: payload.providerId,
    label: payload.label,
    maskedKey: `${payload.value.slice(0, 5)}...${payload.value.slice(-4)}`,
    encryptedKey: encrypted.cipherText,
    keyIv: encrypted.iv,
    keyAuthTag: encrypted.authTag,
    keyHash: hashed,
    isActive: true,
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
  };
  db.apiKeys.unshift(record);
  addLog({
    departmentId: "security-ai",
    severity: "info",
    message: `API key added for provider ${payload.providerId} (${payload.label}).`,
  });
  return res.status(201).json({
    id: record.id,
    providerId: record.providerId,
    label: record.label,
    maskedKey: record.maskedKey,
    createdAt: record.createdAt,
  });
});

adminRouter.delete("/admin/api-keys/:keyId", (req, res) => {
  const before = db.apiKeys.length;
  db.apiKeys = db.apiKeys.filter((item) => item.id !== req.params.keyId);
  if (db.apiKeys.length === before) {
    return res.status(404).json({ error: "API key not found" });
  }
  addLog({
    departmentId: "security-ai",
    severity: "warning",
    message: `API key removed (${req.params.keyId}).`,
  });
  return res.status(204).send();
});

adminRouter.post("/admin/api-keys/:keyId/validate", (req, res) => {
  const record = db.apiKeys.find((item) => item.id === req.params.keyId);
  if (!record) {
    return res.status(404).json({ error: "API key not found" });
  }

  // Decryption check ensures encryption secret is valid and key payload is intact.
  const plain = decryptSecret({
    cipherText: record.encryptedKey,
    iv: record.keyIv,
    authTag: record.keyAuthTag,
  });
  const matches = hashSecret(plain) === record.keyHash;
  return res.json({
    id: record.id,
    valid: matches,
    providerId: record.providerId,
    checkedAt: new Date().toISOString(),
  });
});

adminRouter.get("/admin/users", (_req, res) => {
  res.json({ users: db.users });
});

adminRouter.get("/admin/subscription", (_req, res) => {
  res.json({
    subscription: {
      tenantId: "tenant-ftas-demo",
      plan: "enterprise",
      status: "active",
      seats: 120,
      renewalDate: "2026-12-31T00:00:00.000Z",
    },
  });
});
