// src/components/asgard/domains/iris/feed/PulseFeed.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Radio, Heart, MessageCircle, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Post {
  posts_id: string;
  title: string | null;
  body: string | null;
  author_id: string;
  channel_id: string | null;
  published_at: string;
  emerald_count: number | null;
  comment_count: number | null;
  content_type: string;
  visibility: string;
  author_name?: string;
  author_avatar?: string;
  channel_name?: string;
}

export function PulseFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/hermes-social/posts?visibility=public&order=published_at.desc&limit=20')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setPosts(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
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
          <p className="text-sm text-star-dust/40 mt-1">What's resonating in the Sanctuary</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <Radio className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">The pulse is quiet</p>
            <p className="text-star-dust/30 text-sm">When the community begins to share, their words will flow through here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const cardData: CardData = {
                id: post.posts_id,
                type: 'value',
                title: post.title || 'Untitled',
                value: post.content_type,
                description: post.body || '',
              };
              return (
                <Link key={post.posts_id} href={`/connect/feed/${post.posts_id}`}>
                  <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-5">
                    {/* Author Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar size="sm">
                        <AvatarFallback>{post.author_name?.[0] || 'S'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium text-star-dust">{post.author_name || 'Sanctuary Soul'}</span>
                        {post.channel_name && (
                          <span className="text-xs text-star-dust/40 ml-2">in {post.channel_name}</span>
                        )}
                      </div>
                      <span className="ml-auto text-[10px] text-star-dust/30 flex items-center gap-1">
                        <Clock size={10} />{formatDate(post.published_at)}
                      </span>
                    </div>

                    {/* Content */}
                    {post.title && <h3 className="text-lg font-semibold text-star-dust mb-2">{post.title}</h3>}
                    {post.body && <p className="text-sm text-star-dust/60 line-clamp-4 mb-3">{post.body}</p>}

                    {/* Footer */}
                    <div className="flex items-center gap-4 text-xs text-star-dust/40">
                      <span className="flex items-center gap-1"><Heart size={12} />{post.emerald_count || 0} emeralds</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} />{post.comment_count || 0} comments</span>
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">{post.content_type}</Badge>
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