// src/components/asgard/domains/athena/lessons/LessonDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface LessonItem {
  lessons_id: string; title: string; description: string; slug: string;
  content_type: string; content_body: string | null; content_url: string | null;
  duration_minutes: number | null; creator_id: string;
}

const CONTENT_COLORS: Record<string, string> = {
  text: 'bg-slate-500/20 text-slate-400', video: 'bg-cyan-500/20 text-cyan-400',
  audio: 'bg-purple-500/20 text-purple-400', interactive: 'bg-emerald-500/20 text-emerald-400',
  quiz: 'bg-amber-500/20 text-amber-400',
};

export function LessonDetail() {
  const params = useParams(); const router = useRouter();
  const [lesson, setLesson] = useState<LessonItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/athena-gamification/lessons?slug=eq.${params.slug}&limit=1`)
      .then(r => r.json()).then(result => { const items = result.data?.data || result.data || []; if (items.length) setLesson(items[0]); })
      .catch(console.error).finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!lesson) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This lesson has not been written yet.</p><Link href="/library/lessons" className="text-neurospark hover:underline mt-4 inline-block">Return to the Lessons</Link></div></main>);

  const cd: CardData = { id: lesson.lessons_id, type: 'value', title: lesson.title, value: lesson.content_type };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/lessons" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Lessons</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center justify-between mb-4"><Badge variant="outline" size="sm" className={`text-[10px] capitalize ${CONTENT_COLORS[lesson.content_type] || ''}`}>{lesson.content_type}</Badge>{lesson.duration_minutes && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{lesson.duration_minutes} min</span>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{lesson.title}</h1>
        <p className="text-star-dust/70 leading-relaxed mb-6">{lesson.description}</p>
        {lesson.content_body && <div className="bg-white/5 rounded-xl p-4 mb-6"><p className="text-star-dust/70 text-sm whitespace-pre-wrap">{lesson.content_body}</p></div>}
        {lesson.content_url && <a href={lesson.content_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">Open Content →</a>}
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}