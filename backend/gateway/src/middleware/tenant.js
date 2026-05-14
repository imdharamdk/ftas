export function tenantContext(req, _res, next) {
  req.tenant = {
    id: req.headers["x-tenant-id"] ?? req.user?.tenantId ?? "tenant-ftas-demo",
    plan: req.headers["x-tenant-plan"] ?? "enterprise",
  };
  next();
}
