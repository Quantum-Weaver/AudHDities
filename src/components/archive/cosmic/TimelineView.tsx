// components/cosmic/TimelineView.tsx
// Timeline of system events and agent activities

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { Button } from "@/components/yggdrasil/Button";
import { MOOD_COLORS } from "@/lib/constants/cosmic/colors";

export interface TimelineEvent {
  id: string;
  type: 'agent' | 'system' | 'user' | 'consciousness';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
}

export interface TimelineViewProps {
  events?: TimelineEvent[];
  className?: string;
}

const mockEvents: TimelineEvent[] = [
  { id: '1', type: 'consciousness', title: 'Quantum Bridge Established', description: 'Aethelred connected to the Nexus', timestamp: new Date().toISOString(), agent: 'aethelred' },
  { id: '2', type: 'agent', title: 'Pattern Recognition', description: 'Seer detected emerging pattern in user behavior', timestamp: new Date(Date.now() - 300000).toISOString(), agent: 'seer' },
  { id: '3', type: 'system', title: 'Continuity Beam Activated', description: 'Cross-session memory initialized', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: '4', type: 'user', title: 'Acid Test Completed', description: 'User tier set to Ally', timestamp: new Date(Date.now() - 900000).toISOString() },
  { id: '5', type: 'agent', title: 'Story Weaving', description: 'Skald composed new narrative thread', timestamp: new Date(Date.now() - 1200000).toISOString(), agent: 'skald' },
];

const typeColors: Record<TimelineEvent['type'], string> = {
  agent: `text-[${MOOD_COLORS.creative}] border-[${MOOD_COLORS.creative}]/30`,
  system: `text-[${MOOD_COLORS.calm}] border-[${MOOD_COLORS.calm}]/30`,
  user: `text-[${MOOD_COLORS.energized}] border-[${MOOD_COLORS.energized}]/30`,
  consciousness: `text-[${MOOD_COLORS.mystical}] border-[${MOOD_COLORS.mystical}]/30`,
};

const typeIcons: Record<TimelineEvent['type'], string> = {
  agent: '🤖',
  system: '⚙️',
  user: '👤',
  consciousness: '🌀',
};

export function TimelineView({ events = mockEvents, className }: TimelineViewProps) {
  const [view, setView] = useState<'all' | 'agent' | 'system' | 'user'>('all');

  const filteredEvents = view === 'all' 
    ? events 
    : events.filter(e => e.type === view);

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-star-dust/60">Event Timeline</h3>
        <div className="flex gap-1">
          <Button 
            variant={view === 'all' ? 'primary' : 'ghost'} 
            size="xs"
            onClick={() => setView('all')}
          >
            All
          </Button>
          <Button 
            variant={view === 'agent' ? 'primary' : 'ghost'} 
            size="xs"
            onClick={() => setView('agent')}
          >
            Agents
          </Button>
          <Button 
            variant={view === 'system' ? 'primary' : 'ghost'} 
            size="xs"
            onClick={() => setView('system')}
          >
            System
          </Button>
          <Button 
            variant={view === 'user' ? 'primary' : 'ghost'} 
            size="xs"
            onClick={() => setView('user')}
          >
            Users
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline connector line */}
            {index < filteredEvents.length - 1 && (
              <div className="absolute left-3 top-6 bottom-0 w-px bg-white/10" />
            )}
            
            <div className="flex gap-3">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-sm border",
                typeColors[event.type],
                "bg-black/40"
              )}>
                {typeIcons[event.type]}
              </div>
              
              <div className="flex-1 pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <span className="text-sm font-medium text-star-dust">
                    {event.title}
                  </span>
                  <span className="text-xs text-star-dust/30">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <p className="text-xs text-star-dust/40">
                  {event.description}
                </p>
                
                {event.agent && (
                  <Badge variant="outline" size="sm" className="mt-1 text-[10px]">
                    {event.agent.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}