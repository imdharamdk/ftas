# FTAS AI Ecosystem Backend

## Modules
- `gateway/`: Node.js API gateway with JWT auth, RBAC, tenant middleware, orchestration engine, and websocket hub.
- `../services/*`: FastAPI microservices for memory, OCR, voice, safety, creative, media, and simulation.
- `../infra/postgres/schema.sql`: Multi-tenant SQL schema with orchestration, billing, memory, and security tables.

## Run (Docker)
```bash
docker compose up --build
```

Gateway:
- HTTP: `http://localhost:8080/api/v1`
- WS events: `ws://localhost:8080/ws/events`

## Render Deployment
`render.yaml` at the repo root provisions:
- `ftas-ai-gateway` (web)
- `ftas-ai-worker` (background worker)
- `ftas-ai-maintenance-cron` (scheduled job)
- private FastAPI microservices
- managed PostgreSQL and Key Value resources

Important:
- Set `API_KEY_ENCRYPTION_SECRET` on `ftas-ai-gateway`.
- Admin API key inserts are encrypted at rest using AES-256-GCM.

## Sample auth token request
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "content-type: application/json" \
  -d '{"email":"owner@ftas.ai","password":"password123","tenantId":"tenant-ftas-demo"}'
```

## Sample orchestration request
```bash
curl -X POST http://localhost:8080/api/v1/orchestrator/execute \
  -H "authorization: Bearer <TOKEN>" \
  -H "content-type: application/json" \
  -d '{
    "tenantId":"tenant-ftas-demo",
    "requestedBy":"usr-owner",
    "input":"Create a secure OCR + analytics workflow for invoices."
  }'
```
