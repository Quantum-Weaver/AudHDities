// app/(aethelred)/nexus/api/page.tsx
// The Gateway - API documentation, developer portal
// Feeling: Powerful, accessible, expansive

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Gateway | Sovereign Sanctuary',
  description: 'Build on the Sanctuary'
};

export default async function APIPage() {
  return (
    <Page 
      variant={1}
      environment="library"
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