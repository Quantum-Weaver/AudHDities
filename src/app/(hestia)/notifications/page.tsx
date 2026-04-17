// app/(hestia)/notifications/page.tsx
// The Pulse - Notifications, updates
// Feeling: Connected, informed, responsive
// Environment: community (social awareness)

import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { NotificationList } from '@/components/hestia/NotificationList';
import { FilterTabs } from '@/components/hestia/FilterTabs';
import { MarkAllRead } from '@/components/hestia/MarkAllRead';
import { PriorityBadges } from '@/components/hestia/PriorityBadges';
import { ActionButtons } from '@/components/hestia/ActionButtons';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'Your notifications'
};

export default async function NotificationsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  // Community environment for social awareness
  const environment = 'community';

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
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                The Pulse
              </h1>
              <p className="text-white/60">
                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            </div>
            <MarkAllRead />
          </div>

          <FilterTabs />
          <PriorityBadges />

          <NotificationList notifications={notifications || []} />

          <div className="mt-6 flex justify-center">
            <ActionButtons />
          </div>
        </div>
      </main>
    </Page>
  );
}