// app/(prometheus)/studio/video/page.tsx

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Video Studio | Sovereign Sanctuary',
  description: 'Craft your story frame by frame'
};

export default async function VideoStudioPage() {
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