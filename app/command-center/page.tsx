import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { DepartmentGrid } from "@/components/ecosystem/DepartmentGrid";
import { LiveEventsStream } from "@/components/ecosystem/LiveEventsStream";
import { OrganizationSummary } from "@/components/ecosystem/OrganizationSummary";
import { OrchestrationConsole } from "@/components/ecosystem/OrchestrationConsole";
import { TaskMonitor } from "@/components/ecosystem/TaskMonitor";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { Button } from "@/components/ui/button";

export default function CommandCenterPage() {
  return (
    <WorkspaceShell
      title="AI Command Center"
      description="Central control hub for CEO AI orchestration, multi-agent routing, execution timelines, and department-level governance."
      actions={
        <>
          <Link href="/workflow-visualizer">
            <Button variant="secondary">
              Open Workflow Builder
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/admin-panel">
            <Button>
              <ShieldCheck className="h-4 w-4" />
              Open Admin Panel
            </Button>
          </Link>
        </>
      }
    >
      <OrganizationSummary />
      <OrchestrationConsole />
      <LiveEventsStream />
      <TaskMonitor />
      <DepartmentGrid />
    </WorkspaceShell>
  );
}
