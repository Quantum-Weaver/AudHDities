// src/components/asgard/domains/hestia/notifications/NotificationDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Bell, ExternalLink } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Notification {
  notifications_id: string;
  type: string;
  title: string;
  body: string;
  action_url: string | null;
  action_label: string | null;
  is_read: boolean | null;
  created_at: string;
}

const TYPE_EMOJI: Record<string, string> = {
  welcome: '🏛️', badge_earned: '🏅', emerald_received: '💚', comment_reply: '💬', special_welcome: '✨',
};

export function NotificationDetail() {
  const params = useParams(); const router = useRouter();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hestia-core/notifications/${params.id}`)
      .then(r => r.json()).then(result => { if (result.success) setNotification(result.data); })
      .catch(console.error).finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (notification && !notification.is_read) {
      fetch(`/api/generated/hestia-core/notifications/${notification.notifications_id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }),
      }).catch(console.error);
    }
  }, [notification]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!notification) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><Bell className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This call has faded.</p><Link href="/notifications" className="text-neurospark hover:underline mt-4 inline-block">Return to the Call</Link></div></main>);

  const cd: CardData = { id: notification.notifications_id, type: 'value', title: notification.title, value: notification.type };
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/notifications" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Call</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="text-center mb-6"><span className="text-4xl">{TYPE_EMOJI[notification.type] || '📢'}</span></div>
        <h1 className="text-2xl font-bold text-star-dust text-center mb-2">{notification.title}</h1>
        <p className="text-xs text-star-dust/40 text-center mb-6">{formatDate(notification.created_at)}</p>
        <p className="text-star-dust/70 leading-relaxed mb-6">{notification.body}</p>
        <div className="flex gap-3 justify-center">
          {notification.action_url && (
            <Link href={notification.action_url}><Button variant="primary" size="md"><ExternalLink className="h-4 w-4 mr-2" />{notification.action_label || 'Take Action'}</Button></Link>
          )}
          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </div>
      </Card>
    </div></main>
  );
}