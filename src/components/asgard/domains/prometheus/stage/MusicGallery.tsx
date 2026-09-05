// src/components/asgard/domains/prometheus/stage/MusicGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Carousel, type CarouselStop } from '@/components/shapes';
import { ArrowLeft, Music } from 'lucide-react';

interface MusicEvent {
  id: string; title: string; description: string | null;
  scheduled_for: string | null; is_live: boolean;
}

interface MusicStop extends CarouselStop {
  description: string | null;
  live: boolean;
}

export function MusicGallery() {
  const router = useRouter();
  const [events, setEvents] = useState<MusicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/prometheus-stage/events?genre=music&sort=scheduled_for&order=asc')
      .then(r => r.json())
      .then(result => { if (result.success) setEvents(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stops = useMemo<MusicStop[]>(() => events.map(e => ({
    id: e.id,
    title: e.title,
    form: 'song',
    at: e.scheduled_for ? Date.parse(e.scheduled_for) : undefined,
    description: e.description,
    live: e.is_live,
  })), [events]);

  if (loading) return (
    <main className="min-h-screen w-full flex flex-col items-center py-12!"><div className="w-[min(56rem,calc(100vw-3rem))] flex flex-col gap-8 px-6!"><Skeleton variant="text" className="h-8 w-48" /><Skeleton variant="card" className="h-52 w-full" /></div></main>
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-12!"><div className="w-[min(56rem,calc(100vw-3rem))] flex flex-col gap-8 px-6!">
      <div className="flex flex-col gap-1"><Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm"><ArrowLeft className="h-4 w-4" />Return to the Stage</Link><h1 className="text-2xl font-bold text-star-dust">The Music Realm</h1><p className="text-sm text-star-dust/40">Where sound becomes substance</p></div>
      {stops.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20!"><Music className="h-12 w-12 text-star-dust/20" /><p className="text-star-dust/40 text-lg">The realm awaits its first song</p></div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-star-dust/50">One song at a time, earliest first. Press the song in view to open it.</p>
          <Carousel
            stops={stops}
            bearing="oldest"
            height={208}
            label="the music sets, one at a time"
            onSelect={stop => router.push(`/stage/music/${stop.id}`)}
          >
            {stop => (
              <div className="flex h-full flex-col gap-2 overflow-hidden">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" size="sm" className="text-[10px]">Music</Badge>
                  {stop.live && <Badge variant="outline" size="sm" className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30">LIVE</Badge>}
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold text-star-dust">{stop.title}</h3>
                {stop.description && <p className="text-sm text-star-dust/50 line-clamp-2">{stop.description}</p>}
              </div>
            )}
          </Carousel>
        </div>
      )}
    </div></main>
  );
}
