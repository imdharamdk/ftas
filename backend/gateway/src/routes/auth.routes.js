import { Router } from "express";
import { z } from "zod";
import { issueToken } from "../middleware/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  tenantId: z.string().default("tenant-ftas-demo"),
});

authRouter.post("/auth/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { email, tenantId } = parsed.data;
  const role = email.includes("owner")
    ? "owner"
    : email.includes("admin")
      ? "admin"
      : "member";
  const token = issueToken({
    id: `usr-${email.split("@")[0]}`,
    email,
    tenantId,
    role,
  });
  return res.json({
    token,
    role,
    tenantId,
  });
});
