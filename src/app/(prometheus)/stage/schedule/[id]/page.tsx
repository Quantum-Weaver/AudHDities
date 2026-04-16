// app/(prometheus)/stage/schedule/[id]/page.tsx
// Event Detail - Single scheduled/future event view
// Feeling: Anticipatory, excited, prepared

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { EventInfo } from '@/components/stage/EventInfo';
import { ReminderButton } from '@/components/stage/ReminderButton';
import { AddToCalendar } from '@/components/stage/AddToCalendar';
import { TicketButton } from '@/components/stage/TicketButton';
import { ShareEvent } from '@/components/stage/ShareEvent';
import { RelatedEvents } from '@/components/stage/RelatedEvents';
import { CreatorInfo } from '@/components/stage/CreatorInfo';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();

  // Fetch event details
  const { data: event } = await supabase
    .from('events')
    .select('*, creator:creator_id(*)')
    .eq('id', id)
    .single();

  if (!event) {
    notFound();
  }

  // Check if user has reminder set
  let hasReminder = false;
  if (session) {
    const { data: reminder } = await supabase
      .from('event_reminders')
      .select('id')
      .eq('event_id', id)
      .eq('user_id', session.user.id)
      .single();
    hasReminder = !!reminder;
  }

  // Determine environment based on event genre
  const environment = event.genre === 'music' ? 'music' : 'lounge';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="mb-8">
            {event.thumbnail_url && (
              <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
                <img 
                  src={event.thumbnail_url} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                    {event.genre === 'music' ? '🎵 Music' : event.genre === 'comedy' ? '🎤 Comedy' : '🎭 Performance'}
                  </span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Upcoming
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <CreatorInfo creator={event.creator} />
              </div>
              <div className="flex gap-3">
                <ReminderButton 
                  eventId={event.id} 
                  hasReminder={hasReminder} 
                />
                <ShareEvent url={`/stage/schedule/${event.id}`} title={event.title} />
              </div>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <EventInfo event={event} />
              
              {event.description && (
                <div className="p-6 bg-white/5 rounded-xl">
                  <h2 className="text-lg font-semibold text-white mb-3">
                    About This Performance
                  </h2>
                  <p className="text-white/70 whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Get Ready
                </h3>
                <div className="space-y-3">
                  <AddToCalendar event={event} />
                  <TicketButton event={event} />
                </div>
              </div>
            </div>
          </div>

          {/* Related Events */}
          <RelatedEvents 
            currentEventId={event.id} 
            genre={event.genre} 
          />
        </div>
      </main>
    </Page>
  );
}