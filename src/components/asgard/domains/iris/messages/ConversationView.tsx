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
import { ArrowLeft, Send } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Message {
  messages_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export function ConversationView() {
  const params = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/iris-communications/messages?thread_id=${params.id}&order=created_at.asc`)
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setMessages(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || sending) return;
    setSending(true);
    try {
      const response = await fetch('/api/generated/iris-communications/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: user.id,
          recipient_id: user.id,
          content: newMessage.trim(),
          thread_id: params.id,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setMessages((prev) => [...prev, result.data]);
        setNewMessage('');
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

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 py-3 px-6">
        <div className="container max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/connect/messages" className="text-star-dust/60 hover:text-star-dust">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Avatar size="sm"><AvatarFallback>S</AvatarFallback></Avatar>
          <span className="text-star-dust font-medium">Sanctuary Soul</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="container max-w-3xl mx-auto px-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-star-dust/40">No messages yet. Say hello.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === user?.id;
              const cardData: CardData = { id: msg.messages_id, type: 'value', title: '', value: msg.content };
              return (
                <div key={msg.messages_id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${isMine ? 'order-1' : 'order-1'}`}>
                    <Card data={cardData} variant={isMine ? 'quantum' : 'glass'} radius="lg" shadow="sm" className="p-3">
                      <p className="text-sm text-star-dust">{msg.content}</p>
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

      {/* Input */}
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
          <Button variant="primary" size="md" onClick={handleSend} loading={sending} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}