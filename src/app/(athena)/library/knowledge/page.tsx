// app/(athena)/library/knowledge/page.tsx
// The Archive - Knowledge base, documentation
// Feeling: Sacred, vast, discoverable

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Archive | Sovereign Sanctuary',
  description: 'Preserved wisdom'
};

export default async function KnowledgePage() {
  return (
    <Page 
      variant={2}
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