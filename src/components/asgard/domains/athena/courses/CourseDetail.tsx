// src/components/asgard/domains/athena/courses/CourseDetail.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, ArrowRight, Clock, GraduationCap } from 'lucide-react';
import { Procession } from '@/components/shapes';
import type { Geometry, Section } from '@/lib/procession';
import { useLearningPathsList } from '@/lib/generated/hooks/athena-gamification/learning_paths';
import { useLessonsList } from '@/lib/generated/hooks/athena-gamification/lessons';
import type { LessonsRow } from '@/lib/generated/types/athena-gamification/lessons';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400', intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-fire-base/20 text-fire-light', master: 'bg-purple-500/20 text-purple-400',
};

// Held at module level: the list hook refetches on params identity.
const LESSONS_PARAMS = {
  filters: { status: 'published' },
  limit: 100,
};

// The corridor's card height, shortened so its foot clears the fold.
const CORRIDOR: Partial<Geometry> = { cardVh: 56 };

interface PathStep {
  lesson_id: string;
  display_order: number;
  is_required: boolean;
}

export function CourseDetail() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Held on the slug: the list hook refetches on params identity.
  const courseParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: courses, loading } = useLearningPathsList(courseParams);
  const course = courses[0] ?? null;

  const { data: lessons } = useLessonsList(LESSONS_PARAMS);

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
    () => new Map(lessons.map((l) => [l.id, l] as const)),
    [lessons]
  );

  const walk = useMemo(
    () =>
      steps
        .map((s) => lessonById.get(s.lesson_id))
        .filter((l): l is LessonsRow => !!l),
    [steps, lessonById]
  );

  const sections = useMemo<Section[]>(
    () =>
      walk.map((lesson) => ({
        id: lesson.id,
        title: lesson.name,
        rooms: [
          {
            id: lesson.id,
            name: lesson.name,
            line: lesson.lesson_type,
            story: lesson.description,
            address: `/library/lessons/${lesson.slug}`,
          },
        ],
      })),
    [walk]
  );

  if (loading) return (<main className="min-h-screen py-12!"><div className="container mx-auto! max-w-3xl px-6!"><Skeleton variant="text" className="h-6 w-32 mb-4!" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!course) return (<main className="min-h-screen py-12!"><div className="container mx-auto! max-w-3xl px-6! text-center"><GraduationCap className="mx-auto! mb-4! h-12 w-12 text-star-dust/20" /><p className="text-star-dust/40">This course has not been written yet.</p><Link href="/library/courses" className="mt-4! inline-block text-neurospark hover:underline">Return to the Curriculum</Link></div></main>);

  return (
    <main className="min-h-screen py-6!">
      <div className="container mx-auto! max-w-3xl px-6!">
        <Link
          href="/library/courses"
          className="mb-3! flex items-center gap-2 text-sm text-star-dust/60 transition-colors hover:text-star-dust"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Curriculum
        </Link>

        <div className="mb-4!">
          <div className="mb-2! flex flex-wrap items-center gap-2">
            {course.difficulty && (
              <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${DIFFICULTY_COLORS[course.difficulty] || ''}`}>
                {course.difficulty}
              </Badge>
            )}
            {course.path_type && (
              <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                {course.path_type.replace(/_/g, ' ')}
              </Badge>
            )}
            {course.estimated_duration && (
              <span className="flex items-center gap-1 text-xs text-star-dust/70">
                <Clock size={12} aria-hidden="true" />
                {course.estimated_duration}
              </span>
            )}
            {sections.length > 0 && (
              <span className="text-xs text-star-dust/70">
                {sections.length} {sections.length === 1 ? 'lesson' : 'lessons'}, one press each
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-star-dust">{course.name}</h1>
          {course.description && (
            <p className="mt-2! line-clamp-2 text-sm leading-relaxed text-star-dust/70">{course.description}</p>
          )}
        </div>

        {sections.length > 0 ? (
          <Procession
            sections={sections}
            geometry={CORRIDOR}
            label={`${course.name} — its lessons in path order`}
          >
            {(room, card, deck) => {
              const lesson = lessonById.get(room.id);
              return (
                <>
                  <div className="mb-3! flex items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-wide text-hearth-gold">
                      Lesson {deck.ordinal} of {sections.length}
                    </span>
                    {lesson?.estimated_duration && (
                      <span className="flex items-center gap-1 text-xs text-star-dust/70">
                        <Clock size={12} aria-hidden="true" />
                        {lesson.estimated_duration}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-star-dust">{room.name}</h2>
                  {room.line && (
                    <p className="mt-1! text-xs uppercase tracking-wide text-star-dust/40">
                      {String(room.line).replace(/_/g, ' ')}
                    </p>
                  )}
                  {room.story && (
                    <p className="mt-4! text-sm leading-relaxed text-star-dust/70">{room.story}</p>
                  )}
                  {room.address && (
                    <Link
                      href={room.address}
                      data-testid={`lesson-door-${deck.ordinal}`}
                      className="mt-6! inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5! text-sm text-star-dust transition-colors hover:bg-white/10"
                    >
                      Read it
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </>
              );
            }}
          </Procession>
        ) : (
          <p className="text-xs text-star-dust/70">
            This course&rsquo;s path is still being laid — its lessons will appear here as they are
            written.
          </p>
        )}
      </div>
    </main>
  );
}
