// app/(aethelred)/nexus/status/page.tsx
// The Health - System status, health metrics
// Feeling: Secure, transparent, reliable

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Health | Sovereign Sanctuary',
  description: 'Sanctuary system status'
};

export default async function StatusPage() {
  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}