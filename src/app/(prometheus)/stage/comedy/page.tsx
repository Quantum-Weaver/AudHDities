// app/(prometheus)/stage/comedy/page.tsx
// The Comedy Hearth - Comedy performances hub
// Feeling: Playful, intimate, joyful

import { Page } from '@/components/arrchive/shared/Page';
import { ComedyGrid } from '@/components/stage/ComedyGrid';
import { SpecialHighlights } from '@/components/stage/SpecialHighlights';
import { ComedianProfiles } from '@/components/stage/ComedianProfiles';
import { ClipsReel } from '@/components/stage/ClipsReel';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Comedy Hearth | Sovereign Sanctuary',
  description: 'Comedy specials, stand-up, and laughter'
};

export default async function ComedyPage() {
  const supabase = await createServerSupabase();

  const { data: comedyEvents } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('genre', 'comedy')
    .eq('status', 'scheduled')
    .order('start_time', { ascending: true });

  const { data: comedians } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_comedian', true)
    .limit(12);

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
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Comedy Hearth
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Where laughter heals and joy is sacred
            </p>
          </div>

          <SpecialHighlights />
          <ClipsReel />
          <ComedyGrid events={comedyEvents || []} />
          <ComedianProfiles comedians={comedians || []} />

          {(!comedyEvents || comedyEvents.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-white mb-2">No Comedy Shows Scheduled</h3>
              <p className="text-white/60">
                Check back soon for laughs
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}