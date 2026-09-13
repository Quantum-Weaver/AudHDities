// src/components/asgard/domains/iris/feed/PulseFeed.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Radio, MessageCircle, Clock } from 'lucide-react';
import { readRows } from '../rows';
import type { CardData } from '@/types/components/runes/card.types';
import type { SignalsRow } from '@/lib/generated/types/iris-communications/signals';

export function PulseFeed() {
  const [signals, setSignals] = useState<SignalsRow[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const response = await fetch(
        '/api/generated/iris-communications/signals?status=published&sort=created_at&order=desc&limit=20'
      );
      const rows = readRows<SignalsRow>(await response.json());
      if (cancelled) return;
      setSignals(rows);

      const authors = Array.from(new Set(rows.map((s) => s.created_by)));
      if (authors.length === 0) return;

      const supabase = createClient();
      const { data } = await supabase
        .from('community_profiles')
        .select('created_by, display_name')
        .in('created_by', authors);
      if (cancelled || !data) return;

      const byAuthor: Record<string, string> = {};
      data.forEach((p) => { if (p.created_by) byAuthor[p.created_by] = p.display_name; });
      setNames(byAuthor);
    };

    load()
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-4">
            {[1,2,3].map((i) => (<Skeleton key={i} variant="card" className="h-48" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Pulse</h1>
          <p className="text-sm text-star-dust/40 mt-1">What&apos;s resonating in the Sanctuary</p>
        </div>

        {signals.length === 0 ? (
          <div className="text-center py-20">
            <Radio className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">The pulse is quiet</p>
            <p className="text-star-dust/30 text-sm">When the community begins to share, their words will flow through here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {signals.map((signal) => {
              const authorName = names[signal.created_by] || 'Sanctuary Soul';
              const cardData: CardData = {
                id: signal.id,
                type: 'value',
                title: signal.name,
                value: signal.signal_type || '',
                description: signal.description || '',
              };
              return (
                <Card key={signal.id} data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar size="sm">
                      <AvatarFallback>{authorName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-star-dust">{authorName}</span>
                    <span className="ml-auto text-[10px] text-star-dust/30 flex items-center gap-1">
                      <Clock size={10} />{formatDate(signal.created_at)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-star-dust mb-2">{signal.name}</h3>
                  {signal.description && <p className="text-sm text-star-dust/60 line-clamp-4 mb-3">{signal.description}</p>}

                  <div className="flex items-center gap-4 text-xs text-star-dust/40">
                    <span className="flex items-center gap-1"><MessageCircle size={12} />{signal.response_count} responses</span>
                    {signal.signal_type && (
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">{signal.signal_type}</Badge>
                    )}
                    {signal.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] text-star-dust/30">#{tag}</span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
