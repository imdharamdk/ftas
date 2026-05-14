"use client";

import { useState } from "react";
import { Bell, Star, UserRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function ProfilePage() {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");
  const [alerts, setAlerts] = useState({
    billing: true,
    incidents: true,
    updates: false,
  });

  return (
    <>
      <PageHero
        eyebrow="Profile"
        title="Manage Profile, Notifications, And Product Feedback."
        description="Adjust notification preferences, review saved settings, and rate your FTAS platform experience."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                <UserRound className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Aarav Sharma</h2>
                <p className="text-sm text-slate-300">Operations Manager • Growth Plan</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm text-slate-200">
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Email: aarav@company.com</p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Workspace: FinX Ops</p>
              <p className="rounded-md border border-white/10 bg-white/5 px-3 py-2">Role: Manager</p>
            </div>
          </article>

          <article className="glass-panel-strong rounded-lg p-6">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Bell className="h-5 w-5 text-cyan-100" />
              Notification center
            </div>
            <div className="grid gap-3">
              <ToggleRow
                label="Billing reminders"
                enabled={alerts.billing}
                onToggle={() => setAlerts((current) => ({ ...current, billing: !current.billing }))}
              />
              <ToggleRow
                label="Incident alerts"
                enabled={alerts.incidents}
                onToggle={() => setAlerts((current) => ({ ...current, incidents: !current.incidents }))}
              />
              <ToggleRow
                label="Feature updates"
                enabled={alerts.updates}
                onToggle={() => setAlerts((current) => ({ ...current, updates: !current.updates }))}
              />
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell pt-4">
        <article className="premium-card p-6">
          <h2 className="text-xl font-semibold text-white">Feedback and rating</h2>
          <p className="mt-2 text-sm text-slate-300">Help us improve the FTAS product experience.</p>
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const active = index + 1 <= rating;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`rounded-md border p-2 ${
                    active ? "border-solar/40 bg-solar/20 text-solar" : "border-white/10 bg-white/5 text-slate-400"
                  }`}
                >
                  <Star className={`h-5 w-5 ${active ? "fill-current" : ""}`} />
                </button>
              );
            })}
          </div>
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            className="form-field mt-4 min-h-28 resize-none"
            placeholder="Share feature feedback..."
          />
          <button type="button" className="holo-button holo-button-primary mt-4">
            Submit Feedback
          </button>
        </article>
      </section>
    </>
  );
}

function ToggleRow({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
    >
      {label}
      <span className={`rounded-full px-2 py-1 text-xs ${enabled ? "bg-signal/15 text-signal" : "bg-white/5 text-slate-400"}`}>
        {enabled ? "On" : "Off"}
      </span>
    </button>
  );
}
