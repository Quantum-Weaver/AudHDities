// app/(prometheus)/studio/audio/page.tsx
// Audio Studio - Podcast, voiceover, sound design
// Feeling: Focused, precise, powerful

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { WaveformEditor } from '@/components/studio/WaveformEditor';
import { TrackRecorder } from '@/components/studio/TrackRecorder';
import { EffectChain } from '@/components/studio/EffectChain';
import { NoiseReduction } from '@/components/studio/NoiseReduction';
import { ExportAudio } from '@/components/studio/ExportAudio';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Audio Studio | Sovereign Sanctuary',
  description: 'Record, edit, and master your audio'
};

export default async function AudioStudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={2}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Audio Studio</h1>
              <p className="text-white/60">Shape sound with precision</p>
            </div>
            <ExportAudio />
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Waveform Area */}
            <div className="lg:col-span-3 space-y-6">
              <WaveformEditor />
              <TrackRecorder />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <EffectChain />
              <NoiseReduction />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}