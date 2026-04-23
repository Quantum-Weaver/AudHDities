// app/(supporting)/accessibility/page.tsx
// The Welcome - Accessibility statement, accommodations
// Feeling: Welcoming, inclusive, caring

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Welcome | Sovereign Sanctuary',
  description: 'Everyone belongs here'
};

export default async function AccessibilityPage() {
  return (
    <Page 
      variant={2}
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