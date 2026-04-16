// app/(athena)/courses/[id]/page.tsx
// Course View - Single course page
// Feeling: Immersive, progressive, rewarding

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { CourseOutline } from '@/components/library/CourseOutline';
import { LessonList } from '@/components/library/LessonList';
import { ProgressBar } from '@/components/library/ProgressBar';
import { ContinueButton } from '@/components/library/ContinueButton';
import { CertificateDisplay } from '@/components/library/CertificateDisplay';
import { CourseInfo } from '@/components/library/CourseInfo';
import { InstructorInfo } from '@/components/library/InstructorInfo';
import { ReviewsSection } from '@/components/library/ReviewsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch course
  const { data: course, error } = await supabase
    .from('products')
    .select('*, creator:creator_id(*)')
    .eq('id', id)
    .single();
  
  if (error || !course || course.product_type !== 'digital_course') {
    notFound();
  }
  
  // Fetch lessons (assuming a lessons table exists)
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', id)
    .order('order_index', { ascending: true });
  
  // Fetch user progress (if authenticated)
  let userProgress = null;
  let completedLessons: string[] = [];
  if (session) {
    const { data: progress } = await supabase
      .from('user_lessons')
      .select('lesson_id, completed_at')
      .eq('user_id', session.user.id);
    userProgress = progress;
    completedLessons = progress?.map(p => p.lesson_id) || [];
  }

  return (
    <Page 
      variant={2}
      environment="library"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-white/40 mb-2">
              <span className="hover:text-white/60 transition-colors cursor-pointer">The Curriculum</span>
              <span className="mx-2">/</span>
              <span className="text-white/60">{course.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <InstructorInfo creator={course.creator} />
          </div>

          {/* Progress Bar (authenticated only) */}
          {session && lessons && lessons.length > 0 && (
            <div className="mb-8">
              <ProgressBar 
                completed={completedLessons.length} 
                total={lessons.length} 
              />
              <ContinueButton 
                courseId={course.id} 
                lessons={lessons} 
                completedLessons={completedLessons}
              />
            </div>
          )}

          {/* Content Tabs */}
          <Tabs defaultValue="outline">
            <TabsList className="w-full">
              <TabsTrigger value="outline">Course Outline</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {completedLessons.length === lessons?.length && lessons?.length > 0 && (
                <TabsTrigger value="certificate">Certificate</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="outline" className="mt-6">
              <CourseOutline course={course} lessons={lessons || []} />
            </TabsContent>
            
            <TabsContent value="lessons" className="mt-6">
              <LessonList 
                lessons={lessons || []} 
                completedLessons={completedLessons}
                courseId={course.id}
              />
            </TabsContent>
            
            <TabsContent value="info" className="mt-6">
              <CourseInfo course={course} />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewsSection courseId={course.id} />
            </TabsContent>
            
            <TabsContent value="certificate" className="mt-6">
              <CertificateDisplay courseId={course.id} userId={session?.user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </Page>
  );
}