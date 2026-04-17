// app/(themis)/council/delegation/page.tsx
// Delegation - Delegate votes to trusted curators
// Feeling: Trusting, wise, collaborative

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Delegation | Sovereign Sanctuary',
  description: 'Trust your voice to those who share your values'
};

export default async function DelegationPage() {
  return (
    <Page 
      variant={2}
      environment="council"
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