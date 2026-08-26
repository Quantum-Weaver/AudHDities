// app/(prometheus)/stage/studio/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Studio | Sovereign Sanctuary',
  description: 'Prepare your performance'
};

export default async function StudioPage() {
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