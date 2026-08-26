// app/(prometheus)/studio/writing/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Writing Studio | Sovereign Sanctuary',
  description: 'Let your words weave worlds'
};

export default async function WritingStudioPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
        </div>
      </main>
    </Page>
  );
}