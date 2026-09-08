// src/lib/quests/walk.ts

export type WalkAction = 'walk' | 'set_down' | 'tick' | 'untick';

export interface QuestWalk {
  quest_id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
  done: string[];
}

export const WALK_WORDS: Record<string, string> = {
  active: 'walking',
  completed: 'walked',
};

// Only string entries of the objectives Json are walkable.
export function readObjectives(objectives: unknown): string[] {
  if (!Array.isArray(objectives)) return [];
  return objectives.filter((o): o is string => typeof o === 'string');
}

export async function readWalks(questId?: string): Promise<QuestWalk[] | null> {
  const query = questId ? `?quest_id=${encodeURIComponent(questId)}` : '';
  const res = await fetch(`/api/auth/vessel/quests${query}`)
    .then((r) => r.json())
    .catch(() => null);
  return res?.success && Array.isArray(res.data) ? (res.data as QuestWalk[]) : null;
}

export async function actOnWalk(
  questId: string,
  action: WalkAction,
  objectiveKey?: string
): Promise<{ ok: boolean; walk: QuestWalk | null }> {
  const res = await fetch('/api/auth/vessel/quests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quest_id: questId, action, objective_key: objectiveKey }),
  })
    .then((r) => r.json())
    .catch(() => null);
  return res?.success ? { ok: true, walk: (res.data as QuestWalk | null) ?? null } : { ok: false, walk: null };
}
