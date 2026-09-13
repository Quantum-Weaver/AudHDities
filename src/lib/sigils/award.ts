// src/lib/sigils/award.ts
import type { createServerSupabase } from '@/lib/supabase/server';
import { readLessonIds } from '@/lib/lessons/store';
import { heraldAndDeliver } from '@/lib/heralds/dispatch';
import { HERALD_TYPE } from '@/lib/heralds/write';
import type { AwardedSigil } from './earned';

type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

export const SIGIL_TRIGGERS = [
  'quest_completed',
  'bubble_popped',
  'lesson_completed',
  'path_completed',
] as const;

export type SigilTrigger = (typeof SIGIL_TRIGGERS)[number];

interface Rule {
  id: string;
  sigil_id: string;
  trigger_type: string;
  trigger_entity: string | null;
  trigger_value: number | null;
}

interface Held {
  ids: Set<string>;
  slugs: Set<string>;
}

const NONE: Held = { ids: new Set(), slugs: new Set() };
const SHELF = 500;
const PATH_CHUNK = 50;
const STEP_PAGE = 200;
const STEP_PAGES = 25;

function isTrigger(value: string): value is SigilTrigger {
  return (SIGIL_TRIGGERS as readonly string[]).includes(value);
}

function held(ids: Set<string>, named: Array<{ slug: string }> | null): Held {
  return { ids, slugs: new Set((named ?? []).map((row) => row.slug)) };
}

// A rule names one entity by slug or id, or a count of any of its kind.
function satisfied(rule: Rule, kind: Held): boolean {
  if (rule.trigger_entity) return kind.ids.has(rule.trigger_entity) || kind.slugs.has(rule.trigger_entity);
  return kind.ids.size >= Math.max(1, rule.trigger_value ?? 1);
}

async function heldQuests(supabase: Supabase, uid: string): Promise<Held> {
  const { data } = await supabase
    .from('vessel_quests')
    .select('quest_id')
    .eq('user_id', uid)
    .eq('status', 'completed')
    .limit(SHELF);
  const ids = new Set((data ?? []).map((row) => row.quest_id));
  if (ids.size === 0) return NONE;
  const named = await supabase.from('quests').select('slug').in('id', Array.from(ids));
  return held(ids, named.data);
}

async function heldBubbles(supabase: Supabase, uid: string): Promise<Held> {
  const { data } = await supabase.from('vessel_bubbles').select('bubble_id').eq('user_id', uid).limit(SHELF);
  const ids = new Set((data ?? []).map((row) => row.bubble_id));
  if (ids.size === 0) return NONE;
  const named = await supabase.from('bubbles').select('slug').in('id', Array.from(ids));
  return held(ids, named.data);
}

async function heldLessons(supabase: Supabase, ids: Set<string>): Promise<Held> {
  if (ids.size === 0) return NONE;
  const named = await supabase.from('lessons').select('slug').in('id', Array.from(ids));
  return held(ids, named.data);
}

// Every required step of the named paths, page by page; null when the read is partial.
async function requiredSteps(supabase: Supabase, pathIds: string[]): Promise<Map<string, string[]> | null> {
  const required = new Map<string, string[]>();
  for (let start = 0; start < pathIds.length; start += PATH_CHUNK) {
    const chunk = pathIds.slice(start, start + PATH_CHUNK);
    for (let page = 0; page < STEP_PAGES; page++) {
      const from = page * STEP_PAGE;
      const { data, error } = await supabase
        .from('path_lessons')
        .select('path_id, lesson_id, is_required')
        .in('path_id', chunk)
        .order('path_id', { ascending: true })
        .order('lesson_id', { ascending: true })
        .range(from, from + STEP_PAGE - 1);
      if (error) return null;
      const rows = data ?? [];
      for (const step of rows) {
        if (!step.is_required) continue;
        const list = required.get(step.path_id) ?? [];
        list.push(step.lesson_id);
        required.set(step.path_id, list);
      }
      if (rows.length < STEP_PAGE) break;
      if (page === STEP_PAGES - 1) return null;
    }
  }
  return required;
}

// A path is held when every lesson its path_lessons marks required is read; a
// partial read of the steps holds nothing.
async function heldPaths(supabase: Supabase, lessonIds: Set<string>): Promise<Held> {
  if (lessonIds.size === 0) return NONE;

  const pathRes = await supabase
    .from('learning_paths')
    .select('id, slug')
    .eq('status', 'published')
    .limit(SHELF);
  if (pathRes.error) return NONE;
  const paths = pathRes.data ?? [];
  if (paths.length === 0) return NONE;

  const required = await requiredSteps(supabase, paths.map((path) => path.id));
  if (!required) return NONE;

  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const path of paths) {
    const steps = required.get(path.id);
    if (!steps || steps.length === 0) continue;
    if (!steps.every((lessonId) => lessonIds.has(lessonId))) continue;
    ids.add(path.id);
    slugs.add(path.slug);
  }
  return { ids, slugs };
}

/** Reads every published unlock rule and writes the vessel_sigils rows it earns. */
export async function awardSigils(supabase: Supabase, uid: string): Promise<AwardedSigil[]> {
  const ruleRes = await supabase
    .from('sigil_unlocks')
    .select('id, sigil_id, trigger_type, trigger_entity, trigger_value')
    .eq('status', 'published')
    .limit(SHELF);
  if (ruleRes.error) return [];

  const rules: Rule[] = (ruleRes.data ?? []).filter((rule) => isTrigger(rule.trigger_type));
  if (rules.length === 0) return [];

  const heldRes = await supabase.from('vessel_sigils').select('sigil_id').eq('user_id', uid).limit(SHELF);
  if (heldRes.error) return [];
  const heldSigils = new Set((heldRes.data ?? []).map((row) => row.sigil_id));

  const open = rules.filter((rule) => !heldSigils.has(rule.sigil_id));
  if (open.length === 0) return [];

  const kinds = new Set(open.map((rule) => rule.trigger_type));
  const needsLessons = kinds.has('lesson_completed') || kinds.has('path_completed');
  const lessonIds = needsLessons ? await readLessonIds(supabase, uid) : new Set<string>();

  const [quests, bubbles, lessons, paths] = await Promise.all([
    kinds.has('quest_completed') ? heldQuests(supabase, uid) : NONE,
    kinds.has('bubble_popped') ? heldBubbles(supabase, uid) : NONE,
    kinds.has('lesson_completed') ? heldLessons(supabase, lessonIds) : NONE,
    kinds.has('path_completed') ? heldPaths(supabase, lessonIds) : NONE,
  ]);

  const byKind: Record<SigilTrigger, Held> = {
    quest_completed: quests,
    bubble_popped: bubbles,
    lesson_completed: lessons,
    path_completed: paths,
  };

  const earned = new Map<string, AwardedSigil>();
  const rows: Array<{ user_id: string; sigil_id: string; award_context: Record<string, string> }> = [];
  for (const rule of open) {
    const trigger = rule.trigger_type as SigilTrigger;
    if (!satisfied(rule, byKind[trigger])) continue;
    if (earned.has(rule.sigil_id)) continue;
    earned.set(rule.sigil_id, { sigil_id: rule.sigil_id, trigger_type: trigger });
    rows.push({
      user_id: uid,
      sigil_id: rule.sigil_id,
      award_context: { unlock_id: rule.id, trigger_type: trigger },
    });
  }
  if (rows.length === 0) return [];

  const { error } = await supabase.from('vessel_sigils').insert(rows);
  if (error) return [];

  await tellSigilsEarned(supabase, uid, Array.from(earned.keys()));
  return Array.from(earned.values());
}

/** One herald for each sigil a vessel has just been given. */
async function tellSigilsEarned(supabase: Supabase, uid: string, sigilIds: string[]) {
  const { data: named } = await supabase.from('sigils').select('id, name').in('id', sigilIds);
  const nameById = new Map((named ?? []).map((row) => [row.id, row.name]));
  const { data: session } = await supabase.auth.getUser();
  const email = session.user?.id === uid ? session.user?.email ?? null : null;

  for (const sigilId of sigilIds) {
    const name = nameById.get(sigilId) ?? 'a new sigil';
    await heraldAndDeliver(
      supabase,
      {
        recipient: uid,
        type: HERALD_TYPE.BADGE_EARNED,
        title: `Sigil earned: ${name}`,
        body: `${name} is yours, and stands in your observatory.`,
        referenceTable: 'vessel_sigils',
        referenceId: sigilId,
      },
      { email },
    );
  }
}
