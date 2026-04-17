// app/(themis)/council/delegation/page.tsx
// Delegation - Delegate votes to trusted curators
// Feeling: Trusting, wise, collaborative

import { Page } from '@/components/arrchive/shared/Page';
import { DelegateList } from '@/components/council/DelegateList';
import { TrustScores } from '@/components/council/TrustScores';
import { DelegationControls } from '@/components/council/DelegationControls';
import { HistoryLog } from '@/components/council/HistoryLog';
import { RevokeButton } from '@/components/council/RevokeButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Delegation | Sovereign Sanctuary',
  description: 'Delegate your voting power to trusted curators'
};

export default async function DelegationPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: curators } = await supabase
    .from('profiles')
    .select('*, curator_score:curator_scores(*)')
    .eq('is_curator', true)
    .order('curator_score', { ascending: false });

  let currentDelegation = null;
  if (session) {
    const { data } = await supabase
      .from('delegations')
      .select('*, delegate:delegate_id(*)')
      .eq('user_id', session.user.id)
      .single();
    currentDelegation = data;
  }

  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Delegation
            </h1>
            <p className="text-white/60">
              Trust your voice to those who share your values
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DelegateList curators={curators || []} />
            </div>
            <div className="space-y-8">
              {currentDelegation && (
                <>
                  <DelegationControls currentDelegation={currentDelegation} />
                  <RevokeButton delegationId={currentDelegation.id} />
                </>
              )}
              <TrustScores />
              <HistoryLog userId={session?.user.id} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}