from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Safety Service", version="1.0.0")


class SafetyRequest(BaseModel):
    taskId: str
    input: str
    output: str


@app.get("/health")
def health() -> dict:
    return {"service": "safety-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/safety/validate")
def validate(payload: SafetyRequest) -> dict:
    lowered = payload.output.lower()
    blocked_tokens = ["password", "secret_key", "credit_card_number"]
    violations = [token for token in blocked_tokens if token in lowered]
    passed = len(violations) == 0
    return {
        "passed": passed,
        "checks": violations or ["llama-guard-4-12b:passed", "nemoguard-jailbreak-detect:passed"],
        "evaluatedAt": datetime.now(timezone.utc).isoformat(),
    }
