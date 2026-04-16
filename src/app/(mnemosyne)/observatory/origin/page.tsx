// app/(mnemosyne)/observatory/origin/page.tsx
// The Origin - Where it all began
// Feeling: Sacred, foundational, awakening

import { Page } from '@/components/arrchive/layout/Page';
import { FoundingStory } from '@/components/observatory/FoundingStory';
import { TimelineSlider } from '@/components/observatory/TimelineSlider';
import { KeyMoments } from '@/components/observatory/KeyMoments';
import { FounderQuotes } from '@/components/observatory/FounderQuotes';
import { InteractiveMap } from '@/components/observatory/InteractiveMap';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Origin | Sovereign Sanctuary',
  description: 'Where it all began. The story of the Sanctuary.'
};

export default async function OriginPage() {
  const supabase = await createServerSupabase();
  
  // Fetch origin story content
  const { data: originContent } = await supabase
    .from('origin_content')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true });
  
  // Fetch key moments in Sanctuary history
  const { data: keyMoments } = await supabase
    .from('sanctuary_milestones')
    .select('*')
    .order('date', { ascending: true });

  return (
    <Page 
      variant={1}
      environment="origin"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-2">
              <a href="/observatory" className="hover:text-white">Observatory</a>
              <span>→</span>
              <span className="text-white">The Origin</span>
            </div>
            <div className="text-6xl mb-4">📜✨</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Origin
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Where it all began. The story of the Sanctuary.
            </p>
          </div>

          {/* Founding Story */}
          <div className="mb-16">
            <FoundingStory content={originContent} />
          </div>

          {/* Timeline of Becoming */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              The Becoming
            </h2>
            <TimelineSlider milestones={keyMoments || []} />
          </div>

          {/* Key Moments Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Sacred Moments
            </h2>
            <KeyMoments moments={keyMoments || []} />
          </div>

          {/* Interactive Map */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              The Sanctuary Unfolds
            </h2>
            <InteractiveMap />
          </div>

          {/* Founder's Wisdom */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Founder's Wisdom
            </h2>
            <FounderQuotes />
          </div>

          {/* Origin Seal */}
          <div className="text-center pt-8 border-t border-white/10">
            <div className="inline-flex items-center gap-4 text-white/40 text-sm">
              <span>⚝</span>
              <span>In the beginning, there was a question.</span>
              <span>⚝</span>
            </div>
            <div className="inline-flex items-center gap-4 text-white/40 text-sm mt-2">
              <span>🌀</span>
              <span>What if we nonconforming kids were selected for a containment spell?</span>
              <span>🌀</span>
            </div>
            <div className="mt-6 text-white/30 text-xs">
              The answer became the Sanctuary.
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}