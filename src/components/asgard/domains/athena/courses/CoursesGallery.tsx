// src/components/asgard/domains/athena/courses/CoursesGallery.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Clock, GraduationCap, Search } from 'lucide-react';
import { Carousel, type CarouselStop } from '@/components/shapes';
import { galleryOf, type GalleryConfig } from '@/lib/gallery';
import { useLearningPathsList } from '@/lib/generated/hooks/athena-gamification/learning_paths';
import type { LearningPathsRow } from '@/lib/generated/types/athena-gamification/learning_paths';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400', intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-fire-base/20 text-fire-light', master: 'bg-purple-500/20 text-purple-400',
};

// Held at module level: the list hook refetches on params identity.
const COURSES_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

const COURSE_GALLERY: GalleryConfig<LearningPathsRow> = {
  searchIn: [(c) => c.name, (c) => c.description, (c) => c.path_type, (c) => c.difficulty],
  card: {
    id: (c) => c.id,
    title: (c) => c.name,
    badges: (c) => [c.difficulty, c.path_type?.replace(/_/g, ' ')],
    preview: (c) => c.description,
    meta: (c) => c.estimated_duration,
    address: (c) => `/library/courses/${c.slug}`,
  },
  empty: {
    silent: 'the curriculum is being prepared',
    unmatched: 'no course answers to that',
  },
  previewLength: 100,
};

interface CourseStop extends CarouselStop {
  badges: string[];
  preview: string | null;
  meta: string | null;
  address: string;
}

const BADGE =
  'rounded-full border border-white/10 px-2! py-0.5! text-[10px] uppercase tracking-wide text-star-dust/70';

export function CoursesGallery() {
  const router = useRouter();
  const [term, setTerm] = useState('');

  const { data: courses, loading } = useLearningPathsList(COURSES_PARAMS);

  const view = useMemo(() => galleryOf(COURSE_GALLERY, courses, term), [courses, term]);

  const stops = useMemo<CourseStop[]>(
    () =>
      view.cards.map((c) => ({
        id: c.id,
        title: c.title,
        form: 'course',
        badges: c.badges,
        preview: c.preview,
        meta: c.meta,
        address: c.address,
      })),
    [view],
  );

  if (loading)
    return (
      <main className="min-h-screen py-12!">
        <div className="container mx-auto! max-w-5xl px-6!">
          <Skeleton variant="text" className="h-8 w-48 mb-8!" />
          <Skeleton variant="card" className="h-44" />
        </div>
      </main>
    );

  return (
    <main className="min-h-screen py-12!">
      <div className="container mx-auto! max-w-5xl px-6!">
        <div className="mb-8!">
          <Link
            href="/library"
            className="mb-2! flex items-center gap-2 text-sm text-star-dust/60 transition-colors hover:text-star-dust"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to the Library
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Curriculum</h1>
          <p className="mt-1! text-sm text-star-dust/70">
            One course at a time, left to right. Press the course in the middle to walk it.
          </p>
        </div>

        <div className="relative mb-8!">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40"
            size={16}
            aria-hidden="true"
          />
          <label htmlFor="courses-filter" className="sr-only">
            Narrow the courses
          </label>
          <input
            id="courses-filter"
            type="search"
            value={term}
            placeholder="Search courses..."
            onChange={(e) => setTerm(e.target.value)}
            data-testid="courses-filter"
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2! pl-10! pr-4! text-sm text-star-dust placeholder-white/40 focus:border-neurospark focus:outline-none"
          />
        </div>

        {view.empty ? (
          <div className="py-20! text-center" data-testid="courses-empty" data-empty={view.empty.kind}>
            <GraduationCap className="mx-auto! mb-4! h-12 w-12 text-star-dust/20" aria-hidden="true" />
            <p className="text-lg text-star-dust/70">{view.empty.message}</p>
          </div>
        ) : (
          <Carousel
            stops={stops}
            label="the courses, one at a time"
            onSelect={(stop) => router.push(stop.address)}
          >
            {(stop, face) => (
              <>
                <span className="flex items-center justify-between gap-2">
                  {stop.badges[0] && (
                    <span className={`${BADGE} capitalize ${DIFFICULTY_COLORS[stop.badges[0]] ?? ''}`}>
                      {stop.badges[0]}
                    </span>
                  )}
                  {stop.meta && (
                    <span className="flex items-center gap-1 text-[11px] text-star-dust/70">
                      <Clock size={11} aria-hidden="true" />
                      {stop.meta}
                    </span>
                  )}
                </span>
                <span className="mt-2! block text-base font-semibold leading-snug">{stop.title}</span>
                {stop.preview && (
                  <span className="mt-1! line-clamp-2 text-xs leading-snug text-star-dust/70">
                    {stop.preview}
                  </span>
                )}
                {face.focused && (
                  <span className="mt-2! block text-[10px] uppercase tracking-wide text-hearth-gold">
                    press to open
                  </span>
                )}
              </>
            )}
          </Carousel>
        )}
      </div>
    </main>
  );
}
