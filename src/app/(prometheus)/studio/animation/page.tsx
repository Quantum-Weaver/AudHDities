// app/(prometheus)/studio/animation/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Animation Studio | Sovereign Sanctuary',
  description: 'Bring your imagination to life'
};

export default async function AnimationStudioPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
        </div>
      </main>
    </Page>
  );
}