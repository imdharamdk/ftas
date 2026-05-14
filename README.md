# FTAS AI Ecosystem

FTAS AI Ecosystem is a multi-agent enterprise AI operating system built on the existing FTAS website codebase.

## Frontend Stack
- Next.js + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- React Flow
- Zustand
- Shadcn-style component layer (`components/ui`)

## Backend Stack (Scaffold)
- Node.js API Gateway (Express)
- FastAPI microservices
- PostgreSQL (+ pgvector)
- Redis
- WebSocket event stream
- JWT + RBAC + tenant middleware

## Local Frontend
```bash
npm install
npm run dev
```

## Full Platform (Docker)
```bash
docker compose up --build
```

## Render Blueprint
Import this repository in Render with `render.yaml` enabled.  
It provisions:
- API Gateway (`web`)
- Async AI Worker (`worker`)
- Scheduled Maintenance (`cron`)
- FastAPI private microservices (`pserv`)
- Managed PostgreSQL
- Managed Key Value (Redis-compatible)

See:
- `docs/FTAS_AI_ECOSYSTEM_ARCHITECTURE.md`
- `docs/RENDER_SECRET_STRATEGY.md`
- `backend/README.md`
