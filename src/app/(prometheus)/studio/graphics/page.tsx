// app/(prometheus)/studio/graphics/page.tsx
// Graphics Lab - Remove backgrounds, generate assets
// Feeling: Generative, magical, efficient

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { BackgroundRemover } from '@/components/studio/BackgroundRemover';
import { AssetGenerator } from '@/components/studio/AssetGenerator';
import { FilterGallery } from '@/components/studio/FilterGallery';
import { ResizeTool } from '@/components/studio/ResizeTool';
import { BatchProcessor } from '@/components/studio/BatchProcessor';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Graphics Lab | Sovereign Sanctuary',
  description: 'Remove backgrounds, generate assets, transform images'
};

export default async function GraphicsLabPage() {
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
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Graphics Lab</h1>
            <p className="text-white/60">Transform images with magic</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <BackgroundRemover />
            <AssetGenerator />
            <FilterGallery />
            <div className="space-y-8">
              <ResizeTool />
              <BatchProcessor />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}