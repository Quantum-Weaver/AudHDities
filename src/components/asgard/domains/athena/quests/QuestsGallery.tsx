// src/components/asgard/domains/athena/quests/QuestsGallery.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowLeft, Compass, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface Quest {
  quests_id: string;
  title: string;
  description: string;
  house: string;
  is_active: boolean;
  sovereignty_reward: number | null;
  required_sovereignty_score: number | null;
  prerequisite_quest_id: string | null;
  submission_type: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const HOUSE_LABELS: Record<string, string> = {
  hearth_keeper: 'Hearth-Keeper',
  chancellor: 'Chancellor',
  seer: 'Seer',
  aethelred: 'Aethelred',
  curator: 'Curator',
  archivist: 'Archivist',
  skald: 'Skald',
  codex: 'Codex',
  executioner: 'Executioner',
};

const HOUSE_BADGE_COLORS: Record<string, string> = {
  hearth_keeper: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  chancellor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  seer: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  aethelred: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  curator: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  archivist: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  skald: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  codex: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  executioner: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function QuestsGallery() {
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  // Fetch quests
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch('/api/generated/athena-gamification/quests?is_active=true&order=title.asc');
        const result = await response.json();
        if (result.success) {
          setQuests(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch quests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  });

  const houses = useMemo(() => {
    const set = new Set<string>();
    quests.forEach((q) => set.add(q.house));
    return Array.from(set).sort();
  }, [quests]);

  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHouse = !selectedHouse || q.house === selectedHouse;
      return matchesSearch && matchesHouse;
    });
  }, [quests, searchTerm, selectedHouse]);

  const formatReward = (points: number | null) => {
    if (!points) return null;
    return `${points} sovereignty`;
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} variant="card" className="h-48" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/library"
            className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to the Library
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Path</h1>
          <p className="text-sm text-star-dust/40 mt-1">Quests that shape your sovereignty</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input
              type="text"
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>

          {/* House Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedHouse(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                !selectedHouse
                  ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                  : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
              )}
            >
              All Houses
            </button>
            {houses.map((house) => (
              <button
                key={house}
                onClick={() => setSelectedHouse(selectedHouse === house ? null : house)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  HOUSE_BADGE_COLORS[house] || 'bg-white/5 text-star-dust/50 border-white/10',
                  selectedHouse === house ? 'ring-1 ring-current' : ''
                )}
              >
                {HOUSE_LABELS[house] || house}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Indicator */}
        {selectedHouse && (
          <div className="flex items-center gap-2 mb-6 text-sm text-star-dust/40">
            <span>Filtered by: {HOUSE_LABELS[selectedHouse] || selectedHouse}</span>
            <button
              onClick={() => setSelectedHouse(null)}
              className="text-star-dust/60 hover:text-star-dust"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredQuests.length === 0 && (
          <div className="text-center py-20">
            <Compass className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">
              {searchTerm ? 'No quests match your search' : 'The path unfolds soon'}
            </p>
            <p className="text-star-dust/30 text-sm">
              {searchTerm ? 'Try a different search term' : 'New quests are being woven'}
            </p>
          </div>
        )}

        {/* Quest Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => {
            const cardData: CardData = {
              id: quest.quests_id,
              type: 'quest',
              title: quest.title,
              description: quest.description,
            };

            return (
              <Link key={quest.quests_id} href={`/library/quests/${quest.quests_id}`}>
                <Card
                  data={cardData}
                  variant="interactive"
                  radius="lg"
                  shadow="sm"
                  className="p-5 h-full"
                >
                  {/* House Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      size="sm"
                      className={cn('text-[10px]', HOUSE_BADGE_COLORS[quest.house] || '')}
                    >
                      {HOUSE_LABELS[quest.house] || quest.house}
                    </Badge>
                    {quest.sovereignty_reward && (
                      <span className="text-xs text-neurospark font-medium">
                        +{quest.sovereignty_reward}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-star-dust mb-2">
                    {quest.title}
                  </h3>
                  <p className="text-sm text-star-dust/50 line-clamp-3 mb-4">
                    {quest.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="text-[10px]"
                    >
                      {quest.submission_type?.replace(/_/g, ' ')}
                    </Badge>
                    {quest.required_sovereignty_score && (
                      <span className="text-[10px] text-star-dust/30">
                        Req: {quest.required_sovereignty_score} sovereignty
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}