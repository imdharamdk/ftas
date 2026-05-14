from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Media Service", version="1.0.0")


class MediaRequest(BaseModel):
    assetUrl: str
    operation: str


@app.get("/health")
def health() -> dict:
    return {"service": "media-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/media/process")
def process_media(payload: MediaRequest) -> dict:
    return {
        "status": "processing",
        "operation": payload.operation,
        "assetUrl": payload.assetUrl,
        "engine": "LipSync",
        "startedAt": datetime.now(timezone.utc).isoformat(),
    }
