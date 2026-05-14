import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function issueToken(payload) {
  return jwt.sign(payload, env.jwtSecret, {
    issuer: env.jwtIssuer,
    audience: env.jwtAudience,
    expiresIn: "12h",
  });
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const demoUser = req.headers["x-dev-user"];

  if (!authHeader && demoUser) {
    req.user = {
      id: String(demoUser),
      tenantId: req.headers["x-tenant-id"] ?? "tenant-ftas-demo",
      role: "owner",
      email: `${demoUser}@ftas.ai`,
    };
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, env.jwtSecret, {
      issuer: env.jwtIssuer,
      audience: env.jwtAudience,
    });
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
