// app/(supporting)/about/page.tsx
// The Origin - Story of the Sanctuary
// Feeling: Sacred, inspiring, authentic

import { Page } from '@/components/arrchive/layout/Page';
import { StoryTimeline } from '@/components/supporting/StoryTimeline';
import { PrincipleCards } from '@/components/supporting/PrincipleCards';
import { FounderMessage } from '@/components/supporting/FounderMessage';
import { TeamGrid } from '@/components/supporting/TeamGrid';
import { MilestoneMap } from '@/components/supporting/MilestoneMap';

export const metadata = {
  title: 'The Origin | Sovereign Sanctuary',
  description: 'The story of how the Sanctuary came to be'
};

export default async function AboutPage() {
  return (
    <Page 
      variant={1}
      environment="origin"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Origin
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <FounderMessage />
          
          <div className="my-12">
            <StoryTimeline />
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Our Principles
            </h2>
            <PrincipleCards />
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Our Journey
            </h2>
            <MilestoneMap />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              The Council
            </h2>
            <TeamGrid />
          </div>
        </div>
      </main>
    </Page>
  );
}