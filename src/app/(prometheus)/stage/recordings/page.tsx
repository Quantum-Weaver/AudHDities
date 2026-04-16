// app/(prometheus)/stage/recordings/page.tsx
// The Echo - Past performance recordings
// Feeling: Nostalgic, reflective, celebratory

import { Page } from '@/components/arrchive/layout/Page';
import { VideoGrid } from '@/components/stage/VideoGrid';
import { SearchFilter } from '@/components/stage/SearchFilter';
import { CategoryTabs } from '@/components/stage/CategoryTabs';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Echo | Sovereign Sanctuary',
  description: 'Past performances, recordings, and highlights'
};

export default async function RecordingsPage() {
  const supabase = await createServerSupabase();

  const { data: recordings } = await supabase
    .from('event_recordings')
    .select('*, event:event_id(*), creator:creator_id(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <Page 
      variant={2}
      environment="lounge"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Echo
            </h1>
            <p className="text-white/60">
              Every performance lives on
            </p>
          </div>

          <div className="mb-8">
            <SearchFilter placeholder="Search recordings..." />
          </div>

          <div className="mb-6">
            <CategoryTabs 
              categories={['All', 'Music', 'Comedy', 'Storytelling', 'Workshop']}
            />
          </div>

          <VideoGrid recordings={recordings || []} />

          {(!recordings || recordings.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-white mb-2">No Recordings Yet</h3>
              <p className="text-white/60">
                Be the first to share a performance
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}