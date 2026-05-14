"use client";

import { useCallback, useEffect } from "react";
import {
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useWorkflowStore } from "@/stores/useWorkflowStore";

export function WorkflowVisualizer() {
  const savedNodes = useWorkflowStore((state) => state.nodes);
  const savedEdges = useWorkflowStore((state) => state.edges);
  const setSavedNodes = useWorkflowStore((state) => state.setNodes);
  const setSavedEdges = useWorkflowStore((state) => state.setEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);

  useEffect(() => {
    setSavedNodes(nodes);
  }, [nodes, setSavedNodes]);

  useEffect(() => {
    setSavedEdges(edges);
  }, [edges, setSavedEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((current) => {
        const next = addEdge({ ...params, animated: true }, current);
        setSavedEdges(next);
        return next;
      });
    },
    [setSavedEdges, setEdges],
  );

  return (
    <div className="glass-panel-strong h-[34rem] overflow-hidden rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-transparent"
      >
        <MiniMap
          nodeColor="rgba(0, 231, 255, 0.5)"
          maskColor="rgba(3, 5, 8, 0.4)"
          style={{ background: "rgba(3, 10, 20, 0.6)" }}
        />
        <Controls />
        <Background gap={22} size={1} color="rgba(0,231,255,0.15)" />
      </ReactFlow>
    </div>
  );
}
