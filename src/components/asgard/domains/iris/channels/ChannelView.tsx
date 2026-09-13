// src/components/asgard/domains/iris/channels/ChannelView.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Users, MessageCircle } from 'lucide-react';
import { readRow } from '../rows';
import type { CardData } from '@/types/components/runes/card.types';
import type { ChannelsRow } from '@/lib/generated/types/iris-communications/channels';

export function ChannelView() {
  const params = useParams();
  const channelId = typeof params?.id === 'string' ? params.id : '';
  const [channel, setChannel] = useState<ChannelsRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/generated/iris-communications/channels/${channelId}`)
      .then((r) => r.json())
      .then((result) => { if (!cancelled) setChannel(readRow<ChannelsRow>(result)); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [channelId]);

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

  if (!channel) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Users className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This channel has faded into the void.</p>
          <Link href="/connect/channels" className="text-neurospark hover:underline mt-4 inline-block">Return to Channels</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: channel.id, type: 'value', title: channel.name, value: channel.slug };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/connect/channels" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Channels
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-star-dust">{channel.name}</h1>
              <p className="text-sm text-star-dust/40">@{channel.slug}</p>
            </div>
            {channel.channel_type && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">{channel.channel_type}</Badge>
            )}
          </div>

          {channel.description && <p className="text-star-dust/70 leading-relaxed mb-6">{channel.description}</p>}

          <div className="mt-8 p-6 bg-white/5 rounded-xl text-center">
            <MessageCircle className="h-8 w-8 text-star-dust/20 mx-auto mb-3" />
            <p className="text-star-dust/40 text-sm">This channel holds no posts. The Sanctuary keeps its shared writing in the Pulse.</p>
            <Link href="/connect/feed" className="text-neurospark hover:underline text-sm mt-3 inline-block">Go to the Pulse</Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
