"use client";

import { useEffect, useState } from "react";
import { RadioTower } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type WsEvent = {
  event: string;
  payload: {
    step?: string;
    message?: string;
    taskId?: string;
  };
  timestamp: string;
};

export function LiveEventsStream() {
  const [status, setStatus] = useState<"connecting" | "online" | "offline">("connecting");
  const [events, setEvents] = useState<WsEvent[]>([]);

  useEffect(() => {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_EVENTS_URL ?? "ws://localhost:8080/ws/events";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => setStatus("online");
    socket.onclose = () => setStatus("offline");
    socket.onerror = () => setStatus("offline");
    socket.onmessage = (message) => {
      try {
        const payload = JSON.parse(message.data);
        setEvents((current) => [payload, ...current].slice(0, 20));
      } catch {
        // Ignore malformed websocket payloads.
      }
    };

    return () => socket.close();
  }, []);

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <RadioTower className="h-4 w-4 text-cyan-100" />
            Realtime Agent Communication
          </span>
          <Badge variant={status === "online" ? "success" : status === "connecting" ? "warning" : "danger"}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-slate-300">
            Waiting for websocket events from gateway at <code>{process.env.NEXT_PUBLIC_WS_EVENTS_URL ?? "ws://localhost:8080/ws/events"}</code>
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((event, index) => (
              <div key={`${event.timestamp}-${index}`} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-cyan-100">{event.payload.step ?? event.event}</span>
                  <span className="text-slate-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="mt-1 text-slate-300">{event.payload.message ?? "No message"}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
