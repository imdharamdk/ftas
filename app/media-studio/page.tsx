import { Clapperboard, Layers2 } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const mediaDepartment = getDepartmentById("media-ai");

export default function MediaStudioPage() {
  return (
    <WorkspaceShell
      title="Media Studio"
      description="Media AI department for video enhancement, AI dubbing, lip-sync orchestration, relighting, and synthetic video detection."
    >
      <DepartmentStudio
        department={mediaDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <Clapperboard className="h-4 w-4" />
              timeline.editor
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="rounded-md border border-white/10 bg-white/5 p-3">
                Scene 01: relighting preset "night neon" applied.
              </p>
              <p className="rounded-md border border-white/10 bg-white/5 p-3">
                Scene 02: LipSync pipeline with studiovoice multilingual dub.
              </p>
              <p className="rounded-md border border-white/10 bg-white/5 p-3">
                Scene 03: synthetic-video-detector score = 0.02 (safe).
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-cyan-200/25 bg-cyan-200/10 px-3 py-2 text-xs text-cyan-50">
              <Layers2 className="h-4 w-4" />
              Multi-track timeline and dubbing queue ready
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
