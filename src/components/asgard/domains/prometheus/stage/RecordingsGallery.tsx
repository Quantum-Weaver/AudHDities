// src/components/asgard/domains/prometheus/stage/RecordingsGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Gallery } from '@/components/shapes';
import type { GalleryConfig } from '@/lib/gallery';
import { ArrowLeft, Play, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Recording {
  id: string; title: string; description: string | null;
  event_type: string; genre: string | null; recorded_at: string | null;
}

const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const RECORDINGS: GalleryConfig<Recording> = {
  searchIn: [(r) => r.title, (r) => r.genre],
  card: {
    id: (r) => r.id,
    title: (r) => r.title,
    badges: (r) => [r.event_type || 'event', r.genre],
    meta: (r) => r.recorded_at ? formatDate(r.recorded_at) : null,
    address: (r) => `/stage/recordings/${r.id}`,
  },
  empty: {
    silent: 'No recordings yet',
    unmatched: 'No recording answers to that title or genre',
  },
};

export function RecordingsGallery() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/prometheus-stage/events?is_recorded=true&sort=recorded_at&order=desc')
      .then(r => r.json())
      .then(result => { if (result.success) setRecordings(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>
  );

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Stage</Link><h1 className="text-2xl font-bold text-star-dust">The Echo</h1><p className="text-sm text-star-dust/40 mt-1">Past performances live on</p></div>
      {recordings.length === 0 ? (
        <div className="text-center py-20"><Play className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">No recordings yet</p></div>
      ) : (
        <Gallery
          items={recordings}
          config={RECORDINGS}
          label="Narrow the recordings by title or genre"
          placeholder="Narrow by title or genre"
          bare
        >
          {card => {
            const cd: CardData = { id: card.id, type: 'event', title: card.title };
            return (
              <Link href={card.address} className="block h-full">
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5! h-full">
                  <div className="flex items-center justify-between mb-3!"><Badge variant="outline" size="sm" className="text-[10px] capitalize">{card.badges[0]}</Badge>{card.badges[1] && <Badge variant="outline" size="sm" className="text-[10px]">{card.badges[1]}</Badge>}</div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2!">{card.title}</h3>
                  {card.meta && <div className="flex items-center gap-1 text-xs text-star-dust/40 mt-auto"><Clock size={12} />{card.meta}</div>}
                </Card>
              </Link>
            );
          }}
        </Gallery>
      )}
    </div></main>
  );
}
