// src/components/asgard/domains/iris/messages/MessagesStream.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, MessageCircle, Search } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface MessageThread {
  thread_id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  is_online: boolean;
}

export function MessagesStream() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/iris-communications/messages?recipient_id=${user.id}&order=created_at.desc&limit=50`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success) {
          const data = result.data?.data || result.data || [];
          // Group by thread
          const threadMap = new Map<string, any>();
          data.forEach((m: any) => {
            const tid = m.thread_id || m.messages_id;
            if (!threadMap.has(tid)) {
              threadMap.set(tid, {
                thread_id: tid,
                other_user_name: 'Sanctuary Soul',
                last_message: m.content?.slice(0, 80) || '',
                last_message_at: m.created_at,
                unread_count: 0,
                is_online: false,
              });
            }
          });
          setThreads(Array.from(threadMap.values()));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1,2,3,4,5].map((i) => (<Skeleton key={i} variant="card" className="h-20" />))}
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
          <h1 className="text-2xl font-bold text-star-dust">The Stream</h1>
          <p className="text-sm text-star-dust/40 mt-1">Your conversations, all in one place</p>
        </div>

        {threads.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">No messages yet</p>
            <p className="text-star-dust/30 text-sm">Your conversations will appear here when you connect with other souls.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {threads.map((thread) => {
              const cardData: CardData = { id: thread.thread_id, type: 'value', title: thread.other_user_name, value: thread.last_message };
              return (
                <Link key={thread.thread_id} href={`/connect/messages/${thread.thread_id}`}>
                  <Card data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="default">
                        <AvatarFallback>{thread.other_user_name?.[0] || 'S'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-star-dust">{thread.other_user_name}</span>
                          <span className="text-[10px] text-star-dust/30">{formatTime(thread.last_message_at)}</span>
                        </div>
                        <p className="text-xs text-star-dust/50 truncate">{thread.last_message}</p>
                      </div>
                      {thread.unread_count > 0 && (
                        <span className="w-5 h-5 rounded-full bg-neurospark flex items-center justify-center text-[10px] text-star-dust font-bold">
                          {thread.unread_count}
                        </span>
                      )}
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