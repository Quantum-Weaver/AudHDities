// app/(supporting)/vision/page.tsx
// The Prophecy - Future vision, roadmap
// Feeling: Hopeful, visionary, inspiring

import { Page } from '@/components/arrchive/layout/Page';
import { RoadmapTimeline } from '@/components/supporting/RoadmapTimeline';
import { FeatureList } from '@/components/supporting/FeatureList';
import { CommunityVotes } from '@/components/supporting/CommunityVotes';
import { ContributionGuide } from '@/components/supporting/ContributionGuide';
import { JoinButton } from '@/components/supporting/JoinButton';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Prophecy | Sovereign Sanctuary',
  description: 'Our vision for the future'
};

export default async function VisionPage() {
  const supabase = await createServerSupabase();

  const { data: roadmap } = await supabase
    .from('roadmap_items')
    .select('*')
    .order('quarter', { ascending: true });

  const { data: topVotes } = await supabase
    .from('feature_votes')
    .select('*, feature:feature_id(*)')
    .order('votes', { ascending: false })
    .limit(10);

  return (
    <Page 
      variant={1}
      environment="observatory"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Prophecy
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              A glimpse of what's coming
            </p>
          </div>

          <div className="mb-12">
            <RoadmapTimeline items={roadmap || []} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <FeatureList />
            </div>
            <div>
              <CommunityVotes topVotes={topVotes || []} />
            </div>
          </div>

          <div className="text-center">
            <ContributionGuide />
            <div className="mt-8">
              <JoinButton />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}