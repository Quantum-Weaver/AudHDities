// app/(prometheus)/stage/music/page.tsx
// The Music Realm - Music performances hub
// Feeling: Energetic, flowing, euphoric

import { Page } from '@/components/arrchive/layout/Page';
import { MusicGrid } from '@/components/stage/MusicGrid';
import { GenreRadios } from '@/components/stage/GenreRadios';
import { FeaturedArtists } from '@/components/stage/FeaturedArtists';
import { PlaylistCreator } from '@/components/stage/PlaylistCreator';
import { LiveNow } from '@/components/stage/LiveNow';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Music Realm | Sovereign Sanctuary',
  description: 'Live music, concerts, and musical performances'
};

export default async function MusicPage() {
  const supabase = await createServerSupabase();

  const { data: musicEvents } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('genre', 'music')
    .eq('status', 'scheduled')
    .order('start_time', { ascending: true });

  const { data: liveMusic } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('genre', 'music')
    .eq('status', 'live');

  const { data: artists } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_musician', true)
    .limit(12);

  return (
    <Page 
      variant={1}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Music Realm
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Where sound becomes substance
            </p>
          </div>

          {liveMusic && liveMusic.length > 0 && (
            <div className="mb-12">
              <LiveNow events={liveMusic} />
            </div>
          )}

          <GenreRadios />
          <FeaturedArtists artists={artists || []} />
          <MusicGrid events={musicEvents || []} />
          <PlaylistCreator />

          {(!musicEvents || musicEvents.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-bold text-white mb-2">No Music Shows Scheduled</h3>
              <p className="text-white/60">
                Check back soon for performances
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}