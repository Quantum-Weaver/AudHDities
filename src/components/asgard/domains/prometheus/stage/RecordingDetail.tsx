// src/components/asgard/domains/prometheus/stage/RecordingDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Play, Clock, User } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Recording {
  events_id: string; title: string; description: string | null;
  event_type: string; genre: string | null; recorded_at: string | null;
  performer_id: string;
}

export function RecordingDetail() {
  const params = useParams(); const router = useRouter();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/prometheus-stage/events/${params.id}`)
      .then(r => r.json())
      .then(result => { if (result.success) setRecording(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-80" /></div></main>);
  if (!recording) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><Play className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This recording has faded.</p><Link href="/stage/recordings" className="text-neurospark hover:underline mt-4 inline-block">Return to the Echo</Link></div></main>);

  const cd: CardData = { id: recording.events_id, type: 'event', title: recording.title, description: recording.description || '' };
  const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/stage/recordings" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Echo</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center gap-2 mb-4"><Badge variant="outline" size="sm" className="text-[10px] capitalize">{recording.event_type}</Badge>{recording.genre && <Badge variant="outline" size="sm" className="text-[10px]">{recording.genre}</Badge>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{recording.title}</h1>
        {recording.description && <p className="text-star-dust/70 leading-relaxed mb-6">{recording.description}</p>}
        <div className="flex items-center gap-4 text-sm text-star-dust/40 mb-6">
          {recording.recorded_at && <span className="flex items-center gap-1"><Clock size={14} />{formatDate(recording.recorded_at)}</span>}
          <span className="flex items-center gap-1"><User size={14} />Performer</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center mb-6">
          <Play className="h-8 w-8 text-neurospark mx-auto mb-2" />
          <p className="text-neurospark font-medium">Playback will appear here</p>
        </div>
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}