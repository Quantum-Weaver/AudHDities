// src/components/asgard/domains/iris/channels/ChannelsGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Users, Search, MessageCircle } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Channel {
  channels_id: string;
  display_name: string;
  handle: string;
  description: string | null;
  subscriber_count: number | null;
}

export function ChannelsGallery() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/generated/hermes-social/channels?order=display_name.asc')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setChannels(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    channels.filter((c) =>
      c.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    ), [channels, searchTerm]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map((i) => (<Skeleton key={i} variant="card" className="h-36" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Channels</h1>
          <p className="text-sm text-star-dust/40 mt-1">Find your community</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
          <input type="text" placeholder="Search channels..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No channels match' : 'Channels are forming'}</p>
            <p className="text-star-dust/30 text-sm">Be the first to create a channel and build your community.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((channel) => {
              const cardData: CardData = { id: channel.channels_id, type: 'value', title: channel.display_name, value: channel.handle };
              return (
                <Link key={channel.channels_id} href={`/connect/channels/${channel.channels_id}`}>
                  <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                    <h3 className="text-lg font-semibold text-star-dust mb-1">@{channel.handle}</h3>
                    <p className="text-sm text-star-dust/60 mb-3">{channel.display_name}</p>
                    {channel.description && <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{channel.description}</p>}
                    <div className="flex items-center gap-3 text-xs text-star-dust/40">
                      <span className="flex items-center gap-1"><Users size={12} />{channel.subscriber_count || 0} subscribers</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} />View Channel</span>
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