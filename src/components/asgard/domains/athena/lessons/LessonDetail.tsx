// src/components/asgard/domains/athena/lessons/LessonDetail.tsx
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import { useLessonsList } from '@/lib/generated/hooks/athena-gamification/lessons';
import type { CardData } from '@/types/components/runes/card.types';

const TYPE_COLORS: Record<string, string> = {
  text: 'bg-slate-500/20 text-slate-400', video: 'bg-cyan-500/20 text-cyan-400',
  audio: 'bg-purple-500/20 text-purple-400', interactive: 'bg-emerald-500/20 text-emerald-400',
  quiz: 'bg-amber-500/20 text-amber-400',
};

// content is Json in the evolved table (was content_body text + content_url).
// Render only the shapes we can honestly show; richer structures wait for
// the row-10 sitting.
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
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Memoized on the slug — the generated hooks refetch on params identity.
  const lessonParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: lessons, loading } = useLessonsList(lessonParams);
  const lesson = lessons[0] ?? null;

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!lesson) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This lesson has not been written yet.</p><Link href="/library/lessons" className="text-neurospark hover:underline mt-4 inline-block">Return to the Lessons</Link></div></main>);

  const content = readContent(lesson.content);
  const cd: CardData = { id: lesson.id, type: 'value', title: lesson.name, value: lesson.lesson_type || '' };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/lessons" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Lessons</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center justify-between mb-4">{lesson.lesson_type && <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${TYPE_COLORS[lesson.lesson_type] || ''}`}>{lesson.lesson_type.replace(/_/g, ' ')}</Badge>}{lesson.estimated_duration && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{lesson.estimated_duration}</span>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{lesson.name}</h1>
        {lesson.description && <p className="text-star-dust/70 leading-relaxed mb-6">{lesson.description}</p>}
        {content.body && <div className="bg-white/5 rounded-xl p-4 mb-6"><p className="text-star-dust/70 text-sm whitespace-pre-wrap">{content.body}</p></div>}
        {content.url && <a href={content.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">Open Content →</a>}
        <div><Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button></div>
      </Card>
    </div></main>
  );
}
