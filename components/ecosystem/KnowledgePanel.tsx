"use client";

import { BrainCircuit, Database, Network, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const vectorItems = [
  { bucket: "Conversation Memory", vectors: "182k", freshness: "2m ago" },
  { bucket: "Research Corpus", vectors: "1.2M", freshness: "8m ago" },
  { bucket: "Compliance Docs", vectors: "84k", freshness: "15m ago" },
];

export function KnowledgePanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="glass-panel-strong">
        <CardHeader>
          <CardTitle>Memory & Embedding Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {vectorItems.map((item) => (
              <article key={item.bucket} className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-100">{item.bucket}</p>
                  <span className="text-xs text-cyan-100/70">{item.freshness}</span>
                </div>
                <p className="mt-2 text-xs text-slate-300">{item.vectors} vectors indexed</p>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Knowledge Graph Signals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <Database className="h-5 w-5 text-cyan-100" />
              <p className="mt-2 text-sm font-semibold text-white">Vector Database</p>
              <p className="mt-1 text-xs text-slate-300">PostgreSQL + pgvector + Redis cache layers.</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <Search className="h-5 w-5 text-cyan-100" />
              <p className="mt-2 text-sm font-semibold text-white">Semantic Retrieval</p>
              <p className="mt-1 text-xs text-slate-300">Hybrid retrieval with metadata filters and reranking.</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <Network className="h-5 w-5 text-cyan-100" />
              <p className="mt-2 text-sm font-semibold text-white">Cross-Department Links</p>
              <p className="mt-1 text-xs text-slate-300">CEO AI can reuse findings from research and security traces.</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <BrainCircuit className="h-5 w-5 text-cyan-100" />
              <p className="mt-2 text-sm font-semibold text-white">RAG Memory Writeback</p>
              <p className="mt-1 text-xs text-slate-300">Every approved orchestration output is indexed for reuse.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
