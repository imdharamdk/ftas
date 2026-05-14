from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS OCR Service", version="1.0.0")


class OcrRequest(BaseModel):
    fileName: str
    mimeType: str
    sourceUrl: str | None = None


@app.get("/health")
def health() -> dict:
    return {"service": "ocr-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/ocr/extract")
def extract(payload: OcrRequest) -> dict:
    return {
        "status": "parsed",
        "fileName": payload.fileName,
        "engines": ["nemotron-ocr-v1", "nemotron-parse", "nemotron-table-structure-v1"],
        "tablesDetected": 3,
        "summary": "Invoice parsed with line items and totals.",
        "processedAt": datetime.now(timezone.utc).isoformat(),
    }
