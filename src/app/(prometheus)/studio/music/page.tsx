// app/(prometheus)/studio/music/page.tsx
// Music Studio - Compose, record, produce music
// Feeling: Flow, creative, euphoric

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { DAWInterface } from '@/components/studio/DAWInterface';
import { TrackList } from '@/components/studio/TrackList';
import { MidiController } from '@/components/studio/MidiController';
import { EffectRack } from '@/components/studio/EffectRack';
import { ExportButton } from '@/components/studio/ExportButton';
import { SaveButton } from '@/components/studio/SaveButton';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Music Studio | Sovereign Sanctuary',
  description: 'Create, record, and produce your music'
};

export default async function MusicStudioPage() {
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
              <h1 className="text-2xl font-bold text-white">Music Studio</h1>
              <p className="text-white/60">Where sound becomes substance</p>
            </div>
            <div className="flex gap-3">
              <SaveButton />
              <ExportButton />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main DAW Area */}
            <div className="lg:col-span-3 space-y-6">
              <DAWInterface />
              <TrackList />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <MidiController />
              <EffectRack />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}