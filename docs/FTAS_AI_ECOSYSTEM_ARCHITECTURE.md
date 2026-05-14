# FTAS AI Ecosystem Architecture

## Overview
FTAS AI Ecosystem is structured as a multi-tenant, multi-agent AI operating system with a Next.js control plane and a Node.js API gateway orchestrating FastAPI microservices.

## High-Level Topology
1. Frontend (Next.js, TypeScript, Tailwind, Framer Motion, Recharts, React Flow, Zustand)
2. API Gateway (Node.js/Express, JWT, RBAC, WebSocket hub, orchestration engine)
3. Microservices (FastAPI):
   - memory-service
   - ocr-service
   - voice-service
   - safety-service
   - creative-service
   - media-service
   - simulation-service
4. Data Layer:
   - PostgreSQL (+ pgvector extension)
   - Redis (queue/cache/session primitives)

## Core Orchestration Flow
1. User Input
2. CEO AI Router
3. Task Classification
4. Department Routing
5. Specialized AI Processing
6. Safety Validation
7. Memory Storage
8. Final Response

## Gateway Modules
- `src/routes/*`: API surface (`/auth`, `/admin`, `/orchestrator`)
- `src/middleware/*`: authentication, RBAC, tenant context
- `src/services/orchestrator/*`: classifier, router, retry, execution engine
- `src/services/providers/*`: provider abstraction adapter layer
- `src/services/memory/*`, `src/services/safety/*`: microservice clients
- `src/websocket/hub.js`: realtime event broadcasting
- `src/queue/workflowQueue.js`: async queue scaffold

## Security Model
- JWT authentication with issuer/audience validation
- RBAC roles: owner, admin, manager, analyst, member, viewer
- Tenant-aware context propagation (`x-tenant-id` fallback)
- Safety service as mandatory orchestration stage
- Provider API keys encrypted at rest (AES-256-GCM) with integrity hash checks

## Multi-Tenant Data Model
Core entities are tenant-scoped:
- tenants
- users
- api_providers
- api_keys
- departments / department_models / routing_policies
- orchestration_tasks / orchestration_events / token_usage
- subscriptions / billing_history
- memory_documents (vector embeddings)
- security_events / workflow_templates / support_tickets

## Deployment
`docker-compose.yml` provisions:
- gateway
- postgres
- redis
- all FastAPI microservices

## Extending Providers
1. Add provider metadata in admin configuration.
2. Implement adapter logic in `backend/gateway/src/services/providers/providerClient.js` (or split by provider).
3. Register model availability in provider/dept mappings.

## Frontend Control Pages
- Landing Page
- AI Command Center
- Organization Dashboard
- AI Workflow Visualizer
- Admin Panel
- API Management
- AI Chat Workspace
- Fintech Dashboard
- AI Studio
- Voice Console
- OCR Workspace
- 3D Studio
- Media Studio
- Knowledge Base
- Security Center
- Settings
