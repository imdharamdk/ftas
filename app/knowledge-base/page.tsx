import { KnowledgePanel } from "@/components/ecosystem/KnowledgePanel";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const researchDepartment = getDepartmentById("research-ai");
const memoryDepartment = getDepartmentById("memory-ai");

export default function KnowledgeBasePage() {
  return (
    <WorkspaceShell
      title="Knowledge Base"
      description="Unified research and memory workspace with semantic retrieval, vector persistence, and cross-agent knowledge graph context."
    >
      <KnowledgePanel />
      <div className="grid gap-4">
        <DepartmentStudio department={researchDepartment} />
        <DepartmentStudio department={memoryDepartment} />
      </div>
    </WorkspaceShell>
  );
}
