"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { providerCatalog } from "@/data/ecosystem";
import type { ProviderConfig, ProviderId, Role } from "@/types/ecosystem";

type ApiKeyRecord = {
  id: string;
  providerId: ProviderId;
  label: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt?: string;
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "invited" | "suspended";
};

type SubscriptionRecord = {
  tenantId: string;
  plan: "starter" | "growth" | "enterprise";
  seats: number;
  status: "active" | "trialing" | "past_due";
  renewalDate: string;
};

type AdminState = {
  providers: ProviderConfig[];
  keys: ApiKeyRecord[];
  users: UserRecord[];
  subscription: SubscriptionRecord;
  setProviderStatus: (providerId: ProviderId, enabled: boolean) => void;
  updateProviderRateLimit: (providerId: ProviderId, rateLimitRpm: number) => void;
  setProviderBaseUrl: (providerId: ProviderId, baseUrl: string) => void;
  addApiKey: (payload: { providerId: ProviderId; label: string; rawKey: string }) => void;
  deleteApiKey: (keyId: string) => void;
  setUserRole: (userId: string, role: Role) => void;
  setSubscriptionPlan: (plan: SubscriptionRecord["plan"]) => void;
};

const defaultProviders: ProviderConfig[] = providerCatalog.map((provider) => ({
  id: provider.id,
  displayName: provider.label,
  baseUrl: `https://api.${provider.id}.com/v1`,
  apiKey: "",
  enabled: provider.id !== "others",
  rateLimitRpm: 120,
  health: "healthy",
  models: [],
}));

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      providers: defaultProviders,
      keys: [],
      users: [
        {
          id: "usr-1",
          name: "Platform Owner",
          email: "owner@ftas.ai",
          role: "owner",
          status: "active",
        },
        {
          id: "usr-2",
          name: "Ops Admin",
          email: "admin@ftas.ai",
          role: "admin",
          status: "active",
        },
      ],
      subscription: {
        tenantId: "tenant-ftas-demo",
        plan: "enterprise",
        seats: 120,
        status: "active",
        renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
      },
      setProviderStatus: (providerId, enabled) =>
        set((state) => ({
          providers: state.providers.map((provider) =>
            provider.id === providerId ? { ...provider, enabled } : provider,
          ),
        })),
      updateProviderRateLimit: (providerId, rateLimitRpm) =>
        set((state) => ({
          providers: state.providers.map((provider) =>
            provider.id === providerId ? { ...provider, rateLimitRpm } : provider,
          ),
        })),
      setProviderBaseUrl: (providerId, baseUrl) =>
        set((state) => ({
          providers: state.providers.map((provider) =>
            provider.id === providerId ? { ...provider, baseUrl } : provider,
          ),
        })),
      addApiKey: ({ providerId, label, rawKey }) =>
        set((state) => ({
          keys: [
            {
              id: `key-${crypto.randomUUID()}`,
              providerId,
              label,
              maskedKey: `${rawKey.slice(0, 5)}...${rawKey.slice(-4)}`,
              createdAt: new Date().toISOString(),
            },
            ...state.keys,
          ],
        })),
      deleteApiKey: (keyId) =>
        set((state) => ({
          keys: state.keys.filter((key) => key.id !== keyId),
        })),
      setUserRole: (userId, role) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === userId ? { ...user, role } : user)),
        })),
      setSubscriptionPlan: (plan) =>
        set((state) => ({
          subscription: {
            ...state.subscription,
            plan,
          },
        })),
    }),
    {
      name: "ftas-admin-store",
    },
  ),
);
