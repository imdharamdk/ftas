import cors from "cors";
import express from "express";
import { adminRouter } from "./routes/admin.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { orchestratorRouter } from "./routes/orchestrator.routes.js";
import { authenticate } from "./middleware/auth.js";
import { requireRole } from "./middleware/rbac.js";
import { tenantContext } from "./middleware/tenant.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "2mb" }));

  app.use("/api/v1", healthRouter);
  app.use("/api/v1", authRouter);

  app.use("/api/v1", authenticate, tenantContext);
  app.use("/api/v1", orchestratorRouter);
  app.use("/api/v1", requireRole("admin"), adminRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  app.use((error, _req, res, _next) => {
    res.status(500).json({
      error: "Unexpected gateway error",
      detail: error instanceof Error ? error.message : String(error),
    });
  });

  return app;
}
