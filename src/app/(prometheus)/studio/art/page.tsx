// app/(prometheus)/studio/art/page.tsx
// Art Studio - Draw, paint, design
// Feeling: Creative, fluid, expressive

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { Canvas } from '@/components/studio/Canvas';
import { BrushTool } from '@/components/studio/BrushTool';
import { ColorPicker } from '@/components/studio/ColorPicker';
import { LayerPanel } from '@/components/studio/LayerPanel';
import { UndoRedo } from '@/components/studio/UndoRedo';
import { ExportOptions } from '@/components/studio/ExportOptions';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Art Studio | Sovereign Sanctuary',
  description: 'Draw, paint, and design your vision'
};

export default async function ArtStudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={2}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Art Studio</h1>
              <p className="text-white/60">Paint your reality</p>
            </div>
            <div className="flex gap-3">
              <UndoRedo />
              <ExportOptions />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Canvas Area */}
            <div className="lg:col-span-3">
              <Canvas />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <BrushTool />
              <ColorPicker />
              <LayerPanel />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}