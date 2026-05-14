import { Mic, RadioTower } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const voiceDepartment = getDepartmentById("voice-ai");

export default function VoiceConsolePage() {
  return (
    <WorkspaceShell
      title="Voice Console"
      description="Voice AI department for speech-to-text, text-to-speech, multilingual assistants, and AI call simulation."
    >
      <DepartmentStudio
        department={voiceDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <Mic className="h-4 w-4" />
              live.transcription
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
              [00:00:01] Listening for multilingual input...
            </div>
            <div className="mt-3 rounded-md border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
              [00:00:04] Voice AI: "Routing your request to Fintech Intelligence AI."
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button type="button" className="holo-button holo-button-primary">
                Start Microphone Stream
              </button>
              <button type="button" className="holo-button holo-button-secondary">
                Generate TTS
              </button>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-signal/30 bg-signal/10 px-3 py-2 text-xs text-signal">
              <RadioTower className="h-4 w-4" />
              Voice latency target: &lt; 450ms
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
