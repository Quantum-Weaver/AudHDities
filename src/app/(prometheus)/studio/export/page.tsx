// app/(prometheus)/studio/export/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'The Gateway | Sovereign Sanctuary',
  description: 'Your creation, ready for the world'
};

export default async function ExportPage() {
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