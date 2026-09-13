// src/components/asgard/domains/hermes/works/WorksGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Carousel, type CarouselStop } from '@/components/shapes';
import { ArrowLeft, Package, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WorkRow = Tables<'works'>;

const WORK_TYPE_LABELS: Record<string, string> = {
  music: 'Music', writing: 'Writing', vision: 'Vision',
  performance: 'Performance', code: 'Code', other: 'Other',
};

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];

function countWord(n: number, one: string, many: string): string {
  const word = n < COUNT_WORDS.length ? COUNT_WORDS[n] : String(n);
  return `${word} ${n === 1 ? one : many}`;
}

type Shape = 'grid' | 'carousel';

interface WorkStop extends CarouselStop {
  description: string | null;
  typeLabel: string;
  icon_emoji: string | null;
  isGifted: boolean;
  href: string;
}

export function WorksGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [works, setWorks] = useState<WorkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [readFailed, setReadFailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [shape, setShape] = useState<Shape>('grid');

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        // The parameter carries the profile id it names.
        const artisanProfileId =
          searchParams.get('artisan_id') || searchParams.get('creator_id');

        const p = new URLSearchParams();
        p.set('status', 'published');
        p.set('order', 'created_at.desc');
        if (artisanProfileId) p.set('artisan_profile_id', artisanProfileId);

        const result = await fetch(`/api/generated/hermes-social/works?${p.toString()}`)
          .then((r) => r.json())
          .catch(() => null);

        if (!result?.success) {
          setReadFailed(true);
          return;
        }
        const rows: WorkRow[] = result.data?.data || result.data || [];
        setWorks(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error('Failed to read the works:', err);
        setReadFailed(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, [searchParams]);

  const types = useMemo(() => {
    const seen = new Map<string, string>();
    works.forEach((w) => seen.set(w.work_type, WORK_TYPE_LABELS[w.work_type] || w.work_type));
    return Array.from(seen.entries());
  }, [works]);

  const filtered = useMemo(() => {
    return works.filter((w) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        w.name.toLowerCase().includes(q) || (w.description || '').toLowerCase().includes(q);
      const matchesType = !selectedType || w.work_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [works, searchTerm, selectedType]);

  const stops = useMemo<WorkStop[]>(
    () => filtered.map((w) => ({
      id: w.id,
      title: w.name,
      form: 'work',
      at: Date.parse(w.created_at) || undefined,
      description: w.description,
      typeLabel: WORK_TYPE_LABELS[w.work_type] || w.work_type,
      icon_emoji: w.icon_emoji,
      isGifted: w.pricing_model === 'free',
      href: `/bazaar/works/${w.id}`,
    })),
    [filtered],
  );

  const finiteLine = useMemo(() => {
    if (works.length === 0) return null;
    return `${countWord(works.length, 'work', 'works')}. That is all of them.`;
  }, [works]);

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
          <h1 className="text-2xl font-bold text-star-dust">The works</h1>
          <p className="text-sm text-star-dust/40 mt-1">
            The things sovereign souls have made. A work is here because it was made.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} aria-hidden="true" />
            <label className="sr-only" htmlFor="works-search">Search the works</label>
            <input id="works-search" type="text" placeholder="Search works..." value={searchTerm}
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

        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6" role="group" aria-label="How the works are laid out">
            <button
              onClick={() => setShape('grid')}
              aria-pressed={shape === 'grid'}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark', shape === 'grid' ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >
              All at once
            </button>
            <button
              onClick={() => setShape('carousel')}
              aria-pressed={shape === 'carousel'}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark', shape === 'carousel' ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >
              One at a time
            </button>
          </div>
        )}

        {readFailed && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
            <p className="text-star-dust/60 text-lg mb-2">The works could not be read just now.</p>
            <p className="text-sm text-star-dust/40">
              Nothing is lost. This is a door that did not open, not an empty square.
            </p>
          </div>
        )}

        {!readFailed && filtered.length === 0 && (
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
              <p className="text-star-dust/40 text-lg mb-2">No work stands here yet</p>
            )}
          </div>
        )}

        {shape === 'carousel' && filtered.length > 0 && (
          <Carousel
            stops={stops}
            bearing="newest"
            height={208}
            label="the works, one at a time"
            onSelect={(stop) => router.push(stop.href)}
          >
            {(stop) => (
              <div className="flex h-full flex-col gap-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm" className="text-[10px]">{stop.typeLabel}</Badge>
                  {stop.icon_emoji && <span aria-hidden="true">{stop.icon_emoji}</span>}
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold text-star-dust">{stop.title}</h3>
                {stop.description && <p className="text-sm text-star-dust/50 line-clamp-2">{stop.description}</p>}
                {stop.isGifted && <span className="text-xs text-sanctuary-green mt-auto">gifted</span>}
              </div>
            )}
          </Carousel>
        )}

        {shape === 'grid' && filtered.length > 0 && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((work) => {
              const cardData: CardData = { id: work.id, type: 'product', title: work.name, description: work.description || '' };
              return (
                <Link key={work.id} href={`/bazaar/works/${work.id}`}>
                  <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" size="sm" className="text-[10px]">
                        {WORK_TYPE_LABELS[work.work_type] || work.work_type}
                      </Badge>
                      {work.icon_emoji && <span aria-hidden="true">{work.icon_emoji}</span>}
                    </div>
                    <h3 className="text-lg font-semibold text-star-dust mb-2">{work.name}</h3>
                    {work.description && <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{work.description}</p>}
                    {work.pricing_model === 'free' && (
                      <span className="text-xs text-sanctuary-green mt-auto">gifted</span>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {!readFailed && !isFiltered && finiteLine && (
          <p className="text-center text-xs text-star-dust/30 mt-10">{finiteLine}</p>
        )}
      </div>
    </main>
  );
}
