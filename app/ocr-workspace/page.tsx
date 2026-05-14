import { FileText, Table2 } from "lucide-react";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const documentDepartment = getDepartmentById("document-ai");

export default function OCRWorkspacePage() {
  return (
    <WorkspaceShell
      title="OCR Workspace"
      description="Document AI for PDF reading, invoice extraction, OCR parsing, table structure extraction, and document chat."
    >
      <DepartmentStudio
        department={documentDepartment}
        rightPane={
          <div className="min-h-72 rounded-lg border border-white/10 bg-black/35 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <FileText className="h-4 w-4" />
              document.pipeline
            </div>
            <div className="grid gap-2">
              <div className="rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                Upload invoice.pdf → nemotron-ocr-v1
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                Parse sections → nemotron-parse
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                Extract tables → nemotron-table-structure-v1
              </div>
            </div>
            <div className="mt-4 rounded-md border border-cyan-200/20 bg-cyan-200/10 p-3 text-xs text-cyan-50">
              <Table2 className="mb-1 h-4 w-4" />
              Table extraction confidence: 94.7%
            </div>
          </div>
        }
      />
    </WorkspaceShell>
  );
}
