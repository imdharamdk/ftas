"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { DepartmentGrid } from "@/components/ecosystem/DepartmentGrid";
import { ProviderManager } from "@/components/ecosystem/ProviderManager";
import { WorkspaceShell } from "@/components/ecosystem/WorkspaceShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPanelPage() {
  const users = useAdminStore((state) => state.users);
  const setUserRole = useAdminStore((state) => state.setUserRole);
  const subscription = useAdminStore((state) => state.subscription);
  const setSubscriptionPlan = useAdminStore((state) => state.setSubscriptionPlan);

  return (
    <WorkspaceShell
      title="Admin Panel"
      description="Control API keys, department availability, routing priorities, subscription plans, users, and provider-level limits."
    >
      <ProviderManager />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>RBAC & Subscription Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="mb-4 block">
              <span className="mb-2 block text-xs font-semibold text-cyan-100/70">Subscription plan</span>
              <select
                className="form-field py-2 text-xs"
                value={subscription.plan}
                onChange={(event) =>
                  setSubscriptionPlan(event.target.value as "starter" | "growth" | "enterprise")
                }
              >
                <option className="bg-[#041226]" value="starter">
                  starter
                </option>
                <option className="bg-[#041226]" value="growth">
                  growth
                </option>
                <option className="bg-[#041226]" value="enterprise">
                  enterprise
                </option>
              </select>
            </label>

            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="rounded-md border border-white/10 bg-white/5 p-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-100">{user.name}</p>
                      <p className="text-slate-400">{user.email}</p>
                    </div>
                    <select
                      className="form-field py-1.5 text-xs"
                      value={user.role}
                      onChange={(event) =>
                        setUserRole(
                          user.id,
                          event.target.value as "owner" | "admin" | "manager" | "analyst" | "member" | "viewer",
                        )
                      }
                    >
                      {["owner", "admin", "manager", "analyst", "member", "viewer"].map((role) => (
                        <option key={role} className="bg-[#041226]" value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Department Routing Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-slate-300">
              Enable/disable departments and adjust active models and priorities.
            </p>
            <DepartmentGrid />
          </CardContent>
        </Card>
      </div>
    </WorkspaceShell>
  );
}
