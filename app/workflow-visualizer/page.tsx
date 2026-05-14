import { Workflow } from "lucide-react";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { WorkflowVisualizer } from "@/components/ecosystem/WorkflowVisualizer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkflowVisualizerPage() {
  return (
    <WorkspaceShell
      title="AI Workflow Visualizer"
      description="Draggable orchestration graph for routing, chaining, safety checks, fallback sequencing, and memory writeback stages."
    >
      <WorkflowVisualizer />
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-4 w-4 text-cyan-100" />
            Routing Engine Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-2 text-sm text-slate-200">
            <li>1. User Input</li>
            <li>2. CEO AI Router</li>
            <li>3. Task Classification</li>
            <li>4. Department Routing</li>
            <li>5. Specialized AI Processing</li>
            <li>6. Safety Validation</li>
            <li>7. Memory Storage</li>
            <li>8. Final Response Streaming</li>
          </ol>
        </CardContent>
      </Card>
    </WorkspaceShell>
  );
}
