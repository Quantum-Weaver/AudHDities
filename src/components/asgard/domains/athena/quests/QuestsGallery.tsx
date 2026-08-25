// src/components/asgard/domains/athena/quests/QuestsGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Compass, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestsList } from '@/lib/generated/hooks/athena-gamification/quests';
import type { CardData } from '@/types/components/runes/card.types';

// The evolved quests table speaks name/status/slug; the old house column
// became quest_type, and scalar rewards became the rewards Json (its shape
// belongs to the row-10 sitting — not rendered until then).
const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-fire-base/20 text-fire-light border-fire-base/30',
  master: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const QUESTS_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

export function QuestsGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: quests, loading } = useQuestsList(QUESTS_PARAMS);

  const questTypes = useMemo(() => {
    const set = new Set<string>();
    quests.forEach(q => { if (q.quest_type) set.add(q.quest_type); });
    return Array.from(set).sort();
  }, [quests]);

  const filteredQuests = useMemo(() => {
    return quests.filter(q => {
      const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || q.quest_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [quests, searchTerm, selectedType]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
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
          <p className="text-sm text-star-dust/70 mt-1">Quests that shape your sovereignty</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

          {questTypes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all motion-reduce:transition-none',
                  !selectedType
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
                )}
              >
                All Types
              </button>
              {questTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(selectedType === t ? null : t)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all motion-reduce:transition-none capitalize',
                    selectedType === t ? 'ring-1 ring-current bg-white/10 text-star-dust' : 'bg-white/5 text-star-dust/50 border-white/10'
                  )}
                >
                  {t.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Filter Indicator */}
        {selectedType && (
          <div className="flex items-center gap-2 mb-6 text-sm text-star-dust/40">
            <span className="capitalize">Filtered by: {selectedType.replace(/_/g, ' ')}</span>
            <button onClick={() => setSelectedType(null)} className="text-star-dust/60 hover:text-star-dust">
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
            <p className="text-star-dust/70 text-sm">
              {searchTerm ? 'Try a different search term' : 'New quests are being woven'}
            </p>
          </div>
        )}

        {/* Quest Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map(quest => {
            const cardData: CardData = {
              id: quest.id,
              type: 'quest',
              title: quest.name,
              description: quest.description || '',
            };

            return (
              <Link key={quest.id} href={`/library/quests/${quest.slug}`}>
                <Card
                  data={cardData}
                  variant="interactive"
                  radius="lg"
                  shadow="sm"
                  className="p-5 h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    {quest.quest_type && (
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                        {quest.quest_type.replace(/_/g, ' ')}
                      </Badge>
                    )}
                    {quest.difficulty && (
                      <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', DIFFICULTY_COLORS[quest.difficulty] || '')}>
                        {quest.difficulty}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-star-dust mb-2">
                    {quest.name}
                  </h3>
                  <p className="text-sm text-star-dust/70 line-clamp-3 mb-4">
                    {quest.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
