from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Voice Service", version="1.0.0")


class VoiceRequest(BaseModel):
    language: str = "en"
    text: str


@app.get("/health")
def health() -> dict:
    return {"service": "voice-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/voice/transcribe")
def transcribe() -> dict:
    return {
        "status": "ok",
        "text": "Live transcription placeholder",
        "engine": "whisper-large-v3",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/voice/synthesize")
def synthesize(payload: VoiceRequest) -> dict:
    return {
        "status": "queued",
        "language": payload.language,
        "engine": "magpie-tts-multilingual",
        "audioUrl": "https://example.ftas.ai/audio/sample.wav",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
