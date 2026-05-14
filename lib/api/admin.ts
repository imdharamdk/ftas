import type { ProviderConfig } from "@/types/ecosystem";
import { apiRequest } from "./http";

export async function fetchProviders() {
  return apiRequest<{ providers: ProviderConfig[] }>("/api/v1/admin/providers");
}

export async function updateProvider(providerId: string, payload: Partial<ProviderConfig>) {
  return apiRequest<{ provider: ProviderConfig }>(`/api/v1/admin/providers/${providerId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createApiKey(payload: {
  providerId: string;
  label: string;
  value: string;
}) {
  return apiRequest<{ id: string; maskedKey: string }>("/api/v1/admin/api-keys", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
