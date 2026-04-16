// app/(athena)/lessons/page.tsx
// The Lesson Path - All lessons across all courses
// Feeling: Structured, progressive, empowering

import { Page } from '@/components/arrchive/layout/Page';
import { LessonGrid } from '@/components/library/LessonGrid';
import { CourseFilter } from '@/components/library/CourseFilter';
import { DifficultyFilter } from '@/components/library/DifficultyFilter';
import { SearchBar } from '@/components/library/SearchBar';
import { ProgressSummary } from '@/components/library/ProgressSummary';
import { ContinueLearning } from '@/components/library/ContinueLearning';
import { Pagination } from '@/components/shared/Pagination';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface LessonsPageProps {
  searchParams: Promise<{
    course?: string;
    difficulty?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function LessonsPage({ searchParams }: LessonsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  const courseFilter = params.course || '';
  const difficulty = params.difficulty || '';
  const searchQuery = params.q || '';
  const currentPage = parseInt(params.page || '1');
  const itemsPerPage = 12;
  
  // Build query
  let query = supabase
    .from('lessons')
    .select('*, course:course_id(*)', { count: 'exact' })
    .eq('is_published', true);
  
  if (courseFilter) {
    query = query.eq('course_id', courseFilter);
  }
  
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  // Apply pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  query = query.range(from, to).order('order_index', { ascending: true });
  
  const { data: lessons, count } = await query;
  const totalPages = Math.ceil((count || 0) / itemsPerPage);
  
  // Fetch user progress (if authenticated)
  let completedLessonIds: string[] = [];
  let inProgressLessons: any[] = [];
  
  if (session) {
    const { data: completed } = await supabase
      .from('user_lessons')
      .select('lesson_id')
      .eq('user_id', session.user.id)
      .eq('completed', true);
    completedLessonIds = completed?.map(c => c.lesson_id) || [];
    
    const { data: inProgress } = await supabase
      .from('user_lessons')
      .select('lesson_id, progress, last_accessed')
      .eq('user_id', session.user.id)
      .eq('completed', false)
      .neq('progress', 0);
    inProgressLessons = inProgress || [];
  }
  
  // Fetch available courses for filter
  const { data: courses } = await supabase
    .from('products')
    .select('id, title')
    .eq('product_type', 'digital_course')
    .eq('is_published', true);

  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Lesson Path
            </h1>
            <p className="text-white/60">
              Every lesson is a step toward mastery
            </p>
          </div>

          {/* Continue Learning (authenticated only) */}
          {session && inProgressLessons.length > 0 && (
            <div className="mb-8">
              <ContinueLearning lessons={inProgressLessons} />
            </div>
          )}

          {/* Progress Summary (authenticated only) */}
          {session && lessons && (
            <div className="mb-8">
              <ProgressSummary 
                totalLessons={count || 0}
                completedLessons={completedLessonIds.length}
                inProgressLessons={inProgressLessons.length}
              />
            </div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar 
                placeholder="Search lessons..." 
                defaultValue={searchQuery}
              />
            </div>
            <div className="flex gap-3">
              <CourseFilter 
                courses={courses || []} 
                currentCourse={courseFilter} 
              />
              <DifficultyFilter currentDifficulty={difficulty} />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-white/40 mb-4">
            {count || 0} lessons available
          </div>

          {/* Lesson Grid */}
          <LessonGrid 
            lessons={lessons || []} 
            completedIds={completedLessonIds}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}

          {/* Empty State */}
          {(!lessons || lessons.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-white mb-2">No lessons found</h3>
              <p className="text-white/60">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}