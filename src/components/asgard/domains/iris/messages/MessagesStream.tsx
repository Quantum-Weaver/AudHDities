// src/components/asgard/domains/iris/messages/MessagesStream.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { readRows } from '../rows';
import type { CardData } from '@/types/components/runes/card.types';
import type { MessagesRow } from '@/lib/generated/types/iris-communications/messages';

interface Thread {
  id: string;
  partnerId: string;
  lastBody: string;
  lastAt: string;
  unread: number;
}

export function MessagesStream() {
  const { user, loading: authLoading } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const load = async () => {
      const [received, sent] = await Promise.all([
        fetch(`/api/generated/iris-communications/messages?recipient_id=${user.id}&sort=created_at&order=desc&limit=100`).then((r) => r.json()),
        fetch(`/api/generated/iris-communications/messages?created_by=${user.id}&sort=created_at&order=desc&limit=100`).then((r) => r.json()),
      ]);
      if (cancelled) return;

      const rows = [...readRows<MessagesRow>(received), ...readRows<MessagesRow>(sent)]
        .filter((m) => (m.created_by === user.id ? !m.is_deleted_by_sender : !m.is_deleted_by_recipient))
        .sort((a, b) => b.created_at.localeCompare(a.created_at));

      const byThread = new Map<string, Thread>();
      rows.forEach((m) => {
        const id = m.parent_message_id ?? m.id;
        const partnerId = m.created_by === user.id ? m.recipient_id : m.created_by;
        const unread = m.recipient_id === user.id && !m.is_read ? 1 : 0;
        const held = byThread.get(id);
        if (held) {
          held.unread += unread;
          return;
        }
        byThread.set(id, { id, partnerId, lastBody: (m.body ?? '').slice(0, 80), lastAt: m.created_at, unread });
      });

      const found = Array.from(byThread.values());
      setThreads(found);
      setLoaded(true);

      const partners = Array.from(new Set(found.map((t) => t.partnerId)));
      if (partners.length === 0) return;

      const supabase = createClient();
      const { data } = await supabase
        .from('community_profiles')
        .select('created_by, display_name')
        .in('created_by', partners);
      if (cancelled || !data) return;

      const byPartner: Record<string, string> = {};
      data.forEach((p) => { if (p.created_by) byPartner[p.created_by] = p.display_name; });
      setNames(byPartner);
    };

    load().catch((err) => { console.error(err); if (!cancelled) setLoaded(true); });

    return () => { cancelled = true; };
  }, [user]);

  const loading = authLoading || (!!user && !loaded);

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

        {!user ? (
          <p className="text-star-dust/60 text-center">Sign in to read your messages.</p>
        ) : threads.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">No messages yet</p>
            <p className="text-star-dust/30 text-sm">Your conversations will appear here when you connect with other souls.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {threads.map((thread) => {
              const partnerName = names[thread.partnerId] || 'Sanctuary Soul';
              const cardData: CardData = { id: thread.id, type: 'value', title: partnerName, value: thread.lastBody };
              return (
                <Link key={thread.id} href={`/connect/messages/${thread.id}`}>
                  <Card data={cardData} variant="glass" radius="md" shadow="sm" className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="default">
                        <AvatarFallback>{partnerName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-star-dust">{partnerName}</span>
                          <span className="text-[10px] text-star-dust/30">{formatTime(thread.lastAt)}</span>
                        </div>
                        <p className="text-xs text-star-dust/50 truncate">{thread.lastBody}</p>
                      </div>
                      {thread.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-neurospark flex items-center justify-center text-[10px] text-star-dust font-bold">
                          {thread.unread}
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
