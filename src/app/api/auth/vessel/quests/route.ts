// src/app/api/auth/vessel/quests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { readObjectives, type QuestWalk, type WalkAction } from '@/lib/quests/walk';

type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

const ACTIONS: readonly WalkAction[] = ['walk', 'set_down', 'tick', 'untick'];

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

async function open() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: fail('Authentication required', 401) };
  return { supabase, uid: user.id };
}

async function walksFor(supabase: Supabase, uid: string, questId?: string): Promise<QuestWalk[]> {
  let walks = supabase
    .from('vessel_quests')
    .select('quest_id, status, started_at, completed_at')
    .eq('user_id', uid);
  let steps = supabase
    .from('quest_progress')
    .select('quest_id, objective_key, objective_status')
    .eq('user_id', uid);
  if (questId) {
    walks = walks.eq('quest_id', questId);
    steps = steps.eq('quest_id', questId);
  }
  const [walkRes, stepRes] = await Promise.all([walks, steps]);
  if (walkRes.error) throw walkRes.error;
  if (stepRes.error) throw stepRes.error;

  const done = new Map<string, string[]>();
  for (const step of stepRes.data ?? []) {
    if (step.objective_status !== 'done') continue;
    const list = done.get(step.quest_id) ?? [];
    list.push(step.objective_key);
    done.set(step.quest_id, list);
  }
  return (walkRes.data ?? []).map((row) => ({ ...row, done: done.get(row.quest_id) ?? [] }));
}

async function questObjectives(supabase: Supabase, questId: string): Promise<string[] | null> {
  const { data, error } = await supabase
    .from('quests')
    .select('objectives')
    .eq('id', questId)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data ? readObjectives(data.objectives) : null;
}

async function setStatus(supabase: Supabase, uid: string, questId: string, status: string, completedAt: string | null) {
  const { error } = await supabase
    .from('vessel_quests')
    .update({ status, completed_at: completedAt })
    .eq('user_id', uid)
    .eq('quest_id', questId);
  if (error) throw error;
}

async function ensureWalking(supabase: Supabase, uid: string, questId: string) {
  const { data, error } = await supabase
    .from('vessel_quests')
    .select('status')
    .eq('user_id', uid)
    .eq('quest_id', questId)
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    const { error: insertError } = await supabase
      .from('vessel_quests')
      .insert({ user_id: uid, quest_id: questId, status: 'active', started_at: new Date().toISOString() });
    if (insertError) throw insertError;
  } else if (data.status !== 'active' && data.status !== 'completed') {
    await setStatus(supabase, uid, questId, 'active', null);
  }
}

export async function GET(request: NextRequest) {
  const opened = await open();
  if ('error' in opened) return opened.error;
  try {
    const questId = request.nextUrl.searchParams.get('quest_id') ?? undefined;
    const walks = await walksFor(opened.supabase, opened.uid, questId);
    return NextResponse.json({ success: true, data: walks });
  } catch (error) {
    console.error('Quest walk read error:', error);
    return fail('Failed to read the walk', 500);
  }
}

export async function POST(request: NextRequest) {
  const opened = await open();
  if ('error' in opened) return opened.error;
  const { supabase, uid } = opened;
  try {
    const body = (await request.json().catch(() => ({}))) as {
      quest_id?: unknown;
      action?: unknown;
      objective_key?: unknown;
    };
    const questId = typeof body.quest_id === 'string' ? body.quest_id : '';
    const action = ACTIONS.find((a) => a === body.action);
    const key = typeof body.objective_key === 'string' ? body.objective_key : '';
    if (!questId || !action) return fail('quest_id and action are required', 400);

    const objectives = await questObjectives(supabase, questId);
    if (!objectives) return fail('No such quest', 404);
    const now = new Date().toISOString();

    if (action === 'walk') {
      await ensureWalking(supabase, uid, questId);
    } else if (action === 'set_down') {
      await setStatus(supabase, uid, questId, 'set_down', null);
    } else {
      if (!objectives.includes(key)) return fail('No such objective', 400);
      if (action === 'tick') {
        await ensureWalking(supabase, uid, questId);
        const { error } = await supabase
          .from('quest_progress')
          .upsert(
            { user_id: uid, quest_id: questId, objective_key: key, objective_status: 'done', completed_at: now },
            { onConflict: 'quest_id,user_id,objective_key' }
          );
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('quest_progress')
          .update({ objective_status: 'pending', completed_at: null })
          .eq('user_id', uid)
          .eq('quest_id', questId)
          .eq('objective_key', key);
        if (error) throw error;
      }
      const [walk] = await walksFor(supabase, uid, questId);
      const allDone = objectives.every((o) => walk?.done.includes(o));
      if (allDone && walk?.status !== 'completed') await setStatus(supabase, uid, questId, 'completed', now);
      if (!allDone && walk?.status === 'completed') await setStatus(supabase, uid, questId, 'active', null);
    }

    const [walk] = await walksFor(supabase, uid, questId);
    return NextResponse.json({ success: true, data: walk ?? null });
  } catch (error) {
    console.error('Quest walk write error:', error);
    return fail('The step did not land', 500);
  }
}
