// src/components/asgard/domains/prometheus/stage/ComedyGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Mic } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface ComedyEvent {
  events_id: string; title: string; description: string | null;
  scheduled_for: string | null; is_live: boolean;
}

export function ComedyGallery() {
  const [events, setEvents] = useState<ComedyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/prometheus-stage/events?genre=comedy&order=scheduled_for.asc')
      .then(r => r.json())
      .then(result => { if (result.success) setEvents(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>
  );

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Stage</Link><h1 className="text-2xl font-bold text-star-dust">The Comedy Hearth</h1><p className="text-sm text-star-dust/40 mt-1">Where laughter heals</p></div>
      {events.length === 0 ? (
        <div className="text-center py-20"><Mic className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">The hearth is quiet for now</p></div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(e => {
            const cd: CardData = { id: e.events_id, type: 'event', title: e.title, description: e.description || '' };
            return (
              <Link key={e.events_id} href={`/stage/comedy/${e.events_id}`}>
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className="text-[10px]">Comedy</Badge>
                    {e.is_live && <Badge variant="outline" size="sm" className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30">LIVE</Badge>}
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{e.title}</h3>
                  {e.description && <p className="text-sm text-star-dust/50 line-clamp-2">{e.description}</p>}
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div></main>
  );
}