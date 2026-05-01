// src/components/asgard/domains/mnemosyne/patterns/PatternWeave.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Progress } from '@/components/runes/Progress';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, GitBranch, Zap, BookOpen, Clock } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface EnergyEntry { energy_level: number; created_at: string; }
interface JournalEntry { mood: string | null; created_at: string; }

export function PatternWeave() {
  const { user } = useAuth();
  const [energyEntries, setEnergyEntries] = useState<EnergyEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      fetch(`/api/generated/hestia-core/energy_logs?user_id=${user.id}&order=created_at.desc&limit=30`).then(r => r.json()),
      fetch(`/api/generated/hestia-core/journal_entries?user_id=${user.id}&order=created_at.desc&limit=30`).then(r => r.json()),
    ]).then(([energyRes, journalRes]) => {
      if (energyRes.success) setEnergyEntries(energyRes.data?.data || []);
      if (journalRes.success) setJournalEntries(journalRes.data?.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const patterns = useMemo(() => {
    const insights: { title: string; value: string; detail: string; icon: typeof Zap }[] = [];

    if (energyEntries.length >= 3) {
      const avg = energyEntries.reduce((s, e) => s + e.energy_level, 0) / energyEntries.length;
      const recent = energyEntries.slice(0, 5).reduce((s, e) => s + e.energy_level, 0) / Math.min(5, energyEntries.length);
      const trend = recent > avg + 0.5 ? 'rising' : recent < avg - 0.5 ? 'settling' : 'steady';
      insights.push({ title: 'Energy Rhythm', value: `${avg.toFixed(1)} / 10`, detail: `Your energy is ${trend}. Average over ${energyEntries.length} entries.`, icon: Zap });
    }

    if (journalEntries.length > 0) {
      const moodCounts: Record<string, number> = {};
      journalEntries.forEach(j => { if (j.mood) { moodCounts[j.mood] = (moodCounts[j.mood] || 0) + 1; } });
      const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
      if (topMood) {
        insights.push({ title: 'Dominant Mood', value: topMood[0], detail: `Appears in ${topMood[1]} of your last ${journalEntries.length} entries.`, icon: BookOpen });
      }
    }

    const hourCounts: Record<number, number> = {};
    energyEntries.forEach(e => { const h = new Date(e.created_at).getHours(); hourCounts[h] = (hourCounts[h] || 0) + 1; });
    const topHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
    if (topHour) {
      const ampm = parseInt(topHour[0]) >= 12 ? 'PM' : 'AM';
      const hour12 = parseInt(topHour[0]) % 12 || 12;
      insights.push({ title: 'Peak Logging Time', value: `${hour12} ${ampm}`, detail: `You most often log energy around ${hour12} ${ampm}.`, icon: Clock });
    }

    if (insights.length === 0) {
      insights.push({ title: 'Awaiting Data', value: '—', detail: 'Log energy and journal entries to reveal your patterns.', icon: GitBranch });
    }

    return insights;
  }, [energyEntries, journalEntries]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="space-y-4">{[1,2,3].map(i=><Skeleton key={i} variant="card" className="h-32" />)}</div></div></main>);
  if (!user) return (<main className="min-h-screen py-12"><div className="container max-w-2xl mx-auto px-6 text-center"><p className="text-star-dust/60">Sign in to discover your patterns.</p></div></main>);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Weave</h1>
        <p className="text-sm text-star-dust/40 mb-8">What the data whispers about your rhythm</p>

        <div className="space-y-4">
          {patterns.map((p, i) => {
            const cd: CardData = { id: `pattern-${i}`, type: 'stat', title: p.title, value: p.value };
            return (
              <Card key={i} data={cd} variant="glass" radius="lg" shadow="sm" className="p-6">
                <div className="flex items-center gap-3 mb-3"><p.icon className="h-5 w-5 text-neurospark" /><h3 className="text-lg font-semibold text-star-dust">{p.title}</h3></div>
                <div className="text-3xl font-bold text-neurospark mb-2">{p.value}</div>
                <p className="text-sm text-star-dust/50">{p.detail}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}