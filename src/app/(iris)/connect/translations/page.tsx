// app/(iris)/connect/translations/page.tsx
// The Voice - Language settings, translations
// Feeling: Understood, welcomed, global

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Voice | Sovereign Sanctuary',
  description: 'Every language, every voice, welcome here'
};

export default async function TranslationsPage() {
  return (
    <Page 
      variant={1}
      environment="library"
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