// src/app/(hestia)/notifications/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NotificationDetail } from '@/components/asgard/domains/hestia/notifications/NotificationDetail';

export const metadata = { title: 'Notification | Sovereign Sanctuary', description: 'A call for your attention' };

export default function NotificationDetailPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><NotificationDetail /></Page>);
}