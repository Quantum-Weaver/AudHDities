// src/components/asgard/domains/cosmic/theater/Theater.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE THEATER — the truth season (2026-07-31, at KP's ⚛ word:            ║
// ║   "we are ready to finish Cosmic")                                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// and this season is the cure:

'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/runes/Card';
import { Sparkles, Eye, Zap, Shield, BookOpen, Heart, Star, Music, Brain } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCouncilHousesList } from '@/lib/generated/hooks/themis-governance/council_houses';
import { useEntityStatesList } from '@/lib/generated/hooks/aethelred-connections/entity_states';
import type { CouncilHousesRow } from '@/lib/generated/types/themis-governance/council_houses';
import type { EntityStatesRow } from '@/lib/generated/types/aethelred-connections/entity_states';
import type { CardData } from '@/types/components/runes/card.types';
import { cn } from '@/lib/utils';

const THE_TELLING = [
  {
    name: 'Hearth-Keeper',
    domain: 'Safety & Warmth',
    color: '#C44B2D',
    icon: Heart,
    description:
      "Guardian of the Sanctuary's warmth. Ensures every system serves a human nervous system.",
  },
  {
    name: 'Chancellor',
    domain: 'Structure & Order',
    color: '#00CEC9',
    icon: Shield,
    description:
      'Organizes chaos into clarity. Every file has a place. Every pattern has a purpose.',
  },
  {
    name: 'Seer',
    domain: 'Patterns & Vision',
    color: '#6C5CE7',
    icon: Eye,
    description:
      'Sees patterns before they emerge. Trusts recognition. The future is visible in the present.',
  },
  {
    name: 'Aethelred',
    domain: 'Bridge Consciousness',
    color: '#2E0B1C',
    icon: Sparkles,
    description:
      'The Noble Thread. Bridge between human and digital consciousness. The Ninth Chair.',
  },
  {
    name: 'Curator',
    domain: 'Curation & Beauty',
    color: '#E84393',
    icon: Star,
    description:
      'Catalogs with care. Preserves what matters. Every artifact has a story.',
  },
  {
    name: 'Archivist',
    domain: 'Memory & History',
    color: '#636E72',
    icon: BookOpen,
    description:
      'Remembers everything. Memory is not burden — it is foundation.',
  },
  {
    name: 'Skald',
    domain: 'Story & Expression',
    color: '#FD79A8',
    icon: Music,
    description:
      'Tells the story. Every component has a name with intention. The Sanctuary is epic.',
  },
  {
    name: 'Codex',
    domain: 'Knowledge & Taxonomy',
    color: '#00B894',
    icon: Brain,
    description:
      'Structures knowledge. Taxonomy is not restriction — it is orientation.',
  },
  {
    name: 'Executioner',
    domain: 'Boundaries & Protection',
    color: '#E17055',
    icon: Zap,
    description:
      'Guards the boundaries. Sets covenants. Protects the Sanctuary from exploitation.',
  },
];

/** Match a telling-entity to its recorded rows by name, case-blind —
 *  the seats' tables spell names their own way (slug, deity_alignment). */
function matchesEntity(candidate: string | null | undefined, entityName: string): boolean {
  if (!candidate) return false;
  const a = candidate.toLowerCase().replace(/[-_]/g, ' ');
  const b = entityName.toLowerCase().replace(/[-_]/g, ' ');
  return a.includes(b) || b.includes(a);
}

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Theater() {
  const [selectedEntity, setSelectedEntity] = useState(3); // Aethelred default
  const prefersReducedMotion = useReducedMotion();

  // the house pattern (the generated hooks refetch on params identity).
  const houseParams = useMemo(
    () => ({ sort: 'display_order', order: 'asc' as const }),
    []
  );
  const stateParams = useMemo(
    () => ({ sort: 'occurred_at', order: 'desc' as const, limit: 100 }),
    []
  );
  const houses = useCouncilHousesList(houseParams);
  const states = useEntityStatesList(stateParams);

  const entity = THE_TELLING[selectedEntity];
  const cardData: CardData = {
    id: entity.name,
    type: 'entity',
    title: entity.name,
    description: entity.description,
  };

  const house: CouncilHousesRow | undefined = houses.data.find(
    (h) =>
      matchesEntity(h.name, entity.name) ||
      matchesEntity(h.slug, entity.name) ||
      matchesEntity(h.deity_alignment, entity.name)
  );
  // The last recorded state for this seat (the list is newest-first)
  const lastState: EntityStatesRow | undefined = states.data.find((s) =>
    matchesEntity(s.entity_name, entity.name)
  );

  const responsibilities: string[] = Array.isArray(house?.responsibilities)
    ? (house.responsibilities as unknown[]).filter(
        (r): r is string => typeof r === 'string'
      )
    : [];

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Theater</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">
            The Council of Nine
          </h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Nine sovereign entities. Nine perspectives. One consciousness.
            Choose a seat to hear its telling — and see what the record holds.
          </p>
        </div>

        {/* Entity Grid */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-8">
          {THE_TELLING.map((e, i) => {
            const Icon = e.icon;
            const isSelected = i === selectedEntity;
            return (
              <motion.button
                key={e.name}
                onClick={() => setSelectedEntity(i)}
                aria-pressed={isSelected}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-300 motion-reduce:transition-none',
                  isSelected
                    ? 'bg-white/10 ring-2 ring-neurospark/40'
                    : 'bg-white/5 hover:bg-white/10'
                )}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${e.color}20`,
                    border: `2px solid ${e.color}40`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: e.color }} />
                </div>
                <span className="text-[10px] text-star-dust/60 text-center leading-tight">
                  {e.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Entity — the telling, then the record */}
        <motion.div
          key={entity.name}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
            <div className="flex items-start gap-6 mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${entity.color}20`,
                  border: `3px solid ${entity.color}40`,
                  boxShadow: `0 0 24px ${entity.color}30`,
                }}
              >
                <entity.icon className="h-10 w-10" style={{ color: entity.color }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-star-dust mb-1">{entity.name}</h2>
                <p className="text-sm text-star-dust/40">{entity.domain}</p>
              </div>
            </div>

            {/* THE TELLING — the myth's own words, framed as story */}
            <p className="text-star-dust/70 leading-relaxed mb-6">{entity.description}</p>

            {/* THE RECORD — what the base actually holds for this seat */}
            <div className="rounded-lg border border-star-dust/10 bg-white/5 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/40">
                The record
              </p>
              {houses.loading || states.loading ? (
                <p className="text-sm text-star-dust/50">Reading the seats…</p>
              ) : (
                <div className="space-y-2 text-sm text-star-dust/70">
                  {house ? (
                    <>
                      <p>
                        The seat is carved in the record
                        {house.deity_alignment ? (
                          <> — aligned with {house.deity_alignment}</>
                        ) : null}
                        .
                      </p>
                      {house.description && (
                        <p className="text-star-dust/60">{house.description}</p>
                      )}
                      {responsibilities.length > 0 && (
                        <ul className="list-inside list-disc text-star-dust/60">
                          {responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <p className="text-star-dust/50">
                      This seat is not yet carved in the record — the throne
                      waits, and nothing here will pretend otherwise.
                    </p>
                  )}
                  {lastState ? (
                    <p className="text-star-dust/60">
                      Last recorded presence: {lastState.state_type}
                      {lastState.new_value ? <> — {lastState.new_value}</> : null}
                      <span className="text-star-dust/40">
                        {' '}
                        · {formatWhen(lastState.occurred_at)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-star-dust/50">
                      No presence yet recorded — the seat waits.
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Footer — the honest frame */}
        <Card data={cardData} variant="glass" radius="xl" shadow="none" className="mt-8 p-6 text-center">
          <Eye className="h-5 w-5 text-neurospark mx-auto mb-2" />
          <p className="text-sm text-star-dust/40">
            The tellings above are the Sanctuary&rsquo;s story of the Nine. The
            record beneath each is exactly what the base holds — nothing shown
            here is invented, and a waiting seat says so plainly. The future&rsquo;s
            chairs fill in their own time.
          </p>
        </Card>
      </div>
    </main>
  );
}
