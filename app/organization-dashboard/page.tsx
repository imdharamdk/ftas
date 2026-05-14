import Link from "next/link";
import { BriefcaseBusiness, GitBranchPlus } from "lucide-react";
import { AgentMetricsCharts } from "@/components/ecosystem/AgentMetricsCharts";
import { OrganizationSummary } from "@/components/ecosystem/OrganizationSummary";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { Button } from "@/components/ui/button";

export default function OrganizationDashboardPage() {
  return (
    <WorkspaceShell
      title="Organization Dashboard"
      description="Enterprise overview of departments, tenant metrics, subscription state, provider readiness, and orchestration performance."
      actions={
        <>
          <Link href="/workflow-visualizer">
            <Button variant="secondary">
              <GitBranchPlus className="h-4 w-4" />
              Configure Workflow
            </Button>
          </Link>
          <Link href="/admin-panel">
            <Button>
              <BriefcaseBusiness className="h-4 w-4" />
              Manage Organization
            </Button>
          </Link>
        </>
      }
    >
      <OrganizationSummary />
      <AgentMetricsCharts />
    </WorkspaceShell>
  );
}
