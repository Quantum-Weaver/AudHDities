// app/(hestia)/notifications/[id]/page.tsx
// Notification Detail - Single notification view
// Feeling: Informed, responsive, clear

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { NotificationView } from '@/components/hestia/NotificationView';
import { RelatedNotifications } from '@/components/hestia/RelatedNotifications';
import { ActionButtons } from '@/components/hestia/ActionButtons';
import { MarkReadButton } from '@/components/hestia/MarkReadButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface NotificationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotificationDetailPage({ params }: NotificationDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch the notification
  const { data: notification } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single();

  if (!notification) {
    notFound();
  }

  // Mark as read if not already
  if (!notification.is_read) {
    await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id);
  }

  // Fetch related notifications (same type or around same time)
  const { data: related } = await supabase
    .from('notifications')
    .select('id, title, created_at, type')
    .eq('user_id', session.user.id)
    .neq('id', id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Community environment for notifications
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
        <div className="container max-w-3xl mx-auto px-6">
          
          <div className="flex justify-between items-center mb-6">
            <MarkReadButton notificationId={id} isRead={true} />
            <ActionButtons notificationId={id} />
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 mb-8">
            <NotificationView notification={notification} />
          </div>

          {related && related.length > 0 && (
            <RelatedNotifications notifications={related} />
          )}
        </div>
      </main>
    </Page>
  );
}