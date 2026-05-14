import { DepartmentStudio } from "@/components/ecosystem/DepartmentStudio";
import { SecurityPanel } from "@/components/ecosystem/SecurityPanel";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { getDepartmentById } from "@/lib/ecosystem";

const securityDepartment = getDepartmentById("security-ai");

export default function SecurityCenterPage() {
  return (
    <WorkspaceShell
      title="Security Center"
      description="AI safety command for moderation, jailbreak detection, PII filtering, compliance gates, and firewall policy monitoring."
    >
      <SecurityPanel />
      <DepartmentStudio department={securityDepartment} />
    </WorkspaceShell>
  );
}
