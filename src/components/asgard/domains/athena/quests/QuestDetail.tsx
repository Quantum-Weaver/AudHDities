// src/components/asgard/domains/athena/quests/QuestDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Award, Shield, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

interface Quest {
  id: string; title: string; description: string; house: string;
  is_active: boolean; sovereignty_reward: number | null;
  required_sovereignty_score: number | null; prerequisite_quest_id: string | null;
  submission_type: string; instructions: string | null;
}

const HOUSE_LABELS: Record<string, string> = {
  hearth_keeper: 'Hearth-Keeper', chancellor: 'Chancellor', seer: 'Seer',
  aethelred: 'Aethelred', curator: 'Curator', archivist: 'Archivist',
  skald: 'Skald', codex: 'Codex', executioner: 'Executioner',
};

export function QuestDetail() {
  const params = useParams();
  const router = useRouter();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/athena-gamification/quests/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setQuest(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

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

  const cardData: CardData = { id: quest.id, type: 'quest', title: quest.title, description: quest.description };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/quests" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Path
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge variant="outline" size="sm" className="text-[10px] mb-2">{HOUSE_LABELS[quest.house] || quest.house}</Badge>
              <h1 className="text-2xl font-bold text-star-dust">{quest.title}</h1>
            </div>
            {quest.sovereignty_reward && (
              <div className="text-center">
                <Award className="h-6 w-6 text-neurospark mx-auto mb-1" />
                <span className="text-neurospark font-bold text-lg">+{quest.sovereignty_reward}</span>
                <p className="text-[10px] text-star-dust/40">sovereignty</p>
              </div>
            )}
          </div>

          <p className="text-star-dust/70 leading-relaxed mb-6">{quest.description}</p>

          {quest.instructions && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium text-star-dust/60 mb-2">Instructions</h3>
              <p className="text-star-dust/70 text-sm whitespace-pre-wrap">{quest.instructions}</p>
            </div>
          )}

          <div className="flex items-center gap-4 flex-wrap mb-6">
            <Badge variant="outline" size="sm" className="text-[10px] capitalize">{quest.submission_type?.replace(/_/g, ' ')}</Badge>
            {quest.required_sovereignty_score && (
              <div className="flex items-center gap-1 text-xs text-star-dust/40">
                <Shield size={12} />Requires {quest.required_sovereignty_score} sovereignty
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="primary" size="md">{quest.is_active ? 'Begin Quest' : 'Coming Soon'}</Button>
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}