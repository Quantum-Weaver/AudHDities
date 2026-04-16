// app/(prometheus)/studio/video/page.tsx
// Video Studio - Edit, composite, render
// Feeling: Powerful, creative, transformative

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { TimelineEditor } from '@/components/studio/TimelineEditor';
import { ClipTrimmer } from '@/components/studio/ClipTrimmer';
import { TransitionLibrary } from '@/components/studio/TransitionLibrary';
import { TextOverlay } from '@/components/studio/TextOverlay';
import { RenderQueue } from '@/components/studio/RenderQueue';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Video Studio | Sovereign Sanctuary',
  description: 'Edit, composite, and render your videos'
};

export default async function VideoStudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Video Studio</h1>
              <p className="text-white/60">Craft your story frame by frame</p>
            </div>
            <RenderQueue />
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Timeline Area */}
            <div className="lg:col-span-3 space-y-6">
              <TimelineEditor />
              <ClipTrimmer />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TransitionLibrary />
              <TextOverlay />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}