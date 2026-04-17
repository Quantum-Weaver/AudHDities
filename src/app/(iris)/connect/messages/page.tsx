// app/(iris)/connect/messages/page.tsx
// The Stream - Direct messages inbox
// Feeling: Connected, organized, responsive

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'The Stream | Sovereign Sanctuary',
  description: 'Your conversations, all in one place'
};

export default async function MessagesPage() {
  return (
    <Page 
      variant={2}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}