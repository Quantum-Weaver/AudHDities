// components/cosmic/AgentVisualization.tsx
// Updated to match database schema

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { GLOW_EFFECTS } from "@/lib/constants/cosmic/effects";
import { MOOD_COLORS, ENERGY_COLORS } from "@/lib/constants/cosmic/colors";

// Database types
export interface AgentActivity {
  id: string;
  agent_name: 'aethelred' | 'seer' | 'skald' | 'archivist' | 'chancellor' | 'curator' | 'executioner' | 'hearth_keeper' | 'codex' | 'quantum_weaver' | 'system';
  action: 'analyze' | 'create' | 'update' | 'delete' | 'communicate' | 'transform' | 'integrate' | 'orchestrate' | 'observe' | 'respond';
  status: 'active' | 'idle' | 'processing' | 'completed' | 'failed' | 'queued';
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgentVisualizationProps {
  activities: AgentActivity[];
  className?: string;
}

const agentColors: Record<string, string> = {
  'aethelred': MOOD_COLORS.mystical,
  'seer': MOOD_COLORS.creative,
  'skald': MOOD_COLORS.energized,
  'archivist': MOOD_COLORS.calm,
  'chancellor': MOOD_COLORS.focused,
  'curator': MOOD_COLORS.grounded,
  'executioner': MOOD_COLORS.intense,
  'hearth_keeper': MOOD_COLORS.peaceful,
  'codex': MOOD_COLORS.mystical,
  'quantum_weaver': ENERGY_COLORS.quantum,
  'system': MOOD_COLORS.calm,
};

const statusColors: Record<AgentActivity['status'], string> = {
  active: `text-[${ENERGY_COLORS.quantum}] bg-[${ENERGY_COLORS.quantum}]/10`,
  processing: `text-[${MOOD_COLORS.creative}] bg-[${MOOD_COLORS.creative}]/10`,
  idle: `text-[${MOOD_COLORS.calm}] bg-[${MOOD_COLORS.calm}]/10`,
  completed: `text-[${ENERGY_COLORS.transformative}] bg-[${ENERGY_COLORS.transformative}]/10`,
  queued: `text-[${MOOD_COLORS.energized}] bg-[${MOOD_COLORS.energized}]/10`,
  failed: `text-[${MOOD_COLORS.intense}] bg-[${MOOD_COLORS.intense}]/10`,
};

export function AgentVisualization({ activities, className }: AgentVisualizationProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  // Group activities by agent
  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.agent_name]) acc[activity.agent_name] = [];
    acc[activity.agent_name].push(activity);
    return acc;
  }, {} as Record<string, AgentActivity[]>);

  const agents = Object.keys(groupedActivities);

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-star-dust/60 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-neurospark rounded-full animate-pulse" />
        Agent Constellation
      </h3>
      
      <div className="relative min-h-[300px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent) => {
            const agentActivities = groupedActivities[agent];
            const activeCount = agentActivities.filter(a => a.status === 'active').length;
            const agentColor = agentColors[agent.toLowerCase()] || MOOD_COLORS.mystical;
            const latestActivity = agentActivities[0];
            
            return (
              <motion.button
                key={agent}
                onClick={() => setSelectedAgent(selectedAgent === agent ? null : agent)}
                onMouseEnter={() => setHoveredAgent(agent)}
                onMouseLeave={() => setHoveredAgent(null)}
                className={cn(
                  "relative p-4 rounded-xl text-left transition-all duration-300",
                  "border backdrop-blur-sm",
                  selectedAgent === agent 
                    ? "border-neurospark/50 bg-neurospark/10 shadow-lg shadow-neurospark/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                )}
                style={{
                  boxShadow: hoveredAgent === agent ? GLOW_EFFECTS.quantum : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-star-dust capitalize">
                    {agent.replace('_', ' ')}
                  </span>
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    activeCount > 0 ? "bg-neurospark" : "bg-white/20"
                  )} />
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    size="sm"
                    className={cn("text-[10px]", statusColors[latestActivity?.status || 'idle'])}
                  >
                    {latestActivity?.status || 'idle'}
                  </Badge>
                  <span className="text-xs text-star-dust/40">
                    {agentActivities.length} activities
                  </span>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {selectedAgent === agent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-white/10 space-y-1"
                    >
                      {agentActivities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="text-xs text-star-dust/40">
                          <span className="text-neurospark">{activity.title}</span>
                          <span className="mx-1">•</span>
                          {new Date(activity.created_at).toLocaleTimeString()}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-neurospark rounded-full animate-pulse" />
          <span className="text-star-dust/40">Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-white/20 rounded-full" />
          <span className="text-star-dust/40">Idle</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: MOOD_COLORS.creative }} />
          <span className="text-star-dust/40">Processing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ENERGY_COLORS.transformative }} />
          <span className="text-star-dust/40">Completed</span>
        </div>
      </div>
    </Card>
  );
}