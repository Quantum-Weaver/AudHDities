// app/(iris)/connect/page.tsx
// The Bridge - Communication hub
// Feeling: Connected, understood, welcomed, celebrated

import { Page } from '@/components/arrchive/layout/Page';
import { MessageSummary } from '@/components/connect/MessageSummary';
import { ChannelList } from '@/components/connect/ChannelList';
import { OnlineFriends } from '@/components/connect/OnlineFriends';
import { RecentActivity } from '@/components/connect/RecentActivity';
import { StatusIndicator } from '@/components/connect/StatusIndicator';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Bridge | Sovereign Sanctuary',
  description: 'Connect with the community'
};

export default async function ConnectPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  // Fetch unread message count
  let unreadCount = 0;
  if (session) {
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', session.user.id)
      .eq('is_read', false);
    unreadCount = count || 0;
  }

  // Fetch online friends (simplified - would use presence in production)
  const { data: onlineUsers } = await supabase
    .from('presence')
    .select('user_id, profiles(*)')
    .eq('is_online', true)
    .limit(10);

  // Fetch recent activity
  const { data: recentActivity } = await supabase
    .from('activity')
    .select('*, user:user_id(*)')
    .order('created_at', { ascending: false })
    .limit(20);

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
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Bridge
            </h1>
            <p className="text-white/60">
              Where sovereign souls connect
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <MessageSummary unreadCount={unreadCount} />
              <RecentActivity activities={recentActivity || []} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <StatusIndicator />
              <ChannelList />
              <OnlineFriends users={onlineUsers || []} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}