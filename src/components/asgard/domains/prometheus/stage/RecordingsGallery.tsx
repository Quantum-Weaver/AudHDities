// src/components/asgard/domains/prometheus/stage/RecordingsGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Play, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Recording {
  events_id: string; title: string; description: string | null;
  event_type: string; genre: string | null; recorded_at: string | null;
}

export function RecordingsGallery() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/prometheus-stage/events?is_recorded=true&order=recorded_at.desc')
      .then(r => r.json())
      .then(result => { if (result.success) setRecordings(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  if (loading) return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>
  );

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Stage</Link><h1 className="text-2xl font-bold text-star-dust">The Echo</h1><p className="text-sm text-star-dust/40 mt-1">Past performances live on</p></div>
      {recordings.length === 0 ? (
        <div className="text-center py-20"><Play className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">No recordings yet</p></div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordings.map(r => {
            const cd: CardData = { id: r.events_id, type: 'event', title: r.title, description: r.description || '' };
            return (
              <Link key={r.events_id} href={`/stage/recordings/${r.events_id}`}>
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3"><Badge variant="outline" size="sm" className="text-[10px] capitalize">{r.event_type}</Badge>{r.genre && <Badge variant="outline" size="sm" className="text-[10px]">{r.genre}</Badge>}</div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{r.title}</h3>
                  {r.recorded_at && <div className="flex items-center gap-1 text-xs text-star-dust/40 mt-auto"><Clock size={12} />{formatDate(r.recorded_at)}</div>}
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div></main>
  );
}