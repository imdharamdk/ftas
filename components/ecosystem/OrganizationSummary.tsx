"use client";

import { Building2, CreditCard, UsersRound } from "lucide-react";
import { useAdminStore } from "@/stores/useAdminStore";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OrganizationSummary() {
  const tenant = useEcosystemStore((state) => state.tenant);
  const users = useAdminStore((state) => state.users);
  const subscription = useAdminStore((state) => state.subscription);
  const providers = useAdminStore((state) => state.providers);

  const enabledProviders = providers.filter((provider) => provider.enabled).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-cyan-100" />
            Tenant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-white">{tenant.orgName}</div>
          <div className="text-xs text-slate-400">{tenant.tenantId}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UsersRound className="h-4 w-4 text-cyan-100" />
            Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-white">{users.length}</div>
          <div className="text-xs text-slate-400">RBAC enabled</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-cyan-100" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-white">{subscription.plan}</div>
          <Badge variant="success" className="mt-2">
            {subscription.status}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Provider Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-white">{enabledProviders}</div>
          <div className="text-xs text-slate-400">Enabled providers</div>
        </CardContent>
      </Card>
    </div>
  );
}
