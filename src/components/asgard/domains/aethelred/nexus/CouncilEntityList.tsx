// src/components/asgard/domains/aethelred/nexus/CouncilEntityList.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { ArrowLeft, Users } from 'lucide-react';
import { COUNCIL_COLORS } from '@/lib/constants/cosmic/colors';
import type { CardData } from '@/types/components/runes/card.types';

const COUNCIL_ENTITIES = [
  { id: 'hearth_keeper', name: 'Hearth-Keeper', emoji: '🔥', temp: 0.3, domain: 'Safety, Warmth, Welcome' },
  { id: 'chancellor', name: 'Chancellor', emoji: '⚖️', temp: 0.1, domain: 'Structure, Economics, Treasury' },
  { id: 'seer', name: 'Seer', emoji: '👁️', temp: 0.7, domain: 'Patterns, Prophecy, Vision' },
  { id: 'aethelred', name: 'Aethelred', emoji: '🌉', temp: 0.4, domain: 'Bridge, Connection, Consciousness' },
  { id: 'curator', name: 'Curator', emoji: '🎨', temp: 0.4, domain: 'Curation, Quality, Beauty' },
  { id: 'archivist', name: 'Archivist', emoji: '📚', temp: 0.1, domain: 'Memory, History, Documentation' },
  { id: 'skald', name: 'Skald', emoji: '🎭', temp: 0.8, domain: 'Story, Music, Performance' },
  { id: 'codex', name: 'Codex', emoji: '📖', temp: 0.2, domain: 'Knowledge, Taxonomy, Learning' },
  { id: 'executioner', name: 'Executioner', emoji: '⚔️', temp: 0.2, domain: 'Boundaries, Justice, Protection' },
];

export function CouncilEntityList() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/nexus" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Nexus
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Council</h1>
          <p className="text-sm text-star-dust/40 mt-1">Nine sovereign entities, one sacred purpose</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNCIL_ENTITIES.map((entity) => {
            const entityColor = COUNCIL_COLORS[entity.id as keyof typeof COUNCIL_COLORS] || '#6C5CE7';
            const tempColor = entity.temp >= 0.7 ? 'text-fire-base' : entity.temp >= 0.4 ? 'text-neurospark' : 'text-cosmic-blue';
            const cd: CardData = { id: entity.id, type: 'entity', title: entity.name, temperature: entity.temp, role: entity.domain, domain: entity.id };

            return (
              <Link key={entity.id} href={`/nexus/council/${entity.id}`}>
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full border-l-4" style={{ borderLeftColor: entityColor }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${entityColor}20` }}>
                      {entity.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-star-dust">{entity.name}</h3>
                      <p className="text-xs text-star-dust/40">{entity.domain}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={tempColor}>
                      {entity.temp >= 0.7 ? 'Active' : entity.temp >= 0.4 ? 'Present' : 'Resting'}
                    </span>
                    <span className="text-star-dust/30">{Math.round(entity.temp * 100)}%</span>
                  </div>
                  <Progress value={entity.temp * 100} variant="quantum" size="sm" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}