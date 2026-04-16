// app/(mnemosyne)/observatory/prophecy/page.tsx
// The Vision - Future possibilities
// Feeling: Visionary, hopeful, expansive

import { Page } from '@/components/arrchive/layout/Page';
import { FutureProjections } from '@/components/observatory/FutureProjections';
import { PossibilityTree } from '@/components/observatory/PossibilityTree';
import { ProbabilityMeter } from '@/components/observatory/ProbabilityMeter';
import { VisionStatement } from '@/components/observatory/VisionStatement';
import { CommunityVotes } from '@/components/observatory/CommunityVotes';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Vision | Sovereign Sanctuary',
  description: 'Possible futures. Potential paths. What could be.'
};

export default async function ProphecyPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  let futureScenarios: any[] = [];
  let communityPredictions: any[] = [];
  
  // Fetch future projections
  const { data: scenarios } = await supabase
    .from('future_scenarios')
    .select('*')
    .eq('is_active', true)
    .order('probability', { ascending: false });
  
  futureScenarios = scenarios || [];
  
  if (session) {
    // Fetch user's votes on predictions
    const { data: votes } = await supabase
      .from('prediction_votes')
      .select('*, prediction:prediction_id(*)')
      .eq('user_id', session.user.id);
    
    communityPredictions = votes || [];
  }

  return (
    <Page 
      variant={1}
      environment="observatory"
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
              <span className="text-white">The Vision</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Vision
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Possible futures. Potential paths. What could be.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="mb-12">
            <VisionStatement />
          </div>

          {/* Future Projections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Future Projections
            </h2>
            <FutureProjections scenarios={futureScenarios} />
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column: Possibility Tree */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🌳</span> Possibility Tree
              </h2>
              <p className="text-white/50 text-sm mb-4">
                Every decision branches into new possibilities
              </p>
              <PossibilityTree />
            </div>

            {/* Right Column: Probability Meter */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span> Probability Meter
              </h2>
              <p className="text-white/50 text-sm mb-4">
                Community consensus on likely outcomes
              </p>
              <ProbabilityMeter predictions={futureScenarios} />
            </div>
          </div>

          {/* Community Voting */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🗳️</span> Community Vision
            </h2>
            <p className="text-white/50 text-sm mb-4">
              Shape the future by voting on predictions
            </p>
            <CommunityVotes 
              predictions={futureScenarios} 
              userVotes={communityPredictions}
              isAuthenticated={!!session}
            />
          </div>

          {/* Vision Note */}
          <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
            <p className="text-purple-400 text-sm">
              The future is not fixed. Every action, every creation, every connection shapes what becomes.
            </p>
          </div>
        </div>
      </main>
    </Page>
  );
}