// app/(prometheus)/stage/schedule/page.tsx
// The Calendar - Upcoming performance schedule
// Feeling: Anticipatory, organized, community-driven

import { Page } from '@/components/arrchive/shared/Page';
import { MonthView } from '@/components/stage/MonthView';
import { EventList } from '@/components/stage/EventList';
import { TimezoneSelector } from '@/components/stage/TimezoneSelector';
import { ReminderButtons } from '@/components/stage/ReminderButtons';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'Schedule | Sovereign Sanctuary',
  description: 'Upcoming performances, shows, and events'
};

export default async function SchedulePage() {
  const supabase = await createServerSupabase();

  const { data: events } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('status', 'scheduled')
    .gte('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                The Calendar
              </h1>
              <p className="text-white/60">
                {events?.length || 0} upcoming performances
              </p>
            </div>
            <TimezoneSelector />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MonthView events={events || []} />
            </div>
            <div>
              <EventList events={events || []} />
              <ReminderButtons events={events || []} />
            </div>
          </div>

          {(!events || events.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-white mb-2">No Upcoming Shows</h3>
              <p className="text-white/60">
                Check back soon for new performances
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}