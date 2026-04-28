// app/(hephaestus)/careers/page.tsx
// The Calling - Job listings, opportunities
// Feeling: Hopeful, purposeful, inviting

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Calling | Sovereign Sanctuary',
  description: 'Join us in weaving a new reality'
};

export default async function CareersPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}