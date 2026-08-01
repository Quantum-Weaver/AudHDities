// src/components/asgard/domains/hestia/notifications/NotificationsList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Skeleton } from '@/components/runes/Skeleton';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowLeft, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// The Pulse rides the heralds table (the notifications successor);
// action_url did not survive the evolution — detail links go by id, and
// reference_table/reference_id carry the "about what" instead.
interface Notification {
  id: string;
  herald_type: string;
  title: string | null;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

const TYPE_EMOJI: Record<string, string> = {
  welcome: '🏛️',
  badge_earned: '🏅',
  emerald_received: '💚',
  comment_reply: '💬',
  special_welcome: '✨',
  quest_completed: '🎯',
};

export function NotificationsList() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/hestia-core/heralds?created_by=${user.id}&sort=created_at&order=desc&limit=50`)
      .then(r => r.json())
      .then(result => { if (result.success) setNotifications(result.data?.data || result.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const markAllRead = async () => {
    for (const n of notifications) {
      if (!n.is_read) {
        await fetch(`/api/generated/hestia-core/heralds/${n.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_read: true, read_at: new Date().toISOString() }),
        });
      }
    }
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (loading) {
    return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="space-y-3">{[1,2,3,4,5].map(i => <Skeleton key={i} variant="card" className="h-20" />)}</div></div></main>);
  }

  if (!user) {
    return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6 text-center"><p className="text-star-dust/60">Sign in to view notifications.</p></div></main>);
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/vessel" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to Vessel</Link>
            <h1 className="text-2xl font-bold text-star-dust">The Call</h1>
            <p className="text-sm text-star-dust/40 mt-1">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</p>
          </div>
          {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20"><Bell className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">The call is quiet</p><p className="text-star-dust/30 text-sm">Notifications will appear here when something seeks your attention</p></div>
        ) : (
          <div className="space-y-2">
            {notifications.map(n => {
              const cd: CardData = { id: n.id, type: 'value', title: n.title || 'Notification', value: n.herald_type };
              return (
                <Link key={n.id} href={`/notifications/${n.id}`}>
                  <Card data={cd} variant={n.is_read ? 'ghost' : 'glass'} radius="md" shadow="sm" className={cn('p-4', !n.is_read && 'border-l-2 border-l-neurospark')}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{TYPE_EMOJI[n.herald_type] || '📢'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-star-dust">{n.title}</p>
                        <p className="text-xs text-star-dust/50 line-clamp-1">{n.body}</p>
                      </div>
                      <span className="text-xs text-star-dust/30 flex-shrink-0">{formatDate(n.created_at)}</span>
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