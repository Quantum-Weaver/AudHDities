// src/components/asgard/domains/mnemosyne/prophecy/ProphecyVision.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, tierLight } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Star, Award, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

interface Quest { quests_id: string; title: string; description: string; house: string; sovereignty_reward: number | null; }
interface BadgeItem { badges_id: string; name: string; slug: string; rarity: string; description: string; }

const HOUSE_LABELS: Record<string, string> = {
  hearth_keeper: 'Hearth-Keeper', chancellor: 'Chancellor', seer: 'Seer', aethelred: 'Aethelred',
  curator: 'Curator', archivist: 'Archivist', skald: 'Skald', codex: 'Codex', executioner: 'Executioner',
};

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400', rare: 'bg-cyan-500/20 text-cyan-400',
  epic: 'bg-purple-500/20 text-purple-400', legendary: 'bg-amber-500/20 text-amber-400', mythic: 'bg-rose-500/20 text-rose-400',
};

export function ProphecyVision() {
  const { user, profile, sovereignTier } = useUser();
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [unearnedBadges, setUnearnedBadges] = useState<BadgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/generated/athena-gamification/quests?is_active=true&order=title.asc').then(r => r.json()),
      fetch('/api/generated/athena-gamification/badges?is_active=true&order=name.asc').then(r => r.json()),
    ]).then(([qRes, bRes]) => {
      if (qRes.success) setAvailableQuests(qRes.data?.data || []);
      if (bRes.success) setUnearnedBadges(bRes.data?.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const sovereigntyScore = tierLight(sovereignTier);
  const nextMilestone = sovereigntyScore < 200 ? 200 : sovereigntyScore < 500 ? 500 : sovereigntyScore < 800 ? 800 : 1000;
  const progressToNext = sovereigntyScore >= 1000 ? 100 : Math.round((sovereigntyScore / nextMilestone) * 100);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="space-y-4">{[1,2,3].map(i=><Skeleton key={i} variant="card" className="h-24" />)}</div></div></main>);

  const questCd: CardData = { id: 'prophecy-quests', type: 'value', title: 'Available Quests', value: String(availableQuests.length) };
  const badgeCd: CardData = { id: 'prophecy-badges', type: 'value', title: 'Honors to Earn', value: String(unearnedBadges.slice(0, 6).length) };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Vision</h1>
        <p className="text-sm text-star-dust/40 mb-8">What awaits the sovereign — quests to complete, honors to earn</p>

        {/* Next Milestone */}
        {sovereigntyScore < 1000 && (
          <Card data={{ id: 'milestone', type: 'stat', title: 'Next Sovereign Milestone', value: nextMilestone, target: '1000' }} variant="quantum" radius="lg" shadow="md" className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-3"><Star className="h-5 w-5 text-neurospark" /><h3 className="text-lg font-semibold text-star-dust">Next Milestone</h3></div>
            <div className="text-3xl font-bold text-neurospark mb-2">{nextMilestone}</div>
            <Progress value={progressToNext} max={100} variant="default" size="sm" />
            <p className="text-xs text-star-dust/40 mt-2">{sovereigntyScore} / {nextMilestone} — {nextMilestone - sovereigntyScore} to go</p>
          </Card>
        )}

        {/* Quests */}
        <Card data={questCd} variant="glass" radius="lg" shadow="sm" className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4"><Compass className="h-5 w-5 text-amber-400" /><h3 className="text-lg font-semibold text-star-dust">Available Quests</h3></div>
          <div className="space-y-2">
            {availableQuests.slice(0, 5).map(q => (
              <Link key={q.quests_id} href={`/library/quests/${q.quests_id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div><p className="text-sm text-star-dust font-medium">{q.title}</p><p className="text-xs text-star-dust/40">{HOUSE_LABELS[q.house] || q.house}</p></div>
                  {q.sovereignty_reward && <Badge variant="outline" size="sm" className="text-[10px]">+{q.sovereignty_reward}</Badge>}
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Badges */}
        <Card data={badgeCd} variant="glass" radius="lg" shadow="sm" className="p-6">
          <div className="flex items-center gap-3 mb-4"><Award className="h-5 w-5 text-purple-400" /><h3 className="text-lg font-semibold text-star-dust">Honors to Earn</h3></div>
          <div className="flex flex-wrap gap-2">
            {unearnedBadges.slice(0, 8).map(b => (
              <Link key={b.badges_id} href={`/library/badges/${b.slug}`}>
                <Badge variant="outline" size="sm" className={cn('text-[10px] cursor-pointer', RARITY_COLORS[b.rarity] || '')}>{b.name}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}