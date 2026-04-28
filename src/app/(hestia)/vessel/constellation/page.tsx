// app/(hestia)/vessel/constellation/page.tsx
// Constellation - Connection map, collaboration web
// Feeling: Connected, expansive, cosmic

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Constellation | Sovereign Sanctuary',
  description: 'Your web of connections'
};

export default async function ConstellationPage() {
  return (
    <Page 
      variant={1}
      environment="observatory"
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