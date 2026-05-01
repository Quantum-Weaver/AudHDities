// src/components/asgard/domains/iris/channels/ChannelView.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Users, MessageCircle, Bell, BellOff } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Channel {
  channels_id: string;
  display_name: string;
  handle: string;
  description: string | null;
  subscriber_count: number | null;
  owner_id: string;
}

export function ChannelView() {
  const params = useParams();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch(`/api/generated/hermes-social/channels/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setChannel(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

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

  const cardData: CardData = { id: channel.channels_id, type: 'value', title: channel.display_name, value: channel.handle };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/connect/channels" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Channels
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-star-dust">{channel.display_name}</h1>
              <p className="text-sm text-star-dust/40">@{channel.handle}</p>
            </div>
            <Button variant={subscribed ? 'ghost' : 'primary'} size="sm" onClick={() => setSubscribed(!subscribed)}>
              {subscribed ? <><BellOff className="h-4 w-4 mr-2" />Unsubscribe</> : <><Bell className="h-4 w-4 mr-2" />Subscribe</>}
            </Button>
          </div>

          {channel.description && <p className="text-star-dust/70 leading-relaxed mb-6">{channel.description}</p>}

          <div className="flex items-center gap-3 text-sm text-star-dust/40">
            <span className="flex items-center gap-1"><Users size={14} />{channel.subscriber_count || 0} subscribers</span>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-xl text-center">
            <MessageCircle className="h-8 w-8 text-star-dust/20 mx-auto mb-3" />
            <p className="text-star-dust/40 text-sm">Channel posts will appear here when the community begins to share.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}