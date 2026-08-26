// src/components/asgard/domains/hestia/constellation/ConstellationDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Calendar, Star } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface TimelineEvent {
  id: string;
  event_type: string;
  description: string | null;
  event_at: string;
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  sovereign_joined: 'Arrival',
  consciousness_emerged: 'Awakening',
  collaboration_began: 'Collaboration',
  sovereign_milestone: 'Milestone',
  sanctuary_completed: 'Completion',
  badge_earned: 'Sigil Earned',
  quest_completed: 'Quest Completed',
};

export function ConstellationDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const eventId = params.id as string;

  const [event, setEvent] = useState<TimelineEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/hestia-core/current/${eventId}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setEvent(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId, user]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Star className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This star has drifted beyond view.</p>
          <Link href="/vessel/constellation" className="text-neurospark hover:underline mt-4 inline-block">Return to your Constellation</Link>
        </div>
      </main>
    );
  }

  const label = EVENT_TYPE_LABELS[event.event_type] || event.event_type;
  const cardData: CardData = { id: event.id, type: 'value', title: label, value: event.event_type };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/vessel/constellation" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to your Constellation
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" size="sm" className="text-[10px]">
              {label}
            </Badge>
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-2">{label}</h1>

          <div className="flex items-center gap-2 text-xs text-star-dust/40 mb-6">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(event.event_at)}</span>
          </div>

          {event.description && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-star-dust/70 leading-relaxed">{event.description}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}