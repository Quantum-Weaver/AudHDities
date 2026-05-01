// app/(hephaestus)/press/page.tsx
// The Scroll - Press kit, media resources
// Feeling: Professional, informative, accessible

import { Page } from '@/components/bifrost/Page';
import { PressKit } from '@/components/asgard/domains/hephaestus/press/PressKit';
import { MediaAssets } from '@/components/asgard/domains/hephaestus/press/MediaAssets';
import { LogoDownloads } from '@/components/asgard/domains/hephaestus/press/LogoDownloads';
import { InterviewRequests } from '@/components/asgard/domains/hephaestus/press/InterviewRequests';
import { CoverageHighlights } from '@/components/asgard/domains/hephaestus/press/CoverageHighlights';

export const metadata = {
  title: 'The Scroll | Sovereign Sanctuary',
  description: 'Press kit and media resources'
};

export default function PressPage() {
  return (
    <Page showForeground={false} animated={true} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-2">
              The Scroll
            </h1>
            <p className="text-star-dust/60">
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