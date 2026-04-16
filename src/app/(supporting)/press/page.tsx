// app/(supporting)/press/page.tsx
// The Scroll - Press kit, media resources
// Feeling: Professional, informative, accessible

import { Page } from '@/components/arrchive/layout/Page';
import { PressKit } from '@/components/supporting/PressKit';
import { MediaAssets } from '@/components/supporting/MediaAssets';
import { LogoDownloads } from '@/components/supporting/LogoDownloads';
import { InterviewRequests } from '@/components/supporting/InterviewRequests';
import { CoverageHighlights } from '@/components/supporting/CoverageHighlights';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Press kit and media resources'
};

export default async function PressPage() {
  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Scroll
            </h1>
            <p className="text-white/60">
              Resources for media and storytellers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PressKit />
              <MediaAssets />
              <CoverageHighlights />
            </div>
            <div className="space-y-8">
              <LogoDownloads />
              <InterviewRequests />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}