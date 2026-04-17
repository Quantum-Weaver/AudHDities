// app/(iris)/connect/channels/[id]/page.tsx
// Channel View - Single channel view
// Feeling: Connected, engaged, communal

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { MessageFeed } from '@/components/connect/MessageFeed';
import { MemberList } from '@/components/connect/MemberList';
import { ChannelInfo } from '@/components/connect/ChannelInfo';
import { PinnedMessages } from '@/components/connect/PinnedMessages';
import { NotificationSettings } from '@/components/connect/NotificationSettings';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ChannelViewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChannelViewPage({ params }: ChannelViewPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: channel } = await supabase
    .from('channels')
    .select('*, members:members(*), category:categories(*)')
    .eq('id', id)
    .single();

  if (!channel) {
    notFound();
  }

  // Check if user is member (for private channels)
  if (!channel.is_public && session) {
    const { data: isMember } = await supabase
      .from('channel_members')
      .select('id')
      .eq('channel_id', id)
      .eq('user_id', session.user.id)
      .single();
    
    if (!isMember) {
      redirect('/connect/channels');
    }
  }

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
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content - Messages */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">
                    #{channel.name}
                  </h2>
                  <p className="text-white/60 text-sm">{channel.description}</p>
                </div>
                <MessageFeed channelId={channel.id} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <ChannelInfo channel={channel} />
              <PinnedMessages channelId={channel.id} />
              <MemberList channelId={channel.id} />
              {session && <NotificationSettings channelId={channel.id} />}
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}