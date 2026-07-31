// src/components/asgard/domains/athena/courses/CourseDetail.tsx
// THE PATH WALKED (2026-07-31, at KP's ⚛ word "we are ready to finish
// Athena"): the course room now walks its own lesson path — path_lessons
// (the join the seeds filled: 6 ordered steps for The Settled Tongue)
// resolved against the published lessons, rendered as a numbered walk with
// each step a door to its lesson. No completion percentages, no progress
// race (anti-scarcity; the Honors are emergence-recognition) — the path
// simply shows its steps in order, and the vessel walks at their own pace.
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, BookOpen, Clock, GraduationCap } from 'lucide-react';
import { useLearningPathsList } from '@/hooks/generated/athena-gamification/learning_paths';
import { useLessonsList } from '@/hooks/generated/athena-gamification/lessons';
import type { CardData } from '@/types/components/runes/card.types';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400', intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-red-500/20 text-red-400', master: 'bg-purple-500/20 text-purple-400',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const LESSONS_PARAMS = {
  filters: { status: 'published' },
  limit: 100,
};

interface PathStep {
  lesson_id: string;
  display_order: number;
  is_required: boolean;
}

export function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Memoized on the slug — the generated hooks refetch on params identity.
  const courseParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: courses, loading } = useLearningPathsList(courseParams);
  const course = courses[0] ?? null;

  const { data: lessons } = useLessonsList(LESSONS_PARAMS);

  // The path itself — path_lessons has no generated hook (join tables are
  // route-only), so the walk reads the generated API directly, keyed on the
  // course id (the VesselContent pattern).
  const [steps, setSteps] = useState<PathStep[]>([]);
  useEffect(() => {
    if (!course?.id) return;
    fetch(
      `/api/generated/athena-gamification/path_lessons?path_id=${course.id}&sort=display_order&order=asc&limit=100`
    )
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setSteps(res.data?.data ?? []);
      })
      .catch(() => {});
  }, [course?.id]);

  const lessonById = useMemo(
    () => new Map(lessons.map((l) => [l.id, l])),
    [lessons]
  );
  const walk = steps
    .map((s) => ({ step: s, lesson: lessonById.get(s.lesson_id) }))
    .filter((w) => !!w.lesson);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!course) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><GraduationCap className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This course has not been written yet.</p><Link href="/library/courses" className="text-neurospark hover:underline mt-4 inline-block">Return to the Curriculum</Link></div></main>);

  const cd: CardData = { id: course.id, type: 'value', title: course.name, value: course.difficulty || '' };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/courses" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Curriculum</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center justify-between mb-4">{course.difficulty && <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${DIFFICULTY_COLORS[course.difficulty] || ''}`}>{course.difficulty}</Badge>}{course.estimated_duration && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{course.estimated_duration}</span>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{course.name}</h1>
        <p className="text-star-dust/70 leading-relaxed mb-6">{course.description}</p>
        {course.path_type && <Badge variant="outline" size="sm" className="text-[10px] capitalize mb-6">{course.path_type.replace(/_/g, ' ')}</Badge>}

        {/* THE PATH — the course's own lessons, in their kept order.
            No percentages, no checkmarks racing you — steps, walked at
            the vessel's pace. */}
        {walk.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-star-dust/40">
              The path — {walk.length} {walk.length === 1 ? 'step' : 'steps'}
            </h2>
            <ol className="space-y-2">
              {walk.map(({ step, lesson }, index) => (
                <li key={step.lesson_id}>
                  <Link
                    href={`/library/lessons/${lesson!.slug}`}
                    className="group flex items-start gap-3 rounded-lg border border-star-dust/10 bg-white/5 p-3 transition-colors hover:border-star-dust/25 motion-reduce:transition-none"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neurospark/10 text-xs text-neurospark">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-star-dust">
                        {lesson!.name}
                      </span>
                      {lesson!.description && (
                        <span className="mt-0.5 block text-xs text-star-dust/50">
                          {lesson!.description}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-star-dust/40">
                      {lesson!.estimated_duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {lesson!.estimated_duration}
                        </span>
                      )}
                      <BookOpen size={12} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
        {walk.length === 0 && steps.length === 0 && (
          <p className="mb-6 text-xs text-star-dust/40">
            This course&rsquo;s path is still being laid — its lessons will
            appear here as they are written.
          </p>
        )}

        <div><Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button></div>
      </Card>
    </div></main>
  );
}
