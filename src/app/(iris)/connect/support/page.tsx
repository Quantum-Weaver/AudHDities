// app/(iris)/connect/support/page.tsx
// The Healing Flame - Support requests, crisis resources
// Feeling: Safe, gentle, healing, restorative

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Healing Flame | Sovereign Sanctuary',
  description: 'You are not alone. We are here for you.'
};

export default async function SupportPage() {
  return (
    <Page 
      variant={1}
      environment="support"
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