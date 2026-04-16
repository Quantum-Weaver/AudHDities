// app/(prometheus)/stage/live/[id]/page.tsx
// Performance - Single live performance view
// Feeling: Euphoric, connected, immersive

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { LivePlayer } from '@/components/stage/LivePlayer';
import { LiveChat } from '@/components/stage/LiveChat';
import { TipJar } from '@/components/stage/TipJar';
import { PerformanceInfo } from '@/components/stage/PerformanceInfo';
import { createServerSupabase } from '@/lib/supabase/server';

interface PerformancePageProps {
  params: Promise<{ id: string }>;
}

export default async function PerformancePage({ params }: PerformancePageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: event } = await supabase
    .from('events')
    .select('*, creator:creator_id(*), stream_key')
    .eq('id', id)
    .single();

  if (!event) {
    notFound();
  }

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
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Video Player */}
            <div className="lg:col-span-2 space-y-6">
              <LivePlayer 
                streamKey={event.stream_key} 
                title={event.title}
              />
              <PerformanceInfo event={event} />
            </div>

            {/* Sidebar - Chat & Tips */}
            <div className="space-y-6">
              <TipJar creatorId={event.creator_id} eventId={event.id} />
              <LiveChat eventId={event.id} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}