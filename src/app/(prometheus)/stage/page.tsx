// app/(prometheus)/stage/page.tsx
// The Stage - Live performances hub
// Feeling: Energetic, creative, flowing, euphoric

import { Page } from '@/components/arrchive/layout/Page';
import { EventCarousel } from '@/components/stage/EventCarousel';
import { UpcomingList } from '@/components/stage/UpcomingList';
import { FeaturedPerformers } from '@/components/stage/FeaturedPerformers';
import { GenreFilters } from '@/components/stage/GenreFilters';
import { LiveNowBadge } from '@/components/stage/LiveNowBadge';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Stage | Sovereign Sanctuary',
  description: 'Live performances, music, comedy, and storytelling from sovereign creators'
};

export default async function StagePage() {
  const supabase = await createServerSupabase();

  // Fetch live events
  const { data: liveEvents } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('status', 'live')
    .order('start_time', { ascending: true })
    .limit(5);

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('status', 'scheduled')
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(10);

  // Fetch featured performers (users with most stage appearances)
  const { data: featuredPerformers } = await supabase
    .from('profiles')
    .select('*, event_count:events(count)')
    .order('event_count', { ascending: false })
    .limit(6);

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
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Stage
            </h1>
            <p className="text-white/60">
              Where sovereign souls share their gifts
            </p>
          </div>

          {/* Live Now Section */}
          {liveEvents && liveEvents.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <LiveNowBadge />
                <h2 className="text-xl font-semibold text-white">Live Now</h2>
              </div>
              <EventCarousel events={liveEvents} variant="live" />
            </div>
          )}

          {/* Genre Filters */}
          <div className="mb-8">
            <GenreFilters />
          </div>

          {/* Featured Performers */}
          {featuredPerformers && featuredPerformers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-4">
                Featured Performers
              </h2>
              <FeaturedPerformers performers={featuredPerformers} />
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-4">
                Upcoming Performances
              </h2>
              <UpcomingList events={upcomingEvents} />
            </div>
          )}

          {/* Empty State */}
          {(!liveEvents || liveEvents.length === 0) && 
           (!upcomingEvents || upcomingEvents.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-white mb-2">The Stage is Quiet</h3>
              <p className="text-white/60">
                No performances scheduled at the moment. 
                Check back soon or{' '}
                <a href="/stage/studio" className="text-cyan-400 hover:underline">
                  start your own show
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}