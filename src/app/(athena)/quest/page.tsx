// app/(athena)/quests/page.tsx
// The Path - All available quests
// Feeling: Purposeful, progressive, rewarding

import { Page } from '@/components/arrchive/layout/Page';
import { QuestTimeline } from '@/components/library/QuestTimeline';
import { DifficultyFilters } from '@/components/library/DifficultyFilters';
import { RewardBadges } from '@/components/library/RewardBadges';
import { ProgressTracker } from '@/components/library/ProgressTracker';
import { StartButton } from '@/components/library/StartButton';
import { SearchBar } from '@/components/library/SearchBar';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface QuestsPageProps {
  searchParams: Promise<{
    difficulty?: string;
    house?: string;
    q?: string;
  }>;
}

export default async function QuestsPage({ searchParams }: QuestsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  const difficulty = params.difficulty || '';
  const house = params.house || '';
  const searchQuery = params.q || '';
  
  // Build query
  let query = supabase
    .from('quests')
    .select('*')
    .eq('is_active', true);
  
  if (difficulty) {
    // Assuming difficulty maps to required_sovereignty_score ranges
    if (difficulty === 'beginner') query = query.lte('required_sovereignty_score', 100);
    if (difficulty === 'intermediate') query = query.gt('required_sovereignty_score', 100).lte('required_sovereignty_score', 500);
    if (difficulty === 'advanced') query = query.gt('required_sovereignty_score', 500);
  }
  
  if (house) {
    query = query.eq('house', house);
  }
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  query = query.order('order_index', { ascending: true });
  
  const { data: quests } = await query;
  
  // Fetch user progress (if authenticated)
  let userProgress = null;
  if (session) {
    const { data: progress } = await supabase
      .from('user_quests')
      .select('quest_id, status')
      .eq('user_id', session.user.id);
    userProgress = progress;
  }

  return (
    <Page 
      variant={2}
      environment="observatory"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Path
            </h1>
            <p className="text-white/60">
              Every quest is a step toward sovereignty
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar defaultValue={searchQuery} />
            </div>
            <div className="flex gap-3">
              <DifficultyFilters currentDifficulty={difficulty} />
            </div>
          </div>

          {/* Progress Tracker (authenticated only) */}
          {session && userProgress && (
            <div className="mb-8">
              <ProgressTracker progress={userProgress} totalQuests={quests?.length || 0} />
            </div>
          )}

          {/* Quest Timeline */}
          <QuestTimeline 
            quests={quests || []} 
            userProgress={userProgress || []}
          />

          {/* Empty State */}
          {(!quests || quests.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-white mb-2">No quests found</h3>
              <p className="text-white/60">
                Try adjusting your filters or check back soon
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}