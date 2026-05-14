from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Creative Service", version="1.0.0")


class PromptRequest(BaseModel):
    prompt: str
    model: str = "FLUX.1-dev"


@app.get("/health")
def health() -> dict:
    return {"service": "creative-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/creative/generate")
def generate(payload: PromptRequest) -> dict:
    return {
        "status": "queued",
        "model": payload.model,
        "prompt": payload.prompt,
        "assetUrl": "https://example.ftas.ai/assets/generated-image.png",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }
