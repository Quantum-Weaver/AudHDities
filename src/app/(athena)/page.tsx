// app/(athena)/page.tsx
// The Library - Learning hub
// Feeling: Curious, expansive, wise, empowering

import { Page } from '@/components/arrchive/layout/Page';
import { QuestGrid } from '@/components/library/QuestGrid';
import { CourseList } from '@/components/library/CourseList';
import { CategoryNav } from '@/components/library/CategoryNav';
import { SearchBar } from '@/components/library/SearchBar';
import { ProgressOverview } from '@/components/library/ProgressOverview';
import { RecommendedSection } from '@/components/library/RecommendedSection';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export default async function LibraryPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch featured quests
  const { data: featuredQuests } = await supabase
    .from('quests')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .limit(6);
  
  // Fetch popular courses
  const { data: popularCourses } = await supabase
    .from('products')
    .select('*')
    .eq('product_type', 'digital_course')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4);
  
  // Fetch user progress (if authenticated)
  let userProgress = null;
  if (session) {
    const { data: progress } = await supabase
      .from('user_quests')
      .select('*, quests(*)')
      .eq('user_id', session.user.id);
    userProgress = progress;
  }

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
              The Library
            </h1>
            <p className="text-white/60">
              Knowledge is sovereign. Wisdom is shared.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar />
          </div>

          {/* Progress Overview (authenticated only) */}
          {session && userProgress && (
            <div className="mb-8">
              <ProgressOverview progress={userProgress} />
            </div>
          )}

          {/* Category Navigation */}
          <div className="mb-8">
            <CategoryNav />
          </div>

          {/* Featured Quests */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-cyan-400">✦</span>
              Featured Quests
            </h2>
            <QuestGrid quests={featuredQuests || []} />
          </div>

          {/* Popular Courses */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-purple-400">✦</span>
              Popular Courses
            </h2>
            <CourseList courses={popularCourses || []} />
          </div>

          {/* Recommended for You (authenticated only) */}
          {session && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-pink-400">✦</span>
                Recommended for You
              </h2>
              <RecommendedSection userId={session.user.id} />
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}