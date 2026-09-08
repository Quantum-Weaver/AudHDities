// src/components/asgard/domains/athena/quests/QuestDetail.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Check, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuestsList } from '@/lib/generated/hooks/athena-gamification/quests';
import { actOnWalk, readObjectives, readWalks, WALK_WORDS, type QuestWalk, type WalkAction } from '@/lib/quests/walk';
import type { CardData } from '@/types/components/runes/card.types';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-fire-base/20 text-fire-light border-fire-base/30',
  master: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const OBJECTIVE_DOORS: Record<string, string> = {
  'Visit the Path': '/library/quests',
  'Visit the Curriculum': '/library/courses',
  'Visit the Lessons': '/library/lessons',
  'Visit the Archive': '/library/knowledge',
  'Visit the Honors': '/library/sigils',
  'Visit the Floating Stars': '/library/bubbles',
  'Open the Archive': '/library/knowledge',
  'Open the Floating Stars': '/library/bubbles',
  'Open your journal': '/vessel/journal',
};

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

type WalkState = 'idle' | 'loading' | 'ready' | 'unread';

export function QuestDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // The generated hooks refetch on params identity; memoized on the slug.
  const questParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: quests, loading } = useQuestsList(questParams);
  const quest = quests[0] ?? null;
  const questId = quest?.id ?? null;

  const [read, setRead] = useState<{ key: string; walk: QuestWalk | null } | null>(null);
  const [walled, setWalled] = useState<{ key: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const readKey = user && questId ? `${user.id}:${questId}:${attempt}` : null;

  useEffect(() => {
    if (!user || !questId) return;
    const key = `${user.id}:${questId}:${attempt}`;
    let alive = true;
    readWalks(questId).then((rows) => {
      if (!alive) return;
      if (!rows) { setWalled({ key }); return; }
      setRead({ key, walk: rows[0] ?? null });
    });
    return () => { alive = false; };
  }, [user, questId, attempt]);

  const walkState: WalkState = !readKey
    ? 'idle'
    : walled?.key === readKey
      ? 'unread'
      : read?.key === readKey
        ? 'ready'
        : 'loading';
  const walk = walkState === 'ready' && read ? read.walk : null;

  const act = useCallback(async (action: WalkAction, objectiveKey?: string) => {
    if (!questId || !readKey) return;
    setBusy(objectiveKey ?? action);
    setNote(null);
    const result = await actOnWalk(questId, action, objectiveKey);
    if (result.ok) setRead({ key: readKey, walk: result.walk });
    else setNote('That step did not land. It is safe to try again.');
    setBusy(null);
  }, [questId, readKey]);

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
  const walking = !!user && walkState === 'ready' && !!walk && walk.status !== 'set_down';
  const done = new Set(walk?.done ?? []);
  const word = walking && walk ? WALK_WORDS[walk.status] : undefined;

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/library/quests" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Path
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {quest.quest_type && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">{quest.quest_type.replace(/_/g, ' ')}</Badge>
            )}
            {quest.difficulty && (
              <Badge variant="outline" size="sm" className={cn('text-[10px] capitalize', DIFFICULTY_COLORS[quest.difficulty] || '')}>{quest.difficulty}</Badge>
            )}
            {word && (
              <Badge variant="outline" size="sm" className="text-[10px] text-neurospark border-neurospark/40">{word}</Badge>
            )}
          </div>

          <h1 className="text-2xl font-bold text-star-dust mb-4">{quest.name}</h1>
          <p className="text-star-dust/70 leading-relaxed mb-6">{quest.description}</p>

          {objectives.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium text-star-dust/60 mb-2">Objectives</h3>
              <ul className="space-y-2">
                {objectives.map((o, i) => {
                  const door = OBJECTIVE_DOORS[o];
                  const isDone = walking && done.has(o);
                  const text = door ? (
                    <Link
                      href={door}
                      className={cn('rounded underline decoration-star-dust/30 underline-offset-2 hover:text-neurospark hover:decoration-neurospark', FOCUS)}
                    >
                      {o}
                    </Link>
                  ) : o;
                  return (
                    <li key={i} className={cn('flex items-start gap-2 text-sm', isDone ? 'text-star-dust/50' : 'text-star-dust/70')}>
                      {walking ? (
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={isDone}
                          aria-label={o}
                          disabled={busy === o}
                          onClick={() => act(isDone ? 'untick' : 'tick', o)}
                          className={cn(
                            'mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors motion-reduce:transition-none disabled:opacity-50',
                            isDone ? 'border-neurospark bg-neurospark/30 text-neurospark' : 'border-star-dust/30 hover:border-star-dust/60',
                            FOCUS
                          )}
                        >
                          {isDone && <Check size={12} aria-hidden="true" />}
                        </button>
                      ) : (
                        <span aria-hidden="true">•</span>
                      )}
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
            {user && walkState === 'ready' && !walking && (
              <Button variant="outline" size="md" disabled={busy === 'walk'} onClick={() => act('walk')}>Walk this quest</Button>
            )}
            {walking && (
              <Button variant="ghost" size="md" disabled={busy === 'set_down'} onClick={() => act('set_down')}>Set it down</Button>
            )}
          </div>

          {walking && walk?.status === 'completed' && (
            <p className="mt-4 text-sm text-star-dust/70">Walked. It stays walked whether or not you return to it.</p>
          )}
          {note && <p role="status" className="mt-4 text-sm text-star-dust/70">{note}</p>}
          {user && walkState === 'unread' && (
            <p role="status" className="mt-4 text-sm text-star-dust/70">
              Your walk could not be read just now.{' '}
              <button type="button" onClick={() => setAttempt((n) => n + 1)} className={cn('rounded underline underline-offset-2 hover:text-star-dust', FOCUS)}>
                Try again
              </button>
            </p>
          )}
        </Card>
      </div>
    </main>
  );
}
