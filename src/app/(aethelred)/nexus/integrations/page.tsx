// app/(aethelred)/nexus/integrations/page.tsx
// Integrations - External connections
// Feeling: Connected, expansive, powerful

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Integrations | Sovereign Sanctuary',
  description: 'Connect your external services'
};

export default async function IntegrationsPage() {
  return (
    <Page 
      showForeground={false}
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