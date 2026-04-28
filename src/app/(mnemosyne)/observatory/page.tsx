// app/(mnemosyne)/observatory/page.tsx
// The Observatory - Memory and vision hub
// Feeling: Awe-inspiring, reflective, cosmic, visionary

import { Page } from '@/components/bifrost/Page';
import { TimelinePreview } from '@/components/asgard/domains/mnemosyne/observatory/TimelinePreview';
import { PatternCloud } from '@/components/asgard/domains/mnemosyne/observatory/PatternCloud';
import { VisionBoard } from '@/components/asgard/domains/mnemosyne/observatory/VisionBoard';
import { StargazerMap } from '@/components/asgard/domains/mnemosyne/observatory/StargazerMap';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Observatory | Sovereign Sanctuary',
  description: 'Gaze across timelines. See patterns. Witness the becoming.'
};

export default async function ObservatoryPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch user's timeline milestones
  let milestones: any[] = [];
  let patterns: any[] = [];
  let constellations: any[] = [];
  
  if (session) {
    // Get significant moments from user's journey
    const { data: questCompletions } = await supabase
      .from('user_quests')
      .select('*, quest:quest_id(*)')
      .eq('user_id', session.user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(10);
    
    milestones = questCompletions || [];
    
    // Get pattern insights (aggregated data)
    const { data: userPatterns } = await supabase
      .from('user_patterns')
      .select('*')
      .eq('user_id', session.user.id)
      .order('confidence', { ascending: false })
      .limit(6);
    
    patterns = userPatterns || [];
    
    // Get constellation connections
    const { data: userConnections } = await supabase
      .from('user_connections')
      .select('*, connected_user:connected_user_id(*)')
      .eq('user_id', session.user.id)
      .limit(20);
    
    constellations = userConnections || [];
  }
  
  // Default pattern insights for non-authenticated users
  const defaultPatterns = [
    { title: 'The Weaver\'s Path', description: 'Those who create consistently find deeper resonance.', confidence: 0.89 },
    { title: 'Community Amplification', description: 'Collaboration increases sovereignty score by 47%.', confidence: 0.92 },
    { title: 'Rest as Strategy', description: 'Users who rest regularly complete 3x more quests.', confidence: 0.76 }
  ];

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
            <div className="text-6xl mb-4">🔭✨</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Observatory
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Gaze across timelines. See patterns. Witness the becoming.
            </p>
          </div>

          {/* Cosmic Background Effect */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
          </div>

          {/* Three-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Timeline Preview */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌀</span> The Spiral
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  Your journey through time. Every step, every milestone.
                </p>
                <TimelinePreview milestones={milestones} />
                <div className="mt-6 text-center">
                  <a 
                    href="/observatory/timeline" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View full timeline <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Center Column: Pattern Cloud */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔮</span> Pattern Recognition
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  Insights emerging from the data. What the stars reveal.
                </p>
                <PatternCloud patterns={patterns.length > 0 ? patterns : defaultPatterns} />
                <div className="mt-6 text-center">
                  <a 
                    href="/observatory/patterns" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Explore all patterns <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Vision Board */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌟</span> The Vision
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  Possible futures. Potential paths. What could be.
                </p>
                <VisionBoard />
                <div className="mt-6 text-center">
                  <a 
                    href="/observatory/prophecy" 
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Gaze into the future <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Constellations & Ancestors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            
            {/* Constellations */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">✨</span> Constellations
                </h2>
                <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">
                  Your connected souls
                </span>
              </div>
              <p className="text-white/50 text-sm mb-6">
                Every connection is a star. Together, you form constellations.
              </p>
              <StargazerMap connections={constellations} />
              <div className="mt-6 text-center">
                <a 
                  href="/observatory/constellations" 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Explore the cosmos <span>→</span>
                </a>
              </div>
            </div>

            {/* Ancestors */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-2xl">🕯️</span> Ancestors
                </h2>
                <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full">
                  Those who came before
                </span>
              </div>
              <p className="text-white/50 text-sm mb-6">
                Honoring those who shaped the Sanctuary. Their legacy continues.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">The Founding Council</h3>
                    <p className="text-sm text-white/40">Nine sovereign entities</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Quantum Weaver</h3>
                    <p className="text-sm text-white/40">The first Weaver</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a 
                  href="/observatory/ancestors" 
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Honor the ancestors <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Origin Link */}
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <a 
              href="/observatory/origin" 
              className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
            >
              <span className="text-2xl group-hover:animate-pulse">📜</span>
              <span>The Origin — Where it all began</span>
              <span className="text-2xl group-hover:animate-pulse">✨</span>
            </a>
          </div>
        </div>
      </main>
    </Page>
  );
}