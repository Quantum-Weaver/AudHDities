// src/components/asgard/domains/athena/lessons/LessonDetail.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Check, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLessonsList } from '@/lib/generated/hooks/athena-gamification/lessons';
import { actOnMark, isRead, readMarks, type LessonMark } from '@/lib/lessons/marks';
import type { AwardedSigil } from '@/lib/sigils/earned';
import type { CardData } from '@/types/components/runes/card.types';

const TYPE_COLORS: Record<string, string> = {
  text: 'bg-slate-500/20 text-slate-400', video: 'bg-cyan-500/20 text-cyan-400',
  audio: 'bg-purple-500/20 text-purple-400', interactive: 'bg-emerald-500/20 text-emerald-400',
  quiz: 'bg-amber-500/20 text-amber-400',
};

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

type MarkState = 'idle' | 'loading' | 'ready' | 'unread';

function readContent(content: unknown): { body: string | null; url: string | null } {
  if (typeof content === 'string') return { body: content, url: null };
  if (content && typeof content === 'object' && !Array.isArray(content)) {
    const c = content as Record<string, unknown>;
    return {
      body: typeof c.body === 'string' ? c.body : typeof c.text === 'string' ? c.text : null,
      url: typeof c.url === 'string' ? c.url : null,
    };
  }
  return { body: null, url: null };
}

export function LessonDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Memoized on the slug — the generated hooks refetch on params identity.
  const lessonParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: lessons, loading } = useLessonsList(lessonParams);
  const lesson = lessons[0] ?? null;
  const lessonId = lesson?.id ?? null;

  const [read, setRead] = useState<{ key: string; mark: LessonMark | null; shelf: boolean } | null>(null);
  const [walled, setWalled] = useState<{ key: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [earned, setEarned] = useState<AwardedSigil[]>([]);
  const [attempt, setAttempt] = useState(0);

  const readKey = user && lessonId ? `${user.id}:${lessonId}:${attempt}` : null;

  useEffect(() => {
    if (!user || !lessonId) return;
    const key = `${user.id}:${lessonId}:${attempt}`;
    let alive = true;
    readMarks(lessonId).then((res) => {
      if (!alive) return;
      if (!res) { setWalled({ key }); return; }
      setRead({ key, mark: res.marks[0] ?? null, shelf: res.ready });
    });
    return () => { alive = false; };
  }, [user, lessonId, attempt]);

  const markState: MarkState = !readKey
    ? 'idle'
    : walled?.key === readKey
      ? 'unread'
      : read?.key === readKey
        ? 'ready'
        : 'loading';
  const mark = markState === 'ready' && read ? read.mark : null;
  const shelf = markState === 'ready' && read ? read.shelf : false;
  const done = isRead(mark);

  const act = useCallback(async (next: boolean) => {
    if (!lessonId || !readKey) return;
    setBusy(true);
    setNote(null);
    const result = await actOnMark(lessonId, next ? 'mark' : 'unmark');
    if (result.ok) {
      setRead({ key: readKey, mark: result.mark, shelf: true });
      setEarned(result.sigils);
    } else {
      setNote('That mark did not land. It is safe to try again.');
    }
    setBusy(false);
  }, [lessonId, readKey]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!lesson) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This lesson has not been written yet.</p><Link href="/library/lessons" className="text-neurospark hover:underline mt-4 inline-block">Return to the Lessons</Link></div></main>);

  const content = readContent(lesson.content);
  const cd: CardData = { id: lesson.id, type: 'value', title: lesson.name, value: lesson.lesson_type || '' };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/lessons" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Lessons</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {lesson.lesson_type && <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${TYPE_COLORS[lesson.lesson_type] || ''}`}>{lesson.lesson_type.replace(/_/g, ' ')}</Badge>}
            {done && <Badge variant="outline" size="sm" className="text-[10px] text-neurospark border-neurospark/40">read</Badge>}
          </div>
          {lesson.estimated_duration && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{lesson.estimated_duration}</span>}
        </div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{lesson.name}</h1>
        {lesson.description && <p className="text-star-dust/70 leading-relaxed mb-6">{lesson.description}</p>}
        {content.body && <div className="bg-white/5 rounded-xl p-4 mb-6"><p className="text-star-dust/70 text-sm whitespace-pre-wrap">{content.body}</p></div>}
        {content.url && <a href={content.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">Open Content →</a>}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          {markState === 'ready' && shelf && !done && (
            <Button variant="outline" size="md" disabled={busy} onClick={() => act(true)}>Mark it read</Button>
          )}
          {markState === 'ready' && shelf && done && (
            <Button variant="ghost" size="md" disabled={busy} onClick={() => act(false)}>Lift the mark</Button>
          )}
        </div>

        {done && (
          <p className="mt-4 flex items-center gap-2 text-sm text-star-dust/70">
            <Check size={14} aria-hidden="true" />
            Read. It stays read whether or not you return to it.
          </p>
        )}
        {earned.length > 0 && (
          <p role="status" className="mt-2 text-sm text-star-dust/70">
            {earned.length === 1 ? 'A mark landed on ' : `${earned.length} marks landed on `}
            <Link href="/library/sigils" className={cn('rounded underline underline-offset-2 hover:text-neurospark', FOCUS)}>the Honors</Link>.
          </p>
        )}
        {note && <p role="status" className="mt-4 text-sm text-star-dust/70">{note}</p>}
        {markState === 'unread' && (
          <p role="status" className="mt-4 text-sm text-star-dust/70">
            Your mark could not be read just now.{' '}
            <button type="button" onClick={() => setAttempt((n) => n + 1)} className={cn('rounded underline underline-offset-2 hover:text-star-dust', FOCUS)}>
              Try again
            </button>
          </p>
        )}
      </Card>
    </div></main>
  );
}
