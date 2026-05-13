"use client";

import { useEffect, useState } from "react";

const lines = [
  "ftas.boot(platform: auth + analytics + automation + billing)",
  "event.ingest -> ai.route -> workflow.execute -> sla.observe",
  "status: enterprise fintech infrastructure online",
];

export function TerminalTicker() {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState("");

  useEffect(() => {
    const activeLine = lines[lineIndex];
    let charIndex = 0;
    setVisible("");

    const typing = window.setInterval(() => {
      charIndex += 1;
      setVisible(activeLine.slice(0, charIndex));

      if (charIndex >= activeLine.length) {
        window.clearInterval(typing);
        window.setTimeout(() => {
          setLineIndex((current) => (current + 1) % lines.length);
        }, 1350);
      }
    }, 34);

    return () => window.clearInterval(typing);
  }, [lineIndex]);

  return (
    <div className="mt-6 rounded-lg border border-signal/20 bg-black/40 px-4 py-3 font-mono text-xs text-signal shadow-2xl backdrop-blur">
      <span className="text-cyan-100/55">root@ftas:~$ </span>
      <span>{visible}</span>
      <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-signal align-[-2px]" />
    </div>
  );
}
