// src/components/asgard/domains/athena/quests/QuestDetail.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestsList } from '@/hooks/generated/athena-gamification/quests';
import type { CardData } from '@/types/components/runes/card.types';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  master: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// objectives is Json in the evolved table; render only the shape we can
// honestly show (an array of strings) — anything richer waits for row 10.
function readObjectives(objectives: unknown): string[] {
  if (!Array.isArray(objectives)) return [];
  return objectives.filter((o): o is string => typeof o === 'string');
}

export function QuestDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { data: quests, loading } = useQuestsList({ filters: { slug }, limit: 1 });
  const quest = quests[0] ?? null;

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="text" className="h-10 w-64 mb-6" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!quest) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Compass className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This quest has not been written yet.</p>
          <Link href="/library/quests" className="text-neurospark hover:underline mt-4 inline-block">Return to the Path</Link>
        </div>
      </main>
    );
  }

  const objectives = readObjectives(quest.objectives);
  const cardData: CardData = { id: quest.id, type: 'quest', title: quest.name, description: quest.description || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/quests" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Path
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4">
            {quest.quest_type && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">{quest.quest_type.replace(/_/g, ' ')}</Badge>
            )}
            {quest.difficulty && (
              <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', DIFFICULTY_COLORS[quest.difficulty] || '')}>{quest.difficulty}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-4">{quest.name}</h1>
          <p className="text-star-dust/70 leading-relaxed mb-6">{quest.description}</p>

          {objectives.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium text-star-dust/60 mb-2">Objectives</h3>
              <ul className="space-y-1">
                {objectives.map((o, i) => (
                  <li key={i} className="text-star-dust/70 text-sm">• {o}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="primary" size="md">Begin Quest</Button>
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
