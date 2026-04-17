// app/(prometheus)/stage/recordings/[id]/page.tsx
// Recording - Single recorded performance view
// Feeling: Intimate, warm, reflective

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { VideoPlayer } from '@/components/stage/VideoPlayer';
import { CommentsSection } from '@/components/stage/CommentsSection';
import { LikeButton } from '@/components/stage/LikeButton';
import { ShareOptions } from '@/components/stage/ShareOptions';
import { CreatorInfo } from '@/components/stage/CreatorInfo';
import { createServerSupabase } from '@/lib/supabase/server';

interface RecordingPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecordingPage({ params }: RecordingPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: recording } = await supabase
    .from('event_recordings')
    .select('*, event:event_id(*), creator:creator_id(*)')
    .eq('id', id)
    .single();

  if (!recording) {
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
          
          {/* Video Player */}
          <div className="mb-6">
            <VideoPlayer 
              url={recording.video_url} 
              title={recording.title}
              poster={recording.thumbnail_url}
            />
          </div>

          {/* Title & Actions */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {recording.title}
              </h1>
              <CreatorInfo creator={recording.creator} />
            </div>
            <div className="flex gap-3">
              <LikeButton recordingId={recording.id} initialLikes={recording.likes} />
              <ShareOptions url={`/stage/recordings/${recording.id}`} />
            </div>
          </div>

          {/* Description */}
          {recording.description && (
            <div className="mb-8 p-4 bg-white/5 rounded-lg">
              <p className="text-white/80">{recording.description}</p>
            </div>
          )}

          {/* Comments */}
          <CommentsSection recordingId={recording.id} />
        </div>
      </main>
    </Page>
  );
}