// src/components/asgard/domains/prometheus/stage/ScheduleGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface ScheduledEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  scheduled_for: string | null;
  genre: string | null;
}

export function ScheduleGallery() {
  const [events, setEvents] = useState<ScheduledEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/prometheus-stage/events?sort=scheduled_for&order=asc')
      .then(r => r.json())
      .then(result => { if (result.success) setEvents(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-44" />)}
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (d: string | null) => {
    if (!d) return 'TBA';
    return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/stage" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Stage
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Calendar</h1>
          <p className="text-sm text-star-dust/40 mt-1">Upcoming performances</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">No events scheduled yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => {
              const cd: CardData = { id: event.id, type: 'event', title: event.title, description: event.description || '' };
              return (
                <Link key={event.id} href={`/stage/schedule/${event.id}`}>
                  <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">{event.event_type || 'event'}</Badge>
                      {event.genre && <Badge variant="outline" size="sm" className="text-[10px]">{event.genre}</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold text-star-dust mb-2">{event.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-star-dust/40 mt-auto">
                      <Clock size={12} />
                      <span>{formatDate(event.scheduled_for)}</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}