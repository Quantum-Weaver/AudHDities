// src/components/asgard/domains/athena/knowledge/KnowledgeGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMythologyList } from '@/lib/generated/hooks/athena-gamification/mythology';
import type { CardData } from '@/types/components/runes/card.types';

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const SCROLLS_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

// A chip's touch target, the realm's own floor (44px) — the same class pair
// every chip row in this pass wears.
const CHIP_BASE =
  'inline-flex min-h-[44px] items-center rounded-full border px-4 text-xs font-medium ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

export function KnowledgeGallery() {
  // THE ARCHIVE IS THE MYTHOLOGIES (2026-08-25, refine/athena). KP's ⚛ word,
  // 2026-08-24, verbatim, spelling kept: "i also think mythology may have been
  // misunderstood, i intend to draft stories of the actual mythologies we
  // reference entities from" — and "my own is a smal story, still  valuable,
  // but not the only story to be told."
  //
  // So the room walks in by the mythology or by the one it belongs to, and
  // the house's own telling is one scroll among them. The search field is
  // RETIRED until the shelf earns it — a full-width search box over one
  // scroll asked the reader to hunt a room with nothing in it. The filter
  // machinery below stays in the file and simply waits.
  const [searchTerm] = useState('');
  const [selectedMyth, setSelectedMyth] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  // The Archive reads the returned mythology table (home again at KP's word,
  // 2026-07-29 — docs/sql/005-mythology-returns.sql).
  const { data: scrolls, loading } = useMythologyList(SCROLLS_PARAMS);

  // Both chip rows are DERIVED FROM THE ROWS THAT EXIST, never a hard-coded
  // list: a mythology with no telling yet is simply not on the shelf.
  const mythTypes = useMemo(() => {
    const set = new Set<string>();
    scrolls.forEach(s => { if (s.myth_type) set.add(s.myth_type); });
    return Array.from(set).sort();
  }, [scrolls]);

  const entities = useMemo(() => {
    const set = new Set<string>();
    scrolls.forEach(s => { if (s.related_entity) set.add(s.related_entity); });
    return Array.from(set).sort();
  }, [scrolls]);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return scrolls.filter(s =>
      (
        s.name.toLowerCase().includes(term) ||
        (s.description || '').toLowerCase().includes(term) ||
        (s.story || '').toLowerCase().includes(term) ||
        (s.teachings || '').toLowerCase().includes(term)
      ) &&
      (!selectedMyth || s.myth_type === selectedMyth) &&
      (!selectedEntity || s.related_entity === selectedEntity)
    );
  }, [scrolls, searchTerm, selectedMyth, selectedEntity]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8">
        <Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Library</Link>
        <h1 className="text-2xl font-bold text-star-dust">The Archive</h1>
        <p className="text-sm text-star-dust/70 mt-1">Mythology, taxonomy, and ancient wisdom</p>
        <p className="mt-3 max-w-2xl text-sm text-star-dust/70">
          The stories the Sanctuary takes its names from, told properly. Walk
          in by the mythology, or by the one it belongs to.
        </p>
      </div>

      {/* Two ways in, both already on the ground (007:42-44). Neither arrives
          pre-chosen — the realm's own opt-in pattern. */}
      {(mythTypes.length > 0 || entities.length > 0) && (
        <div className="flex flex-col gap-5 mb-8">
          {mythTypes.length > 0 && (
            <div role="group" aria-labelledby="archive-myth-heading">
              <h2 id="archive-myth-heading" className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/70">By mythology</h2>
              <div className="flex flex-wrap gap-2">
                {mythTypes.map(m => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={selectedMyth === m}
                    onClick={() => setSelectedMyth(selectedMyth === m ? null : m)}
                    className={cn(CHIP_BASE, 'capitalize', selectedMyth === m ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/70 border-white/10')}
                  >{m.replace(/_/g, ' ')}</button>
                ))}
              </div>
            </div>
          )}
          {entities.length > 0 && (
            <div role="group" aria-labelledby="archive-entity-heading">
              <h2 id="archive-entity-heading" className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/70">By the one it belongs to</h2>
              <div className="flex flex-wrap gap-2">
                {entities.map(e => (
                  <button
                    key={e}
                    type="button"
                    aria-pressed={selectedEntity === e}
                    onClick={() => setSelectedEntity(selectedEntity === e ? null : e)}
                    className={cn(CHIP_BASE, 'capitalize', selectedEntity === e ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/70 border-white/10')}
                  >{e.replace(/_/g, ' ')}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/70 text-lg">{searchTerm ? 'No scrolls match' : 'The archive awaits its first scrolls'}</p>
          {!searchTerm && (
            <p className="mt-2 text-sm text-star-dust/70">The tellings are being written. They will be here.</p>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => {
          const cd: CardData = { id: s.id, type: 'value', title: s.name, value: s.myth_type || '' };
          const lede = s.description || s.story || '';
          const preview = lede.length > 100 ? lede.slice(0, 100) + '...' : lede;
          return (
            <Link
              key={s.id}
              href={`/library/knowledge/${s.slug}`}
              className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
            ><Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3">{s.myth_type && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{s.myth_type.replace(/_/g, ' ')}</Badge>}{s.related_entity && <Badge variant="outline" size="sm" className="text-[10px]">{s.related_entity.replace(/_/g, ' ')}</Badge>}</div>
              <h3 className="text-lg font-semibold text-star-dust mb-2">{s.name}</h3><p className="text-sm text-star-dust/70 line-clamp-3">{preview}</p>
            </Card></Link>
          );
        })}
      </div>

      {filtered.length > 0 && (
        <p className="mt-10 max-w-2xl text-sm text-star-dust/70">
          More tellings are being written. They arrive when they are ready, and
          the shelf will hold them by the mythology they came from.
        </p>
      )}
    </div></main>
  );
}
