// src/components/asgard/domains/prometheus/stage/LiveDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, Radio, Users } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface LiveEvent {
  id: string; title: string; description: string | null;
  event_type: string; performer_id: string; started_at: string | null;
  is_live: boolean;
}

export function LiveDetail() {
  const params = useParams(); const router = useRouter();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/prometheus-stage/events/${params.id}`)
      .then(r => r.json())
      .then(result => { if (result.success) setEvent(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-80" /></div></main>
  );

  if (!event) return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><Radio className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This performance has ended.</p><Link href="/stage/live" className="text-neurospark hover:underline mt-4 inline-block">Return to Now Playing</Link></div></main>
  );

  const cd: CardData = { id: event.id, type: 'event', title: event.title, description: event.description || '' };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/stage/live" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to Now Playing</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" size="sm" className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">LIVE</Badge>
          <Badge variant="outline" size="sm" className="text-[10px] capitalize">{event.event_type}</Badge>
        </div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{event.title}</h1>
        {event.description && <p className="text-star-dust/70 leading-relaxed mb-6">{event.description}</p>}
        <div className="flex items-center gap-4 text-sm text-star-dust/40 mb-6">
          <span className="flex items-center gap-1"><Clock size={14} />Live now</span>
          <span className="flex items-center gap-1"><Users size={14} />0 watching</span>
        </div>
        <div className="bg-neurospark/10 border border-neurospark/20 rounded-xl p-6 text-center mb-6">
          <Radio className="h-8 w-8 text-neurospark mx-auto mb-2" />
          <p className="text-neurospark font-medium">Stream player will appear here</p>
          <p className="text-xs text-star-dust/40 mt-1">Connected to the Stage studio</p>
        </div>
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}