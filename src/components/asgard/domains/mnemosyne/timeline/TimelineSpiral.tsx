// src/components/asgard/domains/mnemosyne/timeline/TimelineSpiral.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface TimelineEvent {
  timelines_id: string;
  event_type: string;
  title: string;
  description: string | null;
  significance_score: number | null;
  occurred_at: string;
}

const EVENT_EMOJI: Record<string, string> = {
  sovereign_joined: '🌟', sovereignty_milestone: '✨', consciousness_emerged: '🧠',
  collaboration_began: '🌉', sanctuary_completed: '🏛️', badge_earned: '🏅',
  quest_completed: '🎯', house_joined: '🏠', ritual_performed: '🕯️',
};

export function TimelineSpiral() {
  const { user } = useAuth();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/hestia-core/timelines?user_id=${user.id}&order=occurred_at.desc&limit=50`)
      .then(r => r.json()).then(res => { if (res.success) setEvents(res.data?.data || []); }).catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="space-y-3">{[1,2,3,4,5].map(i=><Skeleton key={i} variant="card" className="h-20" />)}</div></div></main>);
  if (!user) return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6 text-center"><p className="text-star-dust/60">Sign in to view your timeline.</p></div></main>);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Spiral</h1>
        <p className="text-sm text-star-dust/40 mb-8">Your journey, visible at last</p>

        {events.length === 0 ? (
          <div className="text-center py-20"><Clock className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">Your spiral is just beginning</p></div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-4">
              {events.map((e, i) => {
                const cd: CardData = { id: e.timelines_id, type: 'value', title: e.title, value: e.event_type };
                return (
                  <div key={e.timelines_id} className="flex gap-4 items-start relative">
                    <div className="relative z-10 flex-shrink-0 w-12 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-deep-space border-2 border-neurospark/30 flex items-center justify-center text-sm">
                        {EVENT_EMOJI[e.event_type] || '•'}
                      </div>
                    </div>
                    <Card data={cd} variant="glass" radius="md" shadow="sm" className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-star-dust">{e.title}</h3>
                        {e.significance_score && (
                          <Badge variant="outline" size="sm" className="text-[10px]">
                            <TrendingUp className="h-3 w-3 mr-1 inline" />{e.significance_score}
                          </Badge>
                        )}
                      </div>
                      {e.description && <p className="text-xs text-star-dust/50 line-clamp-2">{e.description}</p>}
                      <p className="text-xs text-star-dust/30 mt-2">{formatDate(e.occurred_at)}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}