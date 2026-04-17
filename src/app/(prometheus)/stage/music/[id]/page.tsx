// app/(prometheus)/stage/music/[id]/page.tsx
// Music Performance - Single music performance view
// Feeling: Euphoric, connected, transcendent

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { VideoPlayer } from '@/components/stage/VideoPlayer';
import { Setlist } from '@/components/stage/Setlist';
import { ChatRoom } from '@/components/stage/ChatRoom';
import { TipJar } from '@/components/stage/TipJar';
import { EncoreVote } from '@/components/stage/EncoreVote';
import { SocialShare } from '@/components/stage/SocialShare';
import { createServerSupabase } from '@/lib/supabase/server';

interface MusicPerformancePageProps {
  params: Promise<{ id: string }>;
}

export default async function MusicPerformancePage({ params }: MusicPerformancePageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: performance } = await supabase
    .from('events')
    .select('*, creator:creator_id(*), setlist:songs(*)')
    .eq('id', id)
    .single();

  if (!performance) {
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
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer 
                streamKey={performance.stream_key}
                title={performance.title}
              />
              <Setlist songs={performance.setlist || []} />
              <EncoreVote eventId={performance.id} />
            </div>

            <div className="space-y-6">
              <TipJar creatorId={performance.creator_id} eventId={performance.id} />
              <ChatRoom eventId={performance.id} />
              <SocialShare url={`/stage/music/${performance.id}`} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}