// @/components/seidr/immersive/ConstellationViewer.tsx

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  label: string;
  radius?: number;
  color?: string;
}

export interface ConstellationEdge {
  from: string;
  to: string;
  strength?: number;
}

export interface ConstellationViewerProps {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  onNodeClick?: (node: ConstellationNode) => void;
  onEdgeClick?: (edge: ConstellationEdge) => void;
  className?: string;
}

export function ConstellationViewer({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  className,
}: ConstellationViewerProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className={cn("relative w-full h-full min-h-[400px] bg-black/20 rounded-xl overflow-hidden", className)}>
      <svg className="w-full h-full" viewBox="0 0 800 600">
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(108, 92, 231, 0.3)"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onClick={() => onEdgeClick?.(edge)}
              className="cursor-pointer hover:stroke-cyan-400 transition-colors"
            />
          );
        })}

        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            onClick={() => onNodeClick?.(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <motion.circle
              r={node.radius || 8}
              fill={node.color || "#6C5CE7"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
            <motion.circle
              r={(node.radius || 8) + 4}
              fill="none"
              stroke="rgba(108, 92, 231, 0.3)"
              animate={{
                r: hoveredNode === node.id ? (node.radius || 8) + 8 : (node.radius || 8) + 4,
              }}
            />
            {hoveredNode === node.id && (
              <text
                x={0}
                y={-(node.radius || 8) - 8}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="pointer-events-none"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}