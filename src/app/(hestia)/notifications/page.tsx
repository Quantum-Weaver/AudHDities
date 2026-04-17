// app/(hestia)/notifications/page.tsx
// The Pulse - Notifications, updates, activity
// Feeling: Connected, informed, alive

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'What matters now'
};

export default async function NotificationsPage() {
  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}