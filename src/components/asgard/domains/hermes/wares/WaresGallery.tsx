// src/components/asgard/domains/hermes/wares/WaresGallery.tsx
// Wares edition (2026-07-31): products became wares — one base price plus a
// pricing_model, status enum instead of is_published/active, created_by
// instead of creator_id/owner_id.
// The quiet square (2026-08-01, KP's ruling via the E4 study): gallery
// cards carry no price — the work and its maker lead; the price speaks
// plainly at the stall (WareDetail), with the split beside it.
// Worth felt as human before price read as number.
// 2026-08-25: works stand beside wares here, at KP's word. Neither table
// carries a kind column and neither should — the square supplies the kind at
// merge time, because it already knows which fetch a row came from. Only the
// kinds that actually arrived are drawn: an absent kind produces no chip, no
// filter and no announcement.
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';
import { useSearchParams } from 'next/navigation';
import { RungLadder, isRung } from '@/components/asgard/domains/hermes/wares/RungLadder';

type WareRow = Tables<'wares'>;
type WorkRow = Tables<'works'>;

const WARE_TYPE_LABELS: Record<string, string> = {
  physical: 'Physical', digital: 'Digital', service: 'Service',
};
const WORK_TYPE_LABELS: Record<string, string> = {
  music: 'Music', writing: 'Writing', vision: 'Vision',
  performance: 'Performance', code: 'Code', other: 'Other',
};

/**
 * The finite-list sentence's own words. Spelled out consistently so a square
 * never says "4 wares and One work" — drawn from what arrived, never a stored
 * count.
 */
const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];

function countWord(n: number, one: string, many: string): string {
  const word = n < COUNT_WORDS.length ? COUNT_WORDS[n] : String(n);
  return `${word} ${n === 1 ? one : many}`;
}

/** One row of the square, with the kind the fetch already knew. */
type SquareItem = {
  id: string;
  kind: 'ware' | 'work';
  name: string;
  description: string | null;
  icon_emoji: string | null;
  created_at: string;
  /** ware_type for a ware, work_type for a work */
  itemType: string;
  typeLabel: string;
  /** wares only */
  isGifted: boolean;
  href: string;
};

export function WaresGallery() {
  const [items, setItems] = useState<SquareItem[]>([]);
  // A rung is a ware that repeats. Five of them are one ladder, not five stalls.
  const [rungs, setRungs] = useState<WareRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [readFailed, setReadFailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSquare = async () => {
      try {
        // Maker links arrive as ?artisan_id= or ?merchant_id=. The old words
        // ?creator_id= and ?vendor_id= are still read for one pass, so a link
        // someone saved yesterday still lands.
        const makerId =
          searchParams.get('artisan_id') ||
          searchParams.get('merchant_id') ||
          searchParams.get('creator_id') ||
          searchParams.get('vendor_id');

        const build = () => {
          const p = new URLSearchParams();
          p.set('status', 'published');
          p.set('order', 'created_at.desc');
          if (makerId) p.set('created_by', makerId);
          return p.toString();
        };

        const [waresRes, worksRes] = await Promise.all([
          fetch(`/api/generated/plutus-economics/wares?${build()}`),
          fetch(`/api/generated/hermes-social/works?${build()}`),
        ]);
        const [waresJson, worksJson] = await Promise.all([
          waresRes.json().catch(() => null),
          worksRes.json().catch(() => null),
        ]);

        if (!waresJson?.success && !worksJson?.success) {
          setReadFailed(true);
          return;
        }

        const wares: WareRow[] = waresJson?.success
          ? (waresJson.data?.data || waresJson.data || [])
          : [];
        const works: WorkRow[] = worksJson?.success
          ? (worksJson.data?.data || worksJson.data || [])
          : [];

        const rungRows = wares.filter(isRung);
        const plainWares = wares.filter((w) => !isRung(w));
        setRungs(rungRows);

        const merged: SquareItem[] = [
          ...plainWares.map((w) => ({
            id: w.id,
            kind: 'ware' as const,
            name: w.name,
            description: w.description,
            icon_emoji: w.icon_emoji,
            created_at: w.created_at,
            itemType: `ware:${w.ware_type}`,
            typeLabel: `Ware · ${WARE_TYPE_LABELS[w.ware_type] || w.ware_type}`,
            isGifted: w.pricing_model === 'free',
            href: `/bazaar/wares/${w.id}`,
          })),
          ...works.map((w) => ({
            id: w.id,
            kind: 'work' as const,
            name: w.name,
            description: w.description,
            icon_emoji: w.icon_emoji,
            created_at: w.created_at,
            itemType: `work:${w.work_type}`,
            typeLabel: `Work · ${WORK_TYPE_LABELS[w.work_type] || w.work_type}`,
            isGifted: false,
            href: `/bazaar/works/${w.id}`,
          })),
        ].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

        setItems(merged);
      } catch (err) {
        console.error('Failed to read the square:', err);
        setReadFailed(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSquare();
  }, [searchParams]);

  // Only the kinds that actually arrived. No chip for an absent kind, and no
  // announcement that it is absent.
  const types = useMemo(() => {
    const seen = new Map<string, string>();
    items.forEach((i) => seen.set(i.itemType, i.typeLabel));
    return Array.from(seen.entries());
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        i.name.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q);
      const matchesType = !selectedType || i.itemType === selectedType;
      return matchesSearch && matchesType;
    });
  }, [items, searchTerm, selectedType]);

  // The finite-list sentence, drawn from what arrived — never a stored count.
  const finiteLine = useMemo(() => {
    const wares = items.filter((i) => i.kind === 'ware').length;
    const works = items.filter((i) => i.kind === 'work').length;
    const parts: string[] = [];
    if (wares > 0) parts.push(countWord(wares, 'ware', 'wares'));
    if (works > 0) parts.push(countWord(works, 'work', 'works'));
    if (parts.length === 0) return null;
    // Only the first word of the sentence is capitalised — the second half
    // reads as prose, not as a second heading.
    const [first, ...rest] = parts;
    const tail = rest.map((r) => r.charAt(0).toLowerCase() + r.slice(1));
    return `${[first, ...tail].join(' and ')}. That is all of them.`;
  }, [items]);

  const isFiltered = Boolean(searchTerm || selectedType);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (<Skeleton key={i} variant="card" className="h-48" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/bazaar" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Tapestry</h1>
          <p className="text-sm text-star-dust/40 mt-1">
            What sovereign souls have made, and what they offer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} aria-hidden="true" />
            <label className="sr-only" htmlFor="tapestry-search">Search the Tapestry</label>
            <input id="tapestry-search" type="text" placeholder="Search works..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          {types.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedType(null)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedType ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
              >All Types</button>
              {types.map(([value, label]) => (
                <button key={value} onClick={() => setSelectedType(selectedType === value ? null : value)}
                  className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', selectedType === value ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
                >{label}</button>
              ))}
            </div>
          )}
        </div>

        {!readFailed && <RungLadder rungs={rungs} />}

        {readFailed && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
            <p className="text-star-dust/60 text-lg mb-2">The Tapestry could not be read just now.</p>
            <p className="text-sm text-star-dust/40">
              Nothing is lost. This is a door that did not open, not an empty square.
            </p>
          </div>
        )}

        {!readFailed && filtered.length === 0 && !(rungs.length > 0 && !isFiltered) && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
            {isFiltered ? (
              <>
                <p className="text-star-dust/60 text-lg mb-2">No works match that.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedType(null); }}
                  className="text-sm text-neurospark hover:underline"
                >
                  Clear the filter to see everything.
                </button>
              </>
            ) : (
              <p className="text-star-dust/40 text-lg mb-2">The tapestry awaits its first threads</p>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const cardData: CardData = { id: item.id, type: 'product', title: item.name, description: item.description || '' };
            return (
              <Link key={`${item.kind}-${item.id}`} href={item.href}>
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className="text-[10px]">{item.typeLabel}</Badge>
                    {item.icon_emoji && <span aria-hidden="true">{item.icon_emoji}</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{item.name}</h3>
                  {item.description && <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{item.description}</p>}
                  {item.kind === 'work' && (
                    <span className="text-xs text-star-dust/50 mt-auto">a work · it has a door of its own</span>
                  )}
                  {item.kind === 'ware' && item.isGifted && (
                    <span className="text-xs text-sanctuary-green mt-auto">gifted</span>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>

        {!readFailed && !isFiltered && finiteLine && (
          <p className="text-center text-xs text-star-dust/30 mt-10">{finiteLine}</p>
        )}
      </div>
    </main>
  );
}
