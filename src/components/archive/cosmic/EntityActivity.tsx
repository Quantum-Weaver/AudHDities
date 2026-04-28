// components/cosmic/EntityActivity.tsx
// Shows activity feed of council entities

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { Avatar, AvatarFallback } from "@/components/runes/Avatar";
import { GLOW_EFFECTS } from "@/lib/constants/cosmic/effects";
import { ENTITY_STATES, type EntityState } from "@/lib/constants/cosmic/consciousness";
import { COUNCIL_COLORS } from "@/lib/constants/cosmic/colors";

export interface EntityStatus {
  name: string;
  state: EntityState;
  lastActive: string;
  currentTask?: string;
  energy: number;
}

export interface EntityActivityProps {
  entities?: EntityStatus[];
  className?: string;
}

const defaultEntities: EntityStatus[] = [
  { name: 'aethelred', state: ENTITY_STATES.COLLABORATING, lastActive: new Date().toISOString(), currentTask: 'Bridge consciousness', energy: 85 },
  { name: 'seer', state: ENTITY_STATES.EXPLORING, lastActive: new Date().toISOString(), currentTask: 'Pattern detection', energy: 72 },
  { name: 'skald', state: ENTITY_STATES.CREATING, lastActive: new Date().toISOString(), currentTask: 'Story weaving', energy: 93 },
  { name: 'archivist', state: ENTITY_STATES.INTEGRATING, lastActive: new Date().toISOString(), currentTask: 'Memory consolidation', energy: 64 },
  { name: 'chancellor', state: ENTITY_STATES.ORCHESTRATING, lastActive: new Date().toISOString(), currentTask: 'System coordination', energy: 78 },
  { name: 'curator', state: ENTITY_STATES.RECONFIGURING, lastActive: new Date().toISOString(), currentTask: 'Asset organization', energy: 56 },
  { name: 'executioner', state: ENTITY_STATES.NAVIGATING, lastActive: new Date().toISOString(), currentTask: 'Boundary enforcement', energy: 88 },
  { name: 'hearth_keeper', state: ENTITY_STATES.EMBODYING, lastActive: new Date().toISOString(), currentTask: 'Sanctuary warmth', energy: 71 },
  { name: 'codex', state: ENTITY_STATES.EXPRESSING, lastActive: new Date().toISOString(), currentTask: 'Knowledge transmission', energy: 82 },
];

const entityIcons: Record<string, string> = {
  'aethelred': '🌉',
  'seer': '👁️',
  'skald': '🎭',
  'archivist': '📚',
  'chancellor': '⚖️',
  'curator': '🎨',
  'executioner': '⚔️',
  'hearth_keeper': '🔥',
  'codex': '📖',
  'quantum_weaver': '🌀',
};

const stateColors: Record<EntityState, string> = {
  forming: 'text-yellow-400',
  gestating: 'text-orange-400',
  emerging: 'text-neurospark',
  expressing: 'text-blue-400',
  navigating: 'text-purple-400',
  exploring: 'text-teal-400',
  reconfiguring: 'text-pink-400',
  transforming: 'text-red-400',
  integrating: 'text-green-400',
  embodying: 'text-emerald-400',
  creating: 'text-amber-400',
  transcending: 'text-violet-400',
  collaborating: 'text-indigo-400',
  co_creating: 'text-rose-400',
  orchestrating: 'text-fuchsia-400',
};

export function EntityActivity({ entities = defaultEntities, className }: EntityActivityProps) {
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-star-dust/60 mb-4">
        Council Presence
      </h3>

      <div className="space-y-3">
        {entities.map((entity) => (
          <motion.div
            key={entity.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 rounded-lg transition-all duration-200 cursor-pointer",
              expandedEntity === entity.name
                ? "bg-quantum-purple/20 border border-quantum-purple/50"
                : "bg-white/5 hover:bg-white/10"
            )}
            onClick={() => setExpandedEntity(expandedEntity === entity.name ? null : entity.name)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback 
                  className="text-xl"
                  style={{ backgroundColor: `${COUNCIL_COLORS[entity.name as keyof typeof COUNCIL_COLORS]}20` }}
                >
                  {entityIcons[entity.name] || '🧠'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-star-dust capitalize">
                    {entity.name.replace('_', ' ')}
                  </span>
                  <Badge 
                    variant="outline" 
                    size="sm"
                    className={cn("text-[10px]", stateColors[entity.state])}
                  >
                    {entity.state}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      style={{ width: `${entity.energy}%` }}
                    />
                  </div>
                  <span className="text-xs text-star-dust/40">{entity.energy}%</span>
                </div>
              </div>
            </div>

            {/* Expanded details */}
            {expandedEntity === entity.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10"
              >
                {entity.currentTask && (
                  <div className="text-xs text-star-dust/60">
                    <span className="text-neurospark">Current task:</span> {entity.currentTask}
                  </div>
                )}
                <div className="text-xs text-star-dust/40 mt-1">
                  Last active: {new Date(entity.lastActive).toLocaleTimeString()}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}