// app/(prometheus)/studio/export/page.tsx
// The Gateway - Export, publish, share across platforms
// Feeling: Connected, expansive, liberating

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { FormatSelector } from '@/components/studio/FormatSelector';
import { QualitySettings } from '@/components/studio/QualitySettings';
import { PlatformPresets } from '@/components/studio/PlatformPresets';
import { PublishOptions } from '@/components/studio/PublishOptions';
import { DownloadButton } from '@/components/studio/DownloadButton';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Gateway | Sovereign Sanctuary',
  description: 'Export and share your creations with the world'
};

export default async function ExportPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Gateway
            </h1>
            <p className="text-white/60">
              Your creation, ready for the world
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 space-y-8">
            <FormatSelector />
            <QualitySettings />
            <PlatformPresets />
            <PublishOptions />
            
            <div className="pt-4 flex justify-center">
              <DownloadButton />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}