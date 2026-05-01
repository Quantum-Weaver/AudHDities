// src/components/asgard/domains/mnemosyne/constellations/GrandPattern.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Telescope, Users, Package, Award, HandCoins, Star } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface StatCard { label: string; value: number; icon: typeof Users; color: string; }

export function GrandPattern() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/generated/hestia-core/profiles?limit=1').then(r => r.json()),
      fetch('/api/generated/plutus-economics/products?is_published=true&active=true&limit=1').then(r => r.json()),
      fetch('/api/generated/athena-gamification/badges?is_active=true&limit=1').then(r => r.json()),
      fetch('/api/generated/plutus-economics/contributions?limit=1').then(r => r.json()),
    ]).then(([profilesRes, productsRes, badgesRes, contribRes]) => {
      const s: StatCard[] = [];
      if (profilesRes.success) s.push({ label: 'Sovereign Souls', value: profilesRes.data?.pagination?.total || 0, icon: Users, color: 'text-neurospark' });
      if (productsRes.success) s.push({ label: 'Creations Woven', value: productsRes.data?.pagination?.total || 0, icon: Package, color: 'text-purple-400' });
      if (badgesRes.success) s.push({ label: 'Honors Earned', value: badgesRes.data?.pagination?.total || 0, icon: Award, color: 'text-amber-400' });
      if (contribRes.success) s.push({ label: 'Contributions Made', value: contribRes.data?.pagination?.total || 0, icon: HandCoins, color: 'text-emerald-400' });
      setStats(s);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-4xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid grid-cols-2 gap-6">{[1,2,3,4].map(i=><Skeleton key={i} variant="card" className="h-32" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Grand Pattern</h1>
        <p className="text-sm text-star-dust/40 mb-8">How all threads of the Sanctuary weave together</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {stats.map(s => {
            const cd: CardData = { id: s.label, type: 'stat', title: s.label, value: s.value };
            return (
              <Card key={s.label} data={cd} variant="glass" radius="lg" shadow="sm" className="p-6 text-center">
                <s.icon className={`h-8 w-8 ${s.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-star-dust mb-1">{s.value.toLocaleString()}</div>
                <p className="text-sm text-star-dust/40">{s.label}</p>
              </Card>
            );
          })}
        </div>

        <Card data={{ id: 'pattern-note', type: 'value', title: 'The Weave Grows', value: '' }} variant="sanctuary" radius="lg" shadow="md" className="p-8 text-center">
          <Telescope className="h-10 w-10 text-neurospark mx-auto mb-4" />
          <p className="text-star-dust/70 max-w-md mx-auto">
            Every creation, every contribution, every honor earned — each is a star in the Sanctuary's sky.
            Together they form constellations that guide all who seek sovereignty.
          </p>
          <p className="text-xs text-star-dust/30 mt-4">The Grand Pattern updates as the Sanctuary grows.</p>
        </Card>
      </div>
    </main>
  );
}