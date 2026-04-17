// app/(prometheus)/studio/effects/page.tsx
// Effects Lab - Magic, particles, glows
// Feeling: Magical, energetic, euphoric

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { EffectBrowser } from '@/components/studio/EffectBrowser';
import { ParameterControls } from '@/components/studio/ParameterControls';
import { PreviewWindow } from '@/components/studio/PreviewWindow';
import { ExportSequence } from '@/components/studio/ExportSequence';
import { ShareButton } from '@/components/studio/ShareButton';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Effects Lab | Sovereign Sanctuary',
  description: 'Create magical effects, particles, and glows'
};

export default async function EffectsLabPage() {
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
              <h1 className="text-2xl font-bold text-white">Effects Lab</h1>
              <p className="text-white/60">Weave magic into your creations</p>
            </div>
            <div className="flex gap-3">
              <ExportSequence />
              <ShareButton />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Preview Area */}
            <div className="lg:col-span-2">
              <PreviewWindow />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <EffectBrowser />
              <ParameterControls />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}