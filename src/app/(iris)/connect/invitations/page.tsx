// app/(iris)/connect/invitations/page.tsx
// Invitations - Invite others, manage referrals
// Feeling: Welcoming, expansive, generous

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { InviteForm } from '@/components/connect/InviteForm';
import { ReferralLink } from '@/components/connect/ReferralLink';
import { SentInvites } from '@/components/connect/SentInvites';
import { AcceptedInvites } from '@/components/connect/AcceptedInvites';
import { RewardDisplay } from '@/components/connect/RewardDisplay';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Invitations | Sovereign Sanctuary',
  description: 'Invite friends to the Sanctuary'
};

export default async function InvitationsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: invites } = await supabase
    .from('invitations')
    .select('*')
    .eq('inviter_id', session.user.id)
    .order('created_at', { ascending: false });

  const acceptedCount = invites?.filter(i => i.accepted_at)?.length || 0;
  const pendingCount = invites?.filter(i => !i.accepted_at)?.length || 0;

  return (
    <Page 
      variant={2}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Invitations
            </h1>
            <p className="text-white/60">
              Welcome others to the Sanctuary
            </p>
          </div>

          <div className="space-y-8">
            <RewardDisplay 
              acceptedCount={acceptedCount}
              pendingCount={pendingCount}
            />
            <ReferralLink userId={session.user.id} />
            <InviteForm />
            <SentInvites invites={invites || []} />
            <AcceptedInvites invites={invites?.filter(i => i.accepted_at) || []} />
          </div>
        </div>
      </main>
    </Page>
  );
}