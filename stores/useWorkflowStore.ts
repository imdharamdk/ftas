"use client";

import { create } from "zustand";
import type { Edge, Node } from "@xyflow/react";

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

const initialNodes: Node[] = [
  {
    id: "input",
    type: "input",
    position: { x: 80, y: 220 },
    data: { label: "User Input" },
  },
  {
    id: "ceo",
    position: { x: 340, y: 220 },
    data: { label: "CEO AI Router (gpt-oss-120b)" },
  },
  {
    id: "classify",
    position: { x: 620, y: 120 },
    data: { label: "Task Classification" },
  },
  {
    id: "route",
    position: { x: 620, y: 320 },
    data: { label: "Department Routing" },
  },
  {
    id: "safety",
    position: { x: 920, y: 120 },
    data: { label: "Security & Safety Validation" },
  },
  {
    id: "memory",
    position: { x: 920, y: 320 },
    data: { label: "Memory Write + RAG" },
  },
  {
    id: "output",
    type: "output",
    position: { x: 1220, y: 220 },
    data: { label: "Final Response Stream" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "input", target: "ceo", animated: true },
  { id: "e2", source: "ceo", target: "classify", animated: true },
  { id: "e3", source: "ceo", target: "route", animated: true },
  { id: "e4", source: "classify", target: "safety", animated: true },
  { id: "e5", source: "route", target: "memory", animated: true },
  { id: "e6", source: "safety", target: "output", animated: true },
  { id: "e7", source: "memory", target: "output", animated: true },
];

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));
