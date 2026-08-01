// src/components/asgard/domains/prometheus/stage/EventDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, MapPin, User } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface EventItem {
  id: string; title: string; description: string | null;
  event_type: string; genre: string | null; scheduled_for: string | null;
  performer_id: string; is_live: boolean;
}

export function EventDetail() {
  const params = useParams(); const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/prometheus-stage/events/${params.id}`)
      .then(r => r.json())
      .then(result => { if (result.success) setEvent(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>
  );

  if (!event) return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><p className="text-star-dust/40">This event has passed beyond the veil.</p><Link href="/stage/schedule" className="text-neurospark hover:underline mt-4 inline-block">Return to the Calendar</Link></div></main>
  );

  const cd: CardData = { id: event.id, type: 'event', title: event.title, description: event.description || '' };
  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'TBA';

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/stage/schedule" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Calendar</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center gap-2 mb-4">
          {event.is_live && <Badge variant="outline" size="sm" className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30">LIVE</Badge>}
          <Badge variant="outline" size="sm" className="text-[10px] capitalize">{event.event_type}</Badge>
          {event.genre && <Badge variant="outline" size="sm" className="text-[10px]">{event.genre}</Badge>}
        </div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{event.title}</h1>
        {event.description && <p className="text-star-dust/70 leading-relaxed mb-6">{event.description}</p>}
        <div className="flex items-center gap-4 text-sm text-star-dust/40 mb-6">
          {event.scheduled_for && <span className="flex items-center gap-1"><Clock size={14} />{formatDate(event.scheduled_for)}</span>}
          <span className="flex items-center gap-1"><User size={14} />Performer</span>
        </div>
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}