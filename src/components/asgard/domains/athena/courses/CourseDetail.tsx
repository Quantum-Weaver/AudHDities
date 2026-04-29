// src/components/asgard/domains/athena/courses/CourseDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, GraduationCap } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface CourseItem {
  id: string; title: string; description: string; slug: string;
  difficulty: string; house: string | null; creator_id: string;
  estimated_duration_hours: number | null; prerequisite_path_id: string | null;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400', intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-red-500/20 text-red-400', master: 'bg-purple-500/20 text-purple-400',
};

export function CourseDetail() {
  const params = useParams(); const router = useRouter();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/athena-gamification/learning_paths?slug=eq.${params.slug}&limit=1`)
      .then(r => r.json()).then(result => { const items = result.data?.data || result.data || []; if (items.length) setCourse(items[0]); })
      .catch(console.error).finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!course) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><GraduationCap className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This course has not been written yet.</p><Link href="/library/courses" className="text-neurospark hover:underline mt-4 inline-block">Return to the Curriculum</Link></div></main>);

  const cd: CardData = { id: course.id, type: 'value', title: course.title, value: course.difficulty };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/courses" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Curriculum</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center justify-between mb-4"><Badge variant="outline" size="sm" className={`text-[10px] capitalize ${DIFFICULTY_COLORS[course.difficulty] || ''}`}>{course.difficulty}</Badge>{course.estimated_duration_hours && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{course.estimated_duration_hours} hours</span>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{course.title}</h1>
        <p className="text-star-dust/70 leading-relaxed mb-6">{course.description}</p>
        {course.house && <Badge variant="outline" size="sm" className="text-[10px] mb-6">{course.house.replace(/_/g, ' ')}</Badge>}
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}