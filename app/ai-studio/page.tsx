import { ImagePlus, WandSparkles } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const creativeDepartment = getDepartmentById("creative-ai");

export default function AIStudioPage() {
  return (
    <WorkspaceShell
      title="AI Studio"
      description="Creative department studio for image generation, UI concepting, brand assets, and design prompt orchestration."
    >
      <DepartmentStudio
        department={creativeDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <WandSparkles className="h-4 w-4" />
              prompt.workspace
            </div>
            <textarea
              className="form-field min-h-24 resize-none text-sm"
              placeholder="Describe your creative brief for FLUX.1-dev / SD 3.5..."
            />
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button type="button" className="holo-button holo-button-primary">
                <ImagePlus className="h-4 w-4" />
                Generate Concept
              </button>
              <button type="button" className="holo-button holo-button-secondary">
                Queue Variations
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
              Active models: FLUX.1-dev, FLUX.1-schnell, qwen-image, stable-diffusion-3.5-large.
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
