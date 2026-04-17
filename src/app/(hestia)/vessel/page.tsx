// app/(hestia)/vessel/page.tsx
// The Vessel - Profile, sovereignty score, contributions
// Feeling: Reflective, whole, sovereign

import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { ProfileForm } from '@/components/hestia/profiles/ProfileForm';
import { SovereigntyScore } from '@/components/hestia/SovereigntyScore';
import { ContributionGraph } from '@/components/hestia/ContributionGraph';
import { ResidualLedger } from '@/components/hestia/ResidualLedger';
import { BadgeDisplay } from '@/components/hestia/BadgeDisplay';
import { ConstellationMap } from '@/components/hestia/ConstellationMap';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Vessel | Sovereign Sanctuary',
  description: 'Your sovereign profile'
};

export default async function VesselPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch full profile with relations
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, creator_profile:creator_profiles(*), vendor_profile:vendor_profiles(*), community_profile:community_profiles(*)')
    .eq('id', session.user.id)
    .single();

  // Fetch sovereignty score history
  const { data: sovereigntyHistory } = await supabase
    .from('sovereignty_history')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(30);

  // Fetch contributions
  const { data: contributions } = await supabase
    .from('contributions')
    .select('*, product:product_id(*)')
    .eq('contributor_id', session.user.id)
    .order('created_at', { ascending: false });

  // Fetch residuals
  const { data: residuals } = await supabase
    .from('residual_payouts')
    .select('*, product:product_id(*)')
    .eq('contributor_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  // Fetch badges
  const { data: badges } = await supabase
    .from('user_badges')
    .select('*, badge:badge_id(*)')
    .eq('user_id', session.user.id);

  // Determine environment based on sovereignty score
  const sovereigntyScore = profile?.sovereignty_score || 0;
  let environment = 'home';
  if (sovereigntyScore >= 1000) environment = 'observatory';
  else if (sovereigntyScore >= 500) environment = 'council';
  else if (sovereigntyScore >= 100) environment = 'library';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Vessel
            </h1>
            <p className="text-white/60">
              Your sovereign self, reflected
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ProfileForm profile={profile} />
              <ContributionGraph history={sovereigntyHistory || []} />
              <ResidualLedger residuals={residuals || []} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <SovereigntyScore score={sovereigntyScore} />
              <BadgeDisplay badges={badges || []} />
              <ConstellationMap contributions={contributions || []} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}