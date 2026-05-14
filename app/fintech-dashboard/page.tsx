import { FintechMarketPanel } from "@/components/ecosystem/FintechMarketPanel";
import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const marketDepartment = getDepartmentById("market-intelligence-ai");

export default function FintechDashboardPage() {
  return (
    <WorkspaceShell
      title="Fintech Dashboard"
      description="Market Intelligence AI workspace for trading analytics, sentiment scoring, portfolio insights, and signal explainability."
    >
      <FintechMarketPanel />
      <DepartmentStudio department={marketDepartment} />
    </WorkspaceShell>
  );
}
