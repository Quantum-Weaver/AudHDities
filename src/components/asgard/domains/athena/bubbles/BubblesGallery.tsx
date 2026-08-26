// src/components/asgard/domains/athena/bubbles/BubblesGallery.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE FLOATING STARS — the shelf                                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, ChevronDown, Droplets, Play, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/useUser';
import { useBubblesList } from '@/lib/generated/hooks/athena-gamification/bubbles';
import { useCollectionSetsList } from '@/lib/generated/hooks/hestia-core/collection_sets';
import type { BubblesRow } from '@/lib/generated/types/athena-gamification/bubbles';
import type { CardData } from '@/types/components/runes/card.types';
import { pageTheDoor } from './pageTheDoor';
import { paintStar, readAccent, readCollectionPalette, readStarColours } from './starPaint';

const RARITY_FILL: Record<string, { color: string; glow: string }> = {
  common: { color: '#B2BEC3', glow: '#B2BEC355' },
  rare: { color: '#22D3EE', glow: '#22D3EE55' },
  epic: { color: '#7D6CEA', glow: '#7D6CEA55' },
  legendary: { color: '#FDCB6E', glow: '#FDCB6E55' },
  mythic: { color: '#E84393', glow: '#E8439355' },
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-void-light/20 text-void-light border-void-light/30',
  rare: 'bg-neurospark/20 text-neurospark border-neurospark/30',
  epic: 'bg-quantum-light/20 text-quantum-light border-quantum-light/30',
  legendary: 'bg-hearth-gold/20 text-hearth-gold border-hearth-gold/30',
  mythic: 'bg-entity-curator/20 text-entity-curator border-entity-curator/30',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const BUBBLES_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};
const SETS_PARAMS = { limit: 100 };

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

// 44px, the realm's touch floor — the chips stood at 30.
const CHIP =
  'inline-flex min-h-[44px] items-center rounded-full border px-4 text-xs font-medium ' +
  FOCUS_RING;

type Sieve = 'all' | 'collected' | 'drifting';

const SIEVE_WORDS: Array<{ key: Sieve; word: string }> = [
  { key: 'all', word: 'all stars' },
  { key: 'collected', word: 'collected' },
  { key: 'drifting', word: 'still drifting' },
];

export function BubblesGallery() {
  const { user } = useUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [sieve, setSieve] = useState<Sieve>('all');
  const [foldOpen, setFoldOpen] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);

  const { data: firstPage, total: bubbleTotal, loading } = useBubblesList(BUBBLES_PARAMS);
  const { data: sets } = useCollectionSetsList(SETS_PARAMS);

  const [restOfShelf, setRestOfShelf] = useState<BubblesRow[]>([]);
  useEffect(() => {
    let alive = true;
    if (!bubbleTotal || firstPage.length === 0 || firstPage.length >= bubbleTotal) {
      setRestOfShelf([]);
      return;
    }
    pageTheDoor<BubblesRow>(
      '/api/generated/athena-gamification/bubbles',
      'status=published&sort=display_order&order=asc',
      2,
    ).then((res) => { if (alive) setRestOfShelf(res.rows); });
    return () => { alive = false; };
  }, [bubbleTotal, firstPage.length]);

  const bubbles = useMemo(
    () => (restOfShelf.length ? [...firstPage, ...restOfShelf] : firstPage),
    [firstPage, restOfShelf],
  );

  const [pops, setPops] = useState<Map<string, number>>(new Map());
  const [popsUnread, setPopsUnread] = useState(false);
  useEffect(() => {
    if (!user) { setPops(new Map()); setPopsUnread(false); return; }
    let alive = true;
    pageTheDoor<{ bubble_id: string }>(
      '/api/generated/hestia-core/vessel_bubbles',
      `user_id=${encodeURIComponent(user.id)}`,
    ).then((res) => {
      if (!alive) return;
      if (!res.ok) { setPopsUnread(true); setPops(new Map()); return; }
      const counted = new Map<string, number>();
      res.rows.forEach((r) => {
        if (r?.bubble_id) counted.set(r.bubble_id, (counted.get(r.bubble_id) ?? 0) + 1);
      });
      setPopsUnread(false);
      setPops(counted);
    });
    return () => { alive = false; };
  }, [user]);

  const setById = useMemo(() => new Map(sets.map(s => [s.id, s])), [sets]);
  const setNames = useMemo(
    () => new Map(sets.map(s => [s.id, s.name || 'Collection'])),
    [sets]
  );

  const rarities = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach(b => { if (b.rarity) set.add(b.rarity); });
    return Array.from(set);
  }, [bubbles]);

  const collections = useMemo(() => {
    const set = new Set<string>();
    bubbles.forEach(b => { if (b.collection_id) set.add(setNames.get(b.collection_id) || 'Collection'); });
    return Array.from(set).sort();
  }, [bubbles, setNames]);

  const chosenSet = useMemo(
    () => (selectedCollection ? sets.find(s => (s.name || 'Collection') === selectedCollection) ?? null : null),
    [sets, selectedCollection],
  );

  const filteredBubbles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return bubbles.filter(b => {
      const collectionName = b.collection_id ? (setNames.get(b.collection_id) || 'Collection') : null;
      const matchesSearch = !term ||
        b.name.toLowerCase().includes(term) ||
        (collectionName || '').toLowerCase().includes(term);
      const matchesRarity = !selectedRarity || b.rarity === selectedRarity;
      const matchesCollection = !selectedCollection || collectionName === selectedCollection;
      const count = pops.get(b.id) ?? 0;
      const matchesSieve =
        sieve === 'all' ||
        (sieve === 'collected' && count > 0) ||
        (sieve === 'drifting' && count === 0);
      return matchesSearch && matchesRarity && matchesCollection && matchesSieve;
    });
  }, [bubbles, searchTerm, selectedRarity, selectedCollection, setNames, sieve, pops]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (<Skeleton key={i} variant="card" className="h-44" />))}
          </div>
        </div>
      </main>
    );
  }

  const accent = readAccent(chosenSet);
  const bannerPalette = readCollectionPalette(chosenSet);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/library" className={cn('flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none text-sm mb-2 rounded', FOCUS_RING)}>
            <ArrowLeft className="h-4 w-4" />Return to the Library
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-star-dust">The Floating Stars</h1>
              <p className="text-sm text-star-dust/70 mt-1">Collect bubbles and earn sovereignty</p>
            </div>
            <Link
              href="/library/bubbles/play"
              className="inline-flex flex-col gap-0.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Play className="h-4 w-4" />Pop the Stars
              </span>
              <span className="text-xs text-star-dust/70">Tap bubbles to collect them</span>
            </Link>
          </div>
        </div>

        <div className="mb-4" role="group" aria-labelledby="stars-sieve-heading">
          <h2 id="stars-sieve-heading" className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/70">Showing</h2>
          <div className="flex flex-wrap gap-2">
            {SIEVE_WORDS.map(({ key, word }) => (
              <button
                key={key}
                type="button"
                aria-pressed={sieve === key}
                onClick={() => setSieve(key)}
                className={cn(CHIP, sieve === key ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/70 border-white/10')}
              >{word}</button>
            ))}
          </div>
          {popsUnread && (
            <p className="mt-2 text-xs text-star-dust/70">
              Which stars you have popped could not be read just now — the
              sieve is showing the whole shelf.
            </p>
          )}
        </div>

        <div className="mb-8">
          <button
            type="button"
            aria-expanded={foldOpen}
            aria-controls="stars-fold"
            onClick={() => setFoldOpen(o => !o)}
            className={cn('inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-xs font-medium text-star-dust/70', FOCUS_RING)}
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform motion-reduce:transition-none', foldOpen && 'rotate-180')} aria-hidden="true" />
            filter &amp; sort
          </button>

          {foldOpen && (
            <div id="stars-fold" className="flex flex-col gap-4 mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/70" size={16} aria-hidden="true" />
                <label htmlFor="stars-search" className="sr-only">Search by name or collection</label>
                <input
                  id="stars-search"
                  type="text"
                  placeholder="Search by name or collection"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/70 focus:border-neurospark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
                />
              </div>

              <div role="group" aria-labelledby="stars-rarity-heading">
                <h3 id="stars-rarity-heading" className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/70">By rarity</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={!selectedRarity}
                    onClick={() => setSelectedRarity(null)}
                    className={cn(CHIP, !selectedRarity ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/70 border-white/10')}
                  >All Rarities</button>
                  {rarities.map(r => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={selectedRarity === r}
                      onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                      className={cn(CHIP, 'capitalize', RARITY_COLORS[r] || 'bg-white/5 text-star-dust/70 border-white/10', selectedRarity === r ? 'ring-1 ring-current' : '')}
                    >{r}</button>
                  ))}
                </div>
              </div>

              {collections.length > 0 && (
                <div role="group" aria-labelledby="stars-collection-heading">
                  <h3 id="stars-collection-heading" className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/70">By collection</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={!selectedCollection}
                      onClick={() => setSelectedCollection(null)}
                      className={cn(CHIP, !selectedCollection ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/70 border-white/10')}
                    >All Collections</button>
                    {collections.map(c => (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={selectedCollection === c}
                        onClick={() => setSelectedCollection(selectedCollection === c ? null : c)}
                        className={cn(CHIP, selectedCollection === c ? 'ring-1 ring-current bg-white/10 text-star-dust' : 'bg-white/5 text-star-dust/70 border-white/10')}
                      >{c}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {chosenSet && (
          <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 flex-shrink-0 rounded-full"
                style={{ background: accent ?? '#E0E0E0' }}
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold text-star-dust">{chosenSet.name}</h2>
            </div>
            <div
              className="mt-3 h-px w-full"
              style={{
                background: bannerPalette
                  ? `linear-gradient(to right, ${bannerPalette.join(', ')})`
                  : (accent ?? 'rgba(224,224,224,0.25)'),
              }}
              aria-hidden="true"
            />
            {chosenSet.description && (
              <p className="mt-3 text-sm text-star-dust/70">{chosenSet.description}</p>
            )}
          </div>
        )}

        {filteredBubbles.length === 0 && (
          <div className="text-center py-20">
            <Droplets className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
            <p className="text-star-dust/70 text-lg mb-2">
              {searchTerm
                ? 'No bubbles match'
                : sieve === 'collected'
                  ? 'None collected here yet. They are still out there, drifting.'
                  : sieve === 'drifting'
                    ? 'Nothing waits here — every star under this sieve has been popped.'
                    : 'The floating stars will appear when the Sanctuary is ready'}
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBubbles.map(bubble => {
            const rarity = bubble.rarity || 'common';
            const fill = RARITY_FILL[rarity] || RARITY_FILL.common;
            const colours = readStarColours(bubble);
            const collectionName = bubble.collection_id ? setNames.get(bubble.collection_id) : null;
            const collectionRow = bubble.collection_id ? setById.get(bubble.collection_id) : null;
            const count = pops.get(bubble.id) ?? 0;
            const collected = count > 0;
            const isFlipped = flipped === bubble.id;
            const cardData: CardData = { id: bubble.id, type: 'value', title: bubble.name, value: rarity };
            const orb = paintStar(fill, colours, 64);
            const bigOrb = paintStar(fill, colours, 90);

            if (isFlipped) {
              return (
                <button
                  key={bubble.id}
                  type="button"
                  aria-pressed={true}
                  aria-label={`${bubble.name} — turned. Press to turn the card back.`}
                  onClick={() => setFlipped(null)}
                  className={cn('block h-full w-full rounded-lg text-left transition-opacity motion-reduce:transition-none', FOCUS_RING)}
                >
                  <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5 h-full text-center"
                    style={{ boxShadow: `0 0 20px ${fill.glow}` }}
                  >
                    <div
                      className="w-[90px] h-[90px] rounded-full mx-auto mb-3"
                      style={{ background: bigOrb.background, boxShadow: bigOrb.boxShadow }}
                      aria-hidden="true"
                    />
                    <h3 className="font-semibold text-star-dust mb-1">{bubble.name}</h3>
                    <p className="text-xs text-star-dust/82 mb-1">popped ×{count}</p>
                    {collectionName && (
                      <p className="text-[10px] text-star-dust/70 mb-3">{collectionName}</p>
                    )}
                    <span className="text-[10px] text-star-dust/70">··· turn back ···</span>
                  </Card>
                </button>
              );
            }

            return (
              <div key={bubble.id} className="flex h-full flex-col gap-2">
                <Link
                  href={`/library/bubbles/${bubble.slug}`}
                  aria-label={
                    collected
                      ? `${bubble.name}, ${rarity} — collected. Opens its page.`
                      : `${bubble.name}, ${rarity} — still drifting. Opens its page.`
                  }
                  className={cn('block flex-1 rounded-lg', FOCUS_RING)}
                >
                  <Card data={cardData} variant="glass" radius="lg" shadow="sm"
                    className={cn(
                      'p-5 h-full text-center',
                      !collected && 'border border-dashed border-white/15 opacity-70',
                    )}
                    style={{ boxShadow: collected ? `0 0 20px ${fill.glow}` : 'none' }}
                  >
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <div
                        className="w-16 h-16 rounded-full"
                        style={{
                          background: orb.background,
                          boxShadow: collected ? orb.boxShadow : 'none',
                          opacity: collected ? 1 : 0.55,
                        }}
                        aria-hidden="true"
                      />
                      {count > 1 && (
                        <span className="absolute -right-1 -top-1 rounded-full border border-white/15 bg-deep-space/80 px-1.5 text-[10px] text-star-dust/82">
                          ×{count}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-star-dust mb-1">{bubble.name}</h3>
                    {collected
                      ? bubble.description && <p className="text-xs text-star-dust/70 line-clamp-2 mb-3">{bubble.description}</p>
                      : <p className="text-xs text-star-dust/70 mb-3">··· pop to read ···</p>}
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {bubble.rarity && <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', RARITY_COLORS[bubble.rarity] || '')}>{bubble.rarity}</Badge>}
                    </div>
                    {collectionName && (
                      <p className="text-[10px] text-star-dust/70 mt-2">
                        {collectionRow && readAccent(collectionRow) && (
                          <span
                            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
                            style={{ background: readAccent(collectionRow) as string }}
                            aria-hidden="true"
                          />
                        )}
                        {collectionName}
                      </p>
                    )}
                  </Card>
                </Link>
                {collected && (
                  <button
                    type="button"
                    aria-pressed={false}
                    aria-label={`${bubble.name} — collected. Press to turn the card.`}
                    onClick={() => setFlipped(bubble.id)}
                    className={cn('rounded-lg border border-white/10 bg-white/5 py-1.5 text-[10px] text-star-dust/70 transition-colors motion-reduce:transition-none hover:bg-white/10', FOCUS_RING)}
                  >··· turn ···</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
