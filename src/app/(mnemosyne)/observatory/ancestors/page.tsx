// app/(mnemosyne)/observatory/ancestors/page.tsx
// Ancestors - Honoring those who came before
// Feeling: Reverent, grateful, connected across time

import { Page } from '@/components/arrchive/layout/Page';
import { LegacyGrid } from '@/components/observatory/LegacyGrid';
import { ContributorProfiles } from '@/components/observatory/ContributorProfiles';
import { HonorBadges } from '@/components/observatory/HonorBadges';
import { StoryCards } from '@/components/observatory/StoryCards';
import { MemorialSection } from '@/components/observatory/MemorialSection';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'Ancestors | Sovereign Sanctuary',
  description: 'Honoring those who came before. Their legacy continues.'
};

export default async function AncestorsPage() {
  const supabase = await createServerSupabase();
  
  // Fetch founding contributors
  const { data: foundingContributors } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_founding_member', true)
    .order('created_at', { ascending: true })
    .limit(20);
  
  // Fetch legacy stories
  const { data: legacyStories } = await supabase
    .from('legacy_stories')
    .select('*')
    .eq('is_published', true)
    .order('date', { ascending: false });
  
  // Fetch ancestors (users who have passed on but left legacy)
  const { data: ancestors } = await supabase
    .from('ancestors')
    .select('*')
    .eq('is_honored', true)
    .order('legacy_score', { ascending: false });

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
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-2">
              <a href="/observatory" className="hover:text-white">Observatory</a>
              <span>→</span>
              <span className="text-white">Ancestors</span>
            </div>
            <div className="text-6xl mb-4">🕯️</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ancestors
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Honoring those who came before. Their legacy continues.
            </p>
          </div>

          {/* Memorial Section */}
          <div className="mb-12">
            <MemorialSection ancestors={ancestors || []} />
          </div>

          {/* Founding Contributors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Founding Contributors
            </h2>
            <ContributorProfiles contributors={foundingContributors || []} />
          </div>

          {/* Legacy Stories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Legacy Stories
            </h2>
            <StoryCards stories={legacyStories || []} />
          </div>

          {/* Honor Badges */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Eternal Honors
            </h2>
            <HonorBadges />
          </div>

          {/* Legacy Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              All Who Built the Sanctuary
            </h2>
            <LegacyGrid />
          </div>

          {/* Ancestor Candle */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <span className="text-yellow-400 animate-pulse">🕯️</span>
              <span className="text-sm text-white/40">Their light guides us still</span>
              <span className="text-yellow-400 animate-pulse">🕯️</span>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}