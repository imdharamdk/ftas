"use client";

import { useMemo, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const suggestions = [
  "How does FTAS pricing work?",
  "Show dashboard capabilities",
  "Request onboarding workflow",
];

function getAssistantReply(input: string) {
  const normalized = input.toLowerCase();
  if (normalized.includes("price") || normalized.includes("plan")) {
    return "FTAS offers Launch, Scale, and Enterprise plans. You can compare them on the Pricing page and request a custom architecture quote.";
  }
  if (normalized.includes("dashboard") || normalized.includes("analytics")) {
    return "The dashboard includes KPI widgets, API status, activity logs, alerts, and role-specific admin views with market-oriented analytics panels.";
  }
  if (normalized.includes("demo") || normalized.includes("onboard")) {
    return "Use the Request Demo flow in Contact to start onboarding. FTAS maps your workflows, then proposes automation and infrastructure milestones.";
  }
  return "I can help with plans, features, onboarding, and support workflows. Ask for pricing, dashboard details, or automation capabilities.";
}

export function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "FTAS AI Assistant online. Ask about pricing, onboarding, analytics, or automation.",
    },
  ]);

  const nextId = useMemo(() => messages.length + 1, [messages.length]);

  const submitMessage = (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { id: nextId, role: "user", text: text.trim() };
    const assistantMessage: Message = {
      id: nextId + 1,
      role: "assistant",
      text: getAssistantReply(text),
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setDraft("");
  };

  return (
    <div className="fixed bottom-5 left-4 z-40 sm:bottom-8 sm:left-6">
      {open ? (
        <div className="glass-panel-strong w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
              <Bot className="h-4 w-4" />
              FTAS AI Assistant
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-md px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "border border-cyan-200/20 bg-cyan-200/10 text-cyan-50"
                    : "border border-white/10 bg-white/5 text-slate-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => submitMessage(item)}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:border-cyan-200/40"
                >
                  {item}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                submitMessage(draft);
              }}
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="form-field h-10 flex-1 py-0"
                placeholder="Ask FTAS assistant..."
              />
              <button type="submit" className="grid h-10 w-10 place-items-center rounded-md border border-cyan-200/30 bg-cyan-200/10">
                <Send className="h-4 w-4 text-cyan-50" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="holo-button holo-button-primary"
          aria-label="Open AI assistant widget"
        >
          <Sparkles className="h-4 w-4" />
          AI Assistant
        </button>
      )}
    </div>
  );
}
