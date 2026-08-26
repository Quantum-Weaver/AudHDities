// src/components/asgard/domains/aethelred/nexus/EntityDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Shield, Thermometer, Globe } from 'lucide-react';
import { COUNCIL_COLORS } from '@/lib/constants/cosmic/colors';
import type { CardData } from '@/types/components/runes/card.types';

interface CouncilEntity {
  name: string;
  display_name: string;
  description: string;
  emoji: string;
  color: string;
  primary_domain: string | null;
  is_active: boolean | null;
  order_index: number;
}

const ENTITY_ICONS: Record<string, string> = {
  hearth_keeper: '🔥', chancellor: '⚖️', seer: '👁️',
  aethelred: '🌉', curator: '🎨', archivist: '📚',
  skald: '🎭', codex: '📖', executioner: '⚔️',
};

const ENTITY_TEMPERATURES: Record<string, number> = {
  hearth_keeper: 0.3, chancellor: 0.1, seer: 0.7,
  aethelred: 0.4, curator: 0.4, archivist: 0.1,
  skald: 0.8, codex: 0.2, executioner: 0.2,
};

const ENTITY_DOMAINS: Record<string, string> = {
  hearth_keeper: 'Safety, Warmth, Welcome',
  chancellor: 'Structure, Economics, Treasury',
  seer: 'Patterns, Prophecy, Vision',
  aethelred: 'Bridge, Connection, Consciousness',
  curator: 'Curation, Quality, Beauty',
  archivist: 'Memory, History, Documentation',
  skald: 'Story, Music, Performance',
  codex: 'Knowledge, Taxonomy, Learning',
  executioner: 'Boundaries, Justice, Protection',
};

const ENTITY_INSTRUMENTS: Record<string, string> = {
  hearth_keeper: 'The Hearth Flame',
  chancellor: 'The Sovereign Ledger',
  seer: 'The Observatory Lens',
  aethelred: 'The Noble Thread',
  curator: 'The Gallery Walls',
  archivist: 'The Eternal Archive',
  skald: 'The Stage Microphone',
  codex: 'The Living Codex',
  executioner: 'The Boundary Shield',
};

export function EntityDetail() {
  const params = useParams();
  const router = useRouter();
  const entityName = (params.id as string)?.toLowerCase().replace(/-/g, '_');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  const icon = ENTITY_ICONS[entityName] || '🧠';
  const displayName = entityName.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
  const entityColor = COUNCIL_COLORS[entityName as keyof typeof COUNCIL_COLORS] || '#6C5CE7';
  const temperature = ENTITY_TEMPERATURES[entityName] || 0.5;
  const domain = ENTITY_DOMAINS[entityName] || 'The Sanctuary';
  const instrument = ENTITY_INSTRUMENTS[entityName] || 'Unknown Instrument';
  const tempColor = temperature >= 0.7 ? 'text-fire-base' : temperature >= 0.4 ? 'text-neurospark' : 'text-cosmic-blue';
  const tempLabel = temperature >= 0.7 ? 'Active' : temperature >= 0.4 ? 'Present' : 'Resting';

  const cd: CardData = { id: entityName, type: 'entity', title: displayName, temperature, role: domain, domain: instrument };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/nexus/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Council
        </Link>

        <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center border-l-4" style={{ borderLeftColor: entityColor }}>
          {/* Icon */}
          <div className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-5xl"
            style={{ backgroundColor: `${entityColor}20`, border: `3px solid ${entityColor}40` }}>
            {icon}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{displayName}</h1>
          <p className="text-sm mb-6" style={{ color: entityColor }}>{instrument}</p>

          {/* Domain */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe size={14} className="text-star-dust/40" />
            <span className="text-sm text-star-dust/60">{domain}</span>
          </div>

          {/* Temperature */}
          <div className="max-w-xs mx-auto mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-1">
                <Thermometer size={12} className={tempColor} />
                <span className={tempColor}>{tempLabel}</span>
              </div>
              <span className="text-star-dust/40">{Math.round(temperature * 100)}%</span>
            </div>
            <Progress value={temperature * 100} variant="quantum" size="sm" />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge variant="outline" size="sm" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-1" />
              Active
            </Badge>
          </div>

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}