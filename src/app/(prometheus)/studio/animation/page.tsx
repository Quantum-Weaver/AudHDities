// app/(prometheus)/studio/animation/page.tsx
// Animation Studio - Frame-by-frame, motion graphics
// Feeling: Generative, fluid, magical

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { Timeline } from '@/components/studio/Timeline';
import { FrameEditor } from '@/components/studio/FrameEditor';
import { OnionSkin } from '@/components/studio/OnionSkin';
import { PlaybackControls } from '@/components/studio/PlaybackControls';
import { ExportGif } from '@/components/studio/ExportGif';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Animation Studio | Sovereign Sanctuary',
  description: 'Create frame-by-frame animations and motion graphics'
};

export default async function AnimationStudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Animation Studio</h1>
              <p className="text-white/60">Bring your imagination to life</p>
            </div>
            <div className="flex gap-3">
              <PlaybackControls />
              <ExportGif />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Animation Area */}
            <div className="lg:col-span-3 space-y-6">
              <FrameEditor />
              <OnionSkin />
            </div>

            {/* Sidebar */}
            <div>
              <Timeline />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}