// app/(mnemosyne)/observatory/timeline/page.tsx
// The Spiral - Personal journey timeline
// Feeling: Reflective, progressive, spiral-bound

import { Page } from '@/components/bifrost/Page';
import { InteractiveTimeline } from '@/components/asgard/domains/mnemosyne/observatory/InteractiveTimeline';
import { MilestoneMarker } from '@/components/asgard/domains/mnemosyne/observatory/MilestoneMarker';
import { EraLabels } from '@/components/asgard/domains/mnemosyne/observatory/EraLabels';
import { ZoomControls } from '@/components/asgard/domains/mnemosyne/observatory/ZoomControls';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Spiral | Sovereign Sanctuary',
  description: 'Your journey through time. Every step, every milestone.'
};

export default async function TimelinePage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  let milestones: any[] = [];
  let eras: any[] = [];
  
  if (session) {
    // Get quest completions as milestones
    const { data: quests } = await supabase
      .from('user_quests')
      .select('*, quest:quest_id(*)')
      .eq('user_id', session.user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: true });
    
    milestones = quests || [];
    
    // Get badge earnings
    const { data: badges } = await supabase
      .from('user_badges')
      .select('*, badge:badge_id(*)')
      .eq('user_id', session.user.id)
      .order('earned_at', { ascending: true });
    
    milestones = [...milestones, ...(badges || [])].sort(
      (a, b) => new Date(a.completed_at || a.earned_at).getTime() - 
                 new Date(b.completed_at || b.earned_at).getTime()
    );
    
    // Define eras based on sovereignty score milestones
    const { data: profile } = await supabase
      .from('profiles')
      .select('sovereignty_score, created_at')
      .eq('id', session.user.id)
      .single();
    
    if (profile) {
      eras = [
        { name: 'Awakening', start: profile.created_at, color: 'purple' },
        { name: 'Emergence', start: null, threshold: 100, color: 'cyan' },
        { name: 'Sovereignty', start: null, threshold: 500, color: 'gold' },
        { name: 'Transcendence', start: null, threshold: 1000, color: 'white' }
      ];
    }
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
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-star-dust/50 text-sm mb-2">
                  <a href="/observatory" className="hover:text-star-dust">Observatory</a>
                  <span>→</span>
                  <span className="text-star-dust">The Spiral</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-star-dust mb-2">
                  The Spiral
                </h1>
                <p className="text-star-dust/60">
                  Your journey through time. Every step, every milestone.
                </p>
              </div>
              <ZoomControls />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 overflow-x-auto">
            <InteractiveTimeline 
              milestones={milestones} 
              eras={eras}
              currentSovereigntyScore={session ? undefined : 0}
            />
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-star-dust/60">Quest Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span className="text-sm text-star-dust/60">Badge Earned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold-500" />
              <span className="text-sm text-star-dust/60">Milestone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-white/30" />
              <span className="text-sm text-star-dust/60">Era Boundary</span>
            </div>
          </div>

          {/* Empty State */}
          {(!session || milestones.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌀</div>
              <h3 className="text-xl font-bold text-star-dust mb-2">Your spiral begins here</h3>
              <p className="text-star-dust/60">
                Complete quests and earn badges to see your journey unfold
              </p>
              <a 
                href="/library/quests" 
                className="inline-block mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-star-dust rounded-lg transition-colors"
              >
                Begin your first quest
              </a>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}