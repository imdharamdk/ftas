from datetime import datetime, timezone
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FTAS Simulation Service", version="1.0.0")


class SimulationRequest(BaseModel):
    prompt: str
    environment: str = "openusd"


@app.get("/health")
def health() -> dict:
    return {"service": "simulation-service", "status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/simulation/run")
def run_simulation(payload: SimulationRequest) -> dict:
    return {
        "status": "queued",
        "environment": payload.environment,
        "model": "TRELLIS",
        "jobId": f"sim-{int(datetime.now(timezone.utc).timestamp())}",
        "submittedAt": datetime.now(timezone.utc).isoformat(),
    }
