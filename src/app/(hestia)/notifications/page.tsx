// src/app/(hestia)/notifications/page.tsx
import { Page } from '@/components/bifrost/Page';
import { NotificationsList } from '@/components/asgard/domains/hestia/notifications/NotificationsList';

export const metadata = {
  title: 'The Call | Sovereign Sanctuary',
  description: 'What seeks your attention',
};

export default function NotificationsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><NotificationsList /></Page>);
}