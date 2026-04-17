// app/(hestia)/page.tsx
// The Hearth - Welcome to the Sovereign Sanctuary
// Feeling: Warm, welcoming, safe, reflective

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Hearth | Sovereign Sanctuary',
  description: 'Welcome to your sanctuary'
};

export default async function HearthPage() {
  return (
    <Page 
      variant={1}
      environment="home"
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