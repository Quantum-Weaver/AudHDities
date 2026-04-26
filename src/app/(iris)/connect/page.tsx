// app/(iris)/connect/page.tsx
// The Bridge - Communication hub
// Feeling: Connected, understood, welcomed, celebrated

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Bridge | Sovereign Sanctuary',
  description: 'Where sovereign souls connect'
};

export default async function ConnectPage() {
  return (
    <Page 
      variant={1}
      environment="community"
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