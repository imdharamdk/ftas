from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Memory Service", version="1.0.0")


class MemoryWriteRequest(BaseModel):
    tenantId: str
    taskId: str
    classification: str
    content: str
    metadata: dict


@app.get("/health")
def health() -> dict:
    return {"service": "memory-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/memory/write")
def write_memory(payload: MemoryWriteRequest) -> dict:
    # Placeholder for vectorization + write to pgvector/redis index.
    return {
        "stored": True,
        "vectorBackend": "pgvector",
        "taskId": payload.taskId,
        "indexedAt": datetime.now(timezone.utc).isoformat(),
    }
