// src/components/asgard/domains/iris/emeralds/EmeraldsHistory.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Heart, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Emerald {
  emeralds_id: string;
  giver_id: string;
  receiver_id: string;
  amount: number;
  message: string | null;
  created_at: string;
  giver_name?: string;
  post_title?: string;
}

export function EmeraldsHistory() {
  const { user } = useAuth();
  const [given, setGiven] = useState<Emerald[]>([]);
  const [received, setReceived] = useState<Emerald[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      fetch(`/api/generated/hermes-social/emeralds?giver_id=${user.id}&order=created_at.desc&limit=20`).then(r => r.json()),
      fetch(`/api/generated/hermes-social/emeralds?receiver_id=${user.id}&order=created_at.desc&limit=20`).then(r => r.json()),
    ]).then(([givenResult, receivedResult]) => {
      if (givenResult.success) setGiven(givenResult.data?.data || []);
      if (receivedResult.success) setReceived(receivedResult.data?.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const totalGiven = given.reduce((sum, e) => sum + e.amount, 0);
  const totalReceived = received.reduce((sum, e) => sum + e.amount, 0);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="space-y-3">
            {[1,2,3,4].map((i) => (<Skeleton key={i} variant="card" className="h-16" />))}
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Bridge
            </Link>
          </div>
          <p className="text-star-dust/60 text-center">Sign in to view your emeralds.</p>
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
          <h1 className="text-2xl font-bold text-star-dust">Emeralds</h1>
          <p className="text-sm text-star-dust/40 mt-1">Every emerald is a spark of appreciation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card data={{ id: 'emeralds-given', type: 'stat', title: 'Given', value: totalGiven.toString() }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-emerald-400 font-bold text-xl">{totalGiven}</p>
            <p className="text-xs text-star-dust/40">Emeralds Given</p>
          </Card>
          <Card data={{ id: 'emeralds-received', type: 'stat', title: 'Received', value: totalReceived.toString() }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <TrendingDown className="h-5 w-5 text-neurospark mx-auto mb-1" />
            <p className="text-neurospark font-bold text-xl">{totalReceived}</p>
            <p className="text-xs text-star-dust/40">Emeralds Received</p>
          </Card>
        </div>

        {/* Received */}
        <h2 className="text-lg font-semibold text-star-dust mb-4 flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-400" />Received
        </h2>
        {received.length === 0 ? (
          <p className="text-star-dust/40 text-sm mb-8">No emeralds received yet.</p>
        ) : (
          <div className="space-y-2 mb-8">
            {received.map((e) => {
              const cardData: CardData = { id: e.emeralds_id, type: 'value', title: e.message || 'Emerald', value: `${e.amount}` };
              return (
                <Card key={e.emeralds_id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-3">
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-rose-400" />
                    <span className="text-neurospark font-bold">+{e.amount}</span>
                    <span className="text-xs text-star-dust/40">{e.message || 'Emerald received'}</span>
                    <span className="ml-auto text-[10px] text-star-dust/30">{formatDate(e.created_at)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Given */}
        <h2 className="text-lg font-semibold text-star-dust mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />Given
        </h2>
        {given.length === 0 ? (
          <p className="text-star-dust/40 text-sm">No emeralds given yet.</p>
        ) : (
          <div className="space-y-2">
            {given.map((e) => {
              const cardData: CardData = { id: e.emeralds_id, type: 'value', title: e.message || 'Emerald', value: `${e.amount}` };
              return (
                <Card key={e.emeralds_id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 font-bold">-{e.amount}</span>
                    <span className="text-xs text-star-dust/40">{e.message || 'Emerald given'}</span>
                    <span className="ml-auto text-[10px] text-star-dust/30">{formatDate(e.created_at)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}