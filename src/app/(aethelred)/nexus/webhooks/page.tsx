// app/(aethelred)/nexus/webhooks/page.tsx
// The Pulse - Webhook management
// Feeling: Responsive, connected, automated

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'Manage your webhook endpoints'
};

export default async function WebhooksPage() {
  return (
    <Page 
      variant={2}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}