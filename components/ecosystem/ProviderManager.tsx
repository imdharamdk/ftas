"use client";

import { useMemo, useState } from "react";
import { KeyRound, Plus, Trash2 } from "lucide-react";
import { providerCatalog } from "@/data/ecosystem";
import { useAdminStore } from "@/stores/useAdminStore";
import type { ProviderId } from "@/types/ecosystem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProviderManager() {
  const providers = useAdminStore((state) => state.providers);
  const keys = useAdminStore((state) => state.keys);
  const setProviderStatus = useAdminStore((state) => state.setProviderStatus);
  const updateProviderRateLimit = useAdminStore((state) => state.updateProviderRateLimit);
  const setProviderBaseUrl = useAdminStore((state) => state.setProviderBaseUrl);
  const addApiKey = useAdminStore((state) => state.addApiKey);
  const deleteApiKey = useAdminStore((state) => state.deleteApiKey);

  const [providerId, setProviderId] = useState<ProviderId>("openai");
  const [label, setLabel] = useState("");
  const [rawKey, setRawKey] = useState("");

  const providerNameById = useMemo(
    () => Object.fromEntries(providerCatalog.map((provider) => [provider.id, provider.label])),
    [],
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="glass-panel-strong">
        <CardHeader>
          <CardTitle>Provider Adapters & Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {providers.map((provider) => (
              <article key={provider.id} className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{provider.displayName}</h3>
                    <p className="text-xs text-slate-400">{provider.baseUrl}</p>
                  </div>
                  <Badge
                    variant={
                      provider.health === "healthy"
                        ? "success"
                        : provider.health === "degraded"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {provider.health}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
                  <input
                    className="form-field py-2 text-xs"
                    value={provider.baseUrl}
                    onChange={(event) => setProviderBaseUrl(provider.id, event.target.value)}
                    aria-label={`${provider.displayName} base URL`}
                  />
                  <input
                    type="number"
                    min={1}
                    className="form-field w-28 py-2 text-xs"
                    value={provider.rateLimitRpm}
                    onChange={(event) =>
                      updateProviderRateLimit(provider.id, Number(event.target.value) || 1)
                    }
                    aria-label={`${provider.displayName} rate limit`}
                  />
                  <Button
                    variant={provider.enabled ? "secondary" : "default"}
                    size="sm"
                    onClick={() => setProviderStatus(provider.id, !provider.enabled)}
                  >
                    {provider.enabled ? "Disable" : "Enable"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Manual API Key Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-cyan-100/70">Provider</span>
                <select
                  className="form-field py-2 text-xs"
                  value={providerId}
                  onChange={(event) => setProviderId(event.target.value as ProviderId)}
                >
                  {providerCatalog.map((provider) => (
                    <option key={provider.id} value={provider.id} className="bg-[#041226] text-white">
                      {provider.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-cyan-100/70">Label</span>
                <input
                  className="form-field py-2 text-xs"
                  placeholder="Production key"
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-cyan-100/70">API Key</span>
                <input
                  className="form-field py-2 text-xs"
                  placeholder="sk-..."
                  value={rawKey}
                  onChange={(event) => setRawKey(event.target.value)}
                />
              </label>

              <Button
                className="w-full"
                onClick={() => {
                  if (!label.trim() || !rawKey.trim()) return;
                  addApiKey({
                    providerId,
                    label: label.trim(),
                    rawKey: rawKey.trim(),
                  });
                  setLabel("");
                  setRawKey("");
                }}
              >
                <Plus className="h-4 w-4" />
                Add API Key
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Stored API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            {keys.length === 0 ? (
              <p className="text-sm text-slate-300">No keys saved.</p>
            ) : (
              <div className="space-y-2">
                {keys.map((key) => (
                  <div key={key.id} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-100">{key.label}</p>
                        <p className="text-slate-400">
                          {providerNameById[key.providerId]} • {key.maskedKey}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-md border border-rose-300/20 bg-rose-500/10 p-1.5 text-rose-200"
                        onClick={() => deleteApiKey(key.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-400">
              <KeyRound className="h-4 w-4" />
              Keys are masked and tenant-scoped in UI state.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
