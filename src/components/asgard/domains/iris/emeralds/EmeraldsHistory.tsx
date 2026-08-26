// src/components/asgard/domains/iris/emeralds/EmeraldsHistory.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface Resonance {
  id: string;
  user_id: string;
  resonance_type: string;
  signal_id: string | null;
  work_id: string | null;
  notes: string | null;
  created_at: string;
}

export function EmeraldsHistory() {
  const { user } = useAuth();
  const [given, setGiven] = useState<Resonance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/generated/mnemosyne-assessment/resonance?user_id=${user.id}&order=created_at.desc&limit=20`)
      .then(r => r.json())
      .then(result => { if (result.success) setGiven(result.data?.data || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const totalGiven = given.length;

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
            <Sparkles className="h-5 w-5 text-amber-400 mx-auto mb-1" />
            <p className="text-amber-400 font-bold text-xl">{totalGiven}</p>
            <p className="text-xs text-star-dust/40">Sparks Given</p>
          </Card>
          <Card data={{ id: 'emeralds-received', type: 'stat', title: 'Received', value: '—' }}
            variant="glass" radius="lg" shadow="sm" className="p-4 text-center">
            <Heart className="h-5 w-5 text-rose-400 mx-auto mb-1" />
            <p className="text-rose-400/60 font-bold text-xl">—</p>
            <p className="text-xs text-star-dust/40">Sparks Received</p>
          </Card>
        </div>

        {/* Received */}
        <h2 className="text-lg font-semibold text-star-dust mb-4 flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-400" />Received
        </h2>
        <p className="text-star-dust/40 text-sm mb-8">
          The record of sparks others have given you awaits a proper endpoint — not shown yet.
        </p>

        {/* Given */}
        <h2 className="text-lg font-semibold text-star-dust mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />Given
        </h2>
        {given.length === 0 ? (
          <p className="text-star-dust/40 text-sm">No sparks given yet.</p>
        ) : (
          <div className="space-y-2">
            {given.map((r) => {
              const cardData: CardData = { id: r.id, type: 'value', title: r.notes || r.resonance_type, value: r.resonance_type };
              return (
                <Card key={r.id} data={cardData} variant="glass" radius="md" shadow="sm" className="p-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wide">{r.resonance_type}</span>
                    <span className="text-xs text-star-dust/40">{r.notes || 'A spark given'}</span>
                    <span className="ml-auto text-[10px] text-star-dust/30">{formatDate(r.created_at)}</span>
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
