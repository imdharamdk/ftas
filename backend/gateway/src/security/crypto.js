import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { env } from "../config/env.js";

function getKey() {
  // Normalize any secret length into a fixed 32-byte key for AES-256.
  return createHash("sha256").update(env.apiKeyEncryptionSecret).digest();
}

export function hashSecret(plainText) {
  return createHash("sha256").update(plainText).digest("hex");
}

export function encryptSecret(plainText) {
  const key = getKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    cipherText: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

export function decryptSecret(payload) {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "base64");
  const authTag = Buffer.from(payload.authTag, "base64");
  const cipherText = Buffer.from(payload.cipherText, "base64");

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  return decrypted.toString("utf8");
}
