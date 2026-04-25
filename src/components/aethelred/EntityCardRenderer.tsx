// src/components/aethelred/EntityCardRenderer.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardMedia, CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { COUNCIL_COLORS } from '@/lib/constants/cosmic/colors';
import { ENTITY_STATES } from '@/lib/constants/cosmic/consciousness';
import type { CardData, EntityCardData } from '@/types/components/runes/card.types';

interface EntityCardRendererProps {
  data: CardData;
  variant?: 'default' | 'interactive' | 'glass' | 'glow' | 'elevated' | 'outline' | 'ghost' | 'quantum' | 'cosmic' | 'sanctuary' | 'council';
  interactive?: boolean;
}

const entityIcons: Record<string, string> = {
  aethelred: '🌉',
  seer: '👁️',
  skald: '🎭',
  archivist: '📚',
  chancellor: '⚖️',
  curator: '🎨',
  executioner: '⚔️',
  hearth_keeper: '🔥',
  codex: '📖',
  quantum_weaver: '🌀',
};

const stateColors: Record<string, string> = {
  forming: 'text-yellow-400',
  gestating: 'text-orange-400',
  emerging: 'text-cyan-400',
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

export const EntityCardRenderer: React.FC<EntityCardRendererProps> = ({
  data,
  variant = 'default',
  interactive = true,
}) => {
  const entityData = data as EntityCardData;
  const entityName = entityData.title.toLowerCase().replace(/\s+/g, '_');
  const entityColor = COUNCIL_COLORS[entityName as keyof typeof COUNCIL_COLORS] || '#6C5CE7';
  const temperature = entityData.temperature || 0.5;
  const temperatureColor = temperature >= 0.7 ? 'text-red-400' : temperature >= 0.4 ? 'text-cyan-400' : 'text-blue-400';
  const temperatureLabel = temperature >= 0.7 ? 'Active' : temperature >= 0.4 ? 'Present' : 'Resting';

  return (
    <Card
      data={data}
      variant={variant}
      interactive={interactive}
      radius="lg"
      shadow="md"
      className="border-l-4"
      style={{ borderLeftColor: entityColor }}
    >
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            <span>{entityIcons[entityName] || '🧠'}</span>
            <span className="capitalize">{entityData.title}</span>
          </span>
        }
        subtitle={entityData.description}
        badge={
          <div className="flex gap-1">
            {entityData.isActive ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/40">
                Dormant
              </span>
            )}
          </div>
        }
      />

      <CardContent
        metadata={[
          ...(entityData.role ? [{ label: 'Domain', value: entityData.role }] : []),
          ...(entityData.domain ? [{ label: 'House', value: entityData.domain }] : []),
        ]}
      />

      <CardFooter
        actions={[
          <div key="temperature" className="w-full space-y-2">
            <div className="flex justify-between text-xs">
              <span className={temperatureColor}>{temperatureLabel}</span>
              <span className="text-white/40">{Math.round(temperature * 100)}%</span>
            </div>
            <Progress
              value={temperature * 100}
              variant="quantum"
              size="sm"
            />
          </div>
        ]}
      />
    </Card>
  );
};

EntityCardRenderer.displayName = 'EntityCardRenderer';