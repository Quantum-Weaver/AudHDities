// app/(hestia)/vessel/sanctum/page.tsx
// Sanctum - Settings, privacy, preferences
// Feeling: Safe, protected, personal

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Sanctum | Sovereign Sanctuary',
  description: 'Your private sanctuary within the Sanctuary'
};

export default async function SanctumPage() {
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