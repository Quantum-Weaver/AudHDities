// app/(prometheus)/stage/live/page.tsx
// Now Playing - All currently live performances
// Feeling: Energetic, euphoric, connected

import { Page } from '@/components/arrchive/layout/Page';
import { LiveGrid } from '@/components/stage/LiveGrid';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'Now Playing | Sovereign Sanctuary',
  description: 'Live performances happening right now'
};

export default async function LivePage() {
  const supabase = await createServerSupabase();

  const { data: liveEvents } = await supabase
    .from('events')
    .select('*, creator:creator_id(*), viewer_count:viewers(count)')
    .eq('status', 'live')
    .order('viewer_count', { ascending: false });

  return (
    <Page 
      variant={2}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Now Playing
              </h1>
            </div>
            <p className="text-white/60 mt-2">
              {liveEvents?.length || 0} performances currently live
            </p>
          </div>

          <LiveGrid events={liveEvents || []} />

          {(!liveEvents || liveEvents.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔴</div>
              <h3 className="text-xl font-bold text-white mb-2">No Live Performances</h3>
              <p className="text-white/60">
                Check the schedule for upcoming shows
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}