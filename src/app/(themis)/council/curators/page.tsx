// app/(themis)/council/curators/page.tsx
// Curators - Trusted wisdom-holders
// Feeling: Respectful, trustworthy, wise

import { Page } from '@/components/arrchive/layout/Page';
import { CuratorProfiles } from '@/components/council/CuratorProfiles';
import { WisdomScores } from '@/components/council/WisdomScores';
import { EndorsementCounts } from '@/components/council/EndorsementCounts';
import { DelegateButtons } from '@/components/council/DelegateButtons';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'Curators | Sovereign Sanctuary',
  description: 'Meet the trusted wisdom-holders of the Sanctuary'
};

export default async function CuratorsPage() {
  const supabase = await createServerSupabase();

  const { data: curators } = await supabase
    .from('profiles')
    .select('*, curator_score:curator_scores(*), endorsements:endorsements(count)')
    .eq('is_curator', true)
    .order('curator_score', { ascending: false });

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Curators
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Trusted voices guiding the Sanctuary with wisdom
            </p>
          </div>

          <CuratorProfiles curators={curators || []} />

          {(!curators || curators.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🦉</div>
              <h3 className="text-xl font-bold text-white mb-2">No Curators Yet</h3>
              <p className="text-white/60">
                The first curators will emerge from the community
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}