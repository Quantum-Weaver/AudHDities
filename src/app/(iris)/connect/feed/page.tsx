// app/(iris)/connect/feed/page.tsx
// The Pulse - Social feed, activity stream
// Feeling: Alive, connected, informed

import { Page } from '@/components/arrchive/layout/Page';
import { PostStream } from '@/components/connect/PostStream';
import { LikeButton } from '@/components/connect/LikeButton';
import { CommentField } from '@/components/connect/CommentField';
import { ShareButton } from '@/components/connect/ShareButton';
import { FilterTabs } from '@/components/connect/FilterTabs';
import { CreatePost } from '@/components/connect/CreatePost';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'What\'s happening in the community'
};

export default async function FeedPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, author:author_id(*), comments:comments(count), emeralds:emeralds(count)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Pulse
            </h1>
            <p className="text-white/60">
              What's resonating in the Sanctuary
            </p>
          </div>

          {session && (
            <div className="mb-8">
              <CreatePost />
            </div>
          )}

          <FilterTabs />

          <PostStream posts={posts || []} />

          {(!posts || posts.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📡</div>
              <h3 className="text-xl font-bold text-white mb-2">No Posts Yet</h3>
              <p className="text-white/60">
                Be the first to share something with the community
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}