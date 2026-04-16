// app/(athena)/courses/page.tsx
// The Curriculum - All courses
// Feeling: Structured, progressive, empowering

import { Page } from '@/components/arrchive/layout/Page';
import { CourseGrid } from '@/components/library/CourseGrid';
import { LevelFilters } from '@/components/library/LevelFilters';
import { CategoryTags } from '@/components/library/CategoryTags';
import { EnrollmentCount } from '@/components/library/EnrollmentCount';
import { InstructorInfo } from '@/components/library/InstructorInfo';
import { SearchBar } from '@/components/library/SearchBar';
import { Pagination } from '@/components/shared/Pagination';
import { createServerSupabase } from '@/lib/supabase/server';

interface CoursesPageProps {
  searchParams: Promise<{
    q?: string;
    level?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  
  const searchQuery = params.q || '';
  const level = params.level || '';
  const currentPage = parseInt(params.page || '1');
  const itemsPerPage = 12;
  
  // Build query
  let query = supabase
    .from('products')
    .select('*, creator:creator_id(*)', { count: 'exact' })
    .eq('product_type', 'digital_course')
    .eq('is_published', true);
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  // Apply pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  query = query.range(from, to).order('created_at', { ascending: false });
  
  const { data: courses, count } = await query;
  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Curriculum
            </h1>
            <p className="text-white/60">
              Structured paths to sovereign knowledge
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar defaultValue={searchQuery} />
            </div>
            <div className="flex gap-3">
              <LevelFilters currentLevel={level} />
              <CategoryTags />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-white/40 mb-4">
            {count || 0} courses available
          </div>

          {/* Course Grid */}
          <CourseGrid courses={courses || []} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}

          {/* Empty State */}
          {(!courses || courses.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
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