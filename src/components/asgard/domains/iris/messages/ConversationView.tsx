// src/components/asgard/domains/iris/messages/ConversationView.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { herald, HERALD_TYPE } from '@/lib/heralds/write';
import { ArrowLeft, Send } from 'lucide-react';
import { readRow, readRows } from '../rows';
import type { CardData } from '@/types/components/runes/card.types';
import type { MessagesRow, MessagesInsert } from '@/lib/generated/types/iris-communications/messages';

export function ConversationView() {
  const params = useParams();
  const threadId = typeof params?.id === 'string' ? params.id : '';
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<MessagesRow[]>([]);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState('Sanctuary Soul');
  const [loaded, setLoaded] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !threadId) return;
    let cancelled = false;

    const load = async () => {
      const [rootPayload, replyPayload] = await Promise.all([
        fetch(`/api/generated/iris-communications/messages/${threadId}`).then((r) => r.json()),
        fetch(`/api/generated/iris-communications/messages?parent_message_id=${threadId}&sort=created_at&order=asc&limit=100`).then((r) => r.json()),
      ]);
      if (cancelled) return;

      const root = readRow<MessagesRow>(rootPayload);
      const replies = readRows<MessagesRow>(replyPayload);
      const thread = (root ? [root, ...replies.filter((m) => m.id !== root.id)] : replies)
        .filter((m) => (m.created_by === user.id ? !m.is_deleted_by_sender : !m.is_deleted_by_recipient));
      setMessages(thread);
      setLoaded(true);

      const anchor = root ?? replies[0];
      if (!anchor) return;
      const partner = anchor.created_by === user.id ? anchor.recipient_id : anchor.created_by;
      setPartnerId(partner);

      const supabase = createClient();
      const { data } = await supabase
        .from('community_profiles')
        .select('display_name')
        .eq('created_by', partner)
        .maybeSingle();
      if (cancelled || !data) return;
      setPartnerName(data.display_name);
    };

    load().catch((err) => { console.error(err); if (!cancelled) setLoaded(true); });

    return () => { cancelled = true; };
  }, [threadId, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !partnerId || sending) return;
    setSending(true);
    try {
      const payload: MessagesInsert = {
        created_by: user.id,
        recipient_id: partnerId,
        body: newMessage.trim(),
        parent_message_id: threadId,
      };
      const response = await fetch('/api/generated/iris-communications/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const written = readRow<MessagesRow>(await response.json());
      if (written) {
        setMessages((prev) => [...prev, written]);
        setNewMessage('');
        await herald(createClient(), {
          recipient: partnerId,
          type: HERALD_TYPE.MESSAGE_RECEIVED,
          title: 'A new message',
          body: 'A message is waiting for you in the Stream.',
          actor: user.id,
          referenceTable: 'messages',
          referenceId: written.id,
        });
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const loading = authLoading || (!!user && !loaded);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <div className="container max-w-3xl mx-auto px-6 py-12 flex-1">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <Skeleton variant="card" className="h-16 w-48" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Sign in to read this conversation.</p>
          <Link href="/connect/messages" className="text-neurospark hover:underline mt-4 inline-block">Return to the Stream</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="border-b border-white/10 py-3 px-6">
        <div className="container max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/connect/messages" className="text-star-dust/60 hover:text-star-dust">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Avatar size="sm"><AvatarFallback>{partnerName[0]}</AvatarFallback></Avatar>
          <span className="text-star-dust font-medium">{partnerName}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <div className="container max-w-3xl mx-auto px-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-star-dust/40">No messages yet. Say hello.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.created_by === user.id;
              const cardData: CardData = { id: msg.id, type: 'value', title: '', value: msg.body ?? '' };
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[70%]">
                    <Card data={cardData} variant={isMine ? 'quantum' : 'glass'} radius="lg" shadow="sm" className="p-3">
                      <p className="text-sm text-star-dust">{msg.body}</p>
                      <p className="text-[10px] text-star-dust/30 mt-1 text-right">{formatTime(msg.created_at)}</p>
                    </Card>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-6">
        <div className="container max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
          />
          <Button variant="primary" size="md" onClick={handleSend} loading={sending} disabled={!newMessage.trim() || !partnerId}>
            <Send className="h-4 w-4 mr-2" />Send
          </Button>
        </div>
      </div>
    </main>
  );
}
