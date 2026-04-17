// app/(prometheus)/stage/comedy/[id]/page.tsx
// Comedy Special - Single comedy performance view
// Feeling: Joyful, intimate, hilarious

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { VideoPlayer } from '@/components/stage/VideoPlayer';
import { JokeMeter } from '@/components/stage/JokeMeter';
import { AudienceReactions } from '@/components/stage/AudienceReactions';
import { BehindTheScenes } from '@/components/stage/BehindTheScenes';
import { MerchLinks } from '@/components/stage/MerchLinks';
import { createServerSupabase } from '@/lib/supabase/server';

interface ComedySpecialPageProps {
  params: Promise<{ id: string }>;
}

export default async function ComedySpecialPage({ params }: ComedySpecialPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: special } = await supabase
    .from('event_recordings')
    .select('*, event:event_id(*), creator:creator_id(*)')
    .eq('id', id)
    .eq('genre', 'comedy')
    .single();

  if (!special) {
    notFound();
  }

  return (
    <Page 
      variant={1}
      environment="lounge"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <VideoPlayer 
            url={special.video_url} 
            title={special.title}
          />

          <div className="mt-6 space-y-6">
            <h1 className="text-2xl font-bold text-white">{special.title}</h1>
            <JokeMeter recordingId={special.id} />
            <AudienceReactions recordingId={special.id} />
            <BehindTheScenes recordingId={special.id} />
            <MerchLinks creatorId={special.creator_id} />
          </div>
        </div>
      </main>
    </Page>
  );
}