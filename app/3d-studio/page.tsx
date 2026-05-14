import { Cuboid, ScanSearch } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const simulationDepartment = getDepartmentById("3d-ai");

export default function ThreeDStudioPage() {
  return (
    <WorkspaceShell
      title="3D Studio"
      description="3D AI department for generation, OpenUSD validation, simulation workflows, and digital environment assets."
    >
      <DepartmentStudio
        department={simulationDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <Cuboid className="h-4 w-4" />
              openusd.workspace
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
              Generate asset with TRELLIS → export scene.usd → validate with usdvalidate.
            </div>
            <div className="mt-3 rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
              Run physics projection via cosmos-predict1-5b for simulation previews.
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-signal/25 bg-signal/10 px-3 py-2 text-xs text-signal">
              <ScanSearch className="h-4 w-4" />
              OpenUSD scene integrity: verified
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
