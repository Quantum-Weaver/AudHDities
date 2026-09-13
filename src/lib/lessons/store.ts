// src/lib/lessons/store.ts
import type { createServerSupabase } from '@/lib/supabase/server';
import type { LessonMark } from './marks';

type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

const TABLE = 'vessel_lessons';
const COLUMNS = 'lesson_id, status, completed_at';
const CONFLICT = 'user_id,lesson_id';

// The codes PostgREST and Postgres answer with when the relation is absent.
const ABSENT = new Set(['PGRST106', 'PGRST205', '42P01']);

interface Fault {
  code?: string;
  message?: string;
}

interface Answer<T> {
  data: T | null;
  error: Fault | null;
}

interface MarkQuery extends PromiseLike<Answer<LessonMark[]>> {
  eq(column: string, value: string): MarkQuery;
}

interface MarkTable {
  select(columns: string): MarkQuery;
  upsert(row: Record<string, unknown>, options: { onConflict: string }): PromiseLike<Answer<unknown>>;
}

// A narrow surface over the marks table, which the generated types do not carry.
interface MarkStore {
  from(table: string): MarkTable;
}

export interface StoreRead {
  marks: LessonMark[];
  ok: boolean;
  ready: boolean;
}

export interface StoreWrite {
  ok: boolean;
  ready: boolean;
}

function absent(error: Fault): boolean {
  return ABSENT.has(error.code ?? '');
}

export async function readMarks(supabase: Supabase, uid: string, lessonId?: string): Promise<StoreRead> {
  const store = supabase as unknown as MarkStore;
  let query = store.from(TABLE).select(COLUMNS).eq('user_id', uid);
  if (lessonId) query = query.eq('lesson_id', lessonId);
  const { data, error } = await query;
  if (error) return { marks: [], ok: false, ready: !absent(error) };
  return { marks: data ?? [], ok: true, ready: true };
}

export async function setMark(
  supabase: Supabase,
  uid: string,
  lessonId: string,
  done: boolean
): Promise<StoreWrite> {
  const store = supabase as unknown as MarkStore;
  const { error } = await store.from(TABLE).upsert(
    {
      user_id: uid,
      lesson_id: lessonId,
      status: done ? 'completed' : 'reading',
      completed_at: done ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: CONFLICT }
  );
  if (error) return { ok: false, ready: !absent(error) };
  return { ok: true, ready: true };
}

export async function readLessonIds(supabase: Supabase, uid: string): Promise<Set<string>> {
  const { marks } = await readMarks(supabase, uid);
  return new Set(marks.filter((m) => m.status === 'completed').map((m) => m.lesson_id));
}
