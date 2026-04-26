// app/(iris)/connect/invitations/page.tsx
// Invitations - Invite others, manage referrals
// Feeling: Welcoming, expansive, generous

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Invitations | Sovereign Sanctuary',
  description: 'Welcome others to the Sanctuary'
};

export default async function InvitationsPage() {
  return (
    <Page 
      variant={2}
      environment="community"
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