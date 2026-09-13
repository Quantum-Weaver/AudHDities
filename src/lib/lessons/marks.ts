// src/lib/lessons/marks.ts
import type { AwardedSigil } from '@/lib/sigils/earned';

export type MarkAction = 'mark' | 'unmark';

export interface LessonMark {
  lesson_id: string;
  status: string;
  completed_at: string | null;
}

export interface MarksRead {
  marks: LessonMark[];
  ready: boolean;
}

export function isRead(mark: LessonMark | undefined | null): boolean {
  return mark?.status === 'completed';
}

export function readIds(marks: readonly LessonMark[]): Set<string> {
  return new Set(marks.filter(isRead).map((m) => m.lesson_id));
}

export async function readMarks(lessonId?: string): Promise<MarksRead | null> {
  const query = lessonId ? `?lesson_id=${encodeURIComponent(lessonId)}` : '';
  const res = await fetch(`/api/auth/vessel/lessons${query}`)
    .then((r) => r.json())
    .catch(() => null);
  if (!res?.success || !Array.isArray(res.data)) return null;
  return { marks: res.data as LessonMark[], ready: res.ready !== false };
}

export async function actOnMark(
  lessonId: string,
  action: MarkAction
): Promise<{ ok: boolean; mark: LessonMark | null; sigils: AwardedSigil[] }> {
  const res = await fetch('/api/auth/vessel/lessons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lesson_id: lessonId, action }),
  })
    .then((r) => r.json())
    .catch(() => null);
  if (!res?.success) return { ok: false, mark: null, sigils: [] };
  return {
    ok: true,
    mark: (res.data as LessonMark | null) ?? null,
    sigils: Array.isArray(res.sigils) ? (res.sigils as AwardedSigil[]) : [],
  };
}
