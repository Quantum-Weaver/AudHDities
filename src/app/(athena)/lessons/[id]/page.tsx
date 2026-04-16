// app/(athena)/lessons/[id]/page.tsx
// The Lesson - Individual lesson page
// Feeling: Focused, engaging, transformative

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { LessonContent } from '@/components/library/LessonContent';
import { VideoPlayer } from '@/components/library/VideoPlayer';
import { CodeEditor } from '@/components/library/CodeEditor';
import { QuizComponent } from '@/components/library/QuizComponent';
import { NavigationButtons } from '@/components/library/NavigationButtons';
import { CompletionToggle } from '@/components/library/CompletionToggle';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch lesson
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*, course:course_id(*)')
    .eq('id', id)
    .single();
  
  if (error || !lesson) {
    notFound();
  }
  
  // Fetch user completion status
  let isCompleted = false;
  if (session) {
    const { data: completion } = await supabase
      .from('user_lessons')
      .select('completed_at')
      .eq('lesson_id', id)
      .eq('user_id', session.user.id)
      .single();
    isCompleted = !!completion;
  }

  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-white/40 mb-2">
              <span className="hover:text-white/60 transition-colors cursor-pointer">The Curriculum</span>
              <span className="mx-2">/</span>
              <span className="hover:text-white/60 transition-colors cursor-pointer">{lesson.course?.title}</span>
              <span className="mx-2">/</span>
              <span className="text-white/60">{lesson.title}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {lesson.title}
            </h1>
          </div>

          {/* Lesson Content */}
          <div className="space-y-6">
            
            {/* Video Player (if video_url exists) */}
            {lesson.video_url && (
              <VideoPlayer url={lesson.video_url} />
            )}
            
            {/* Code Editor (if interactive) */}
            {lesson.content_type === 'interactive' && (
              <CodeEditor lesson={lesson} />
            )}
            
            {/* Quiz (if quiz exists) */}
            {lesson.quiz_id && (
              <QuizComponent lessonId={lesson.id} quizId={lesson.quiz_id} />
            )}
            
            {/* Main Content */}
            <LessonContent content={lesson.content} />
            
            {/* Completion Toggle (authenticated only) */}
            {session && (
              <CompletionToggle 
                lessonId={lesson.id} 
                isCompleted={isCompleted}
                courseId={lesson.course_id}
              />
            )}
            
            {/* Navigation Buttons */}
            <NavigationButtons 
              currentLessonId={lesson.id}
              courseId={lesson.course_id}
            />
          </div>
        </div>
      </main>
    </Page>
  );
}