// app/(iris)/connect/emeralds/page.tsx
// Emeralds - Given and received emeralds (likes/tips)
// Feeling: Appreciated, valued, celebrated

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { EmeraldHistory } from '@/components/connect/EmeraldHistory';
import { GivenCount } from '@/components/connect/GivenCount';
import { ReceivedCount } from '@/components/connect/ReceivedCount';
import { TopGivers } from '@/components/connect/TopGivers';
import { MonthlyStats } from '@/components/connect/MonthlyStats';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Emeralds | Sovereign Sanctuary',
  description: 'Your emerald history and impact'
};

export default async function EmeraldsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch emerald stats
  const { data: givenCount } = await supabase
    .from('emeralds')
    .select('*', { count: 'exact', head: true })
    .eq('giver_id', session.user.id);

  const { data: receivedCount } = await supabase
    .from('emeralds')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', session.user.id);

  const { data: history } = await supabase
    .from('emeralds')
    .select('*, giver:giver_id(*), recipient:recipient_id(*), post:post_id(*)')
    .or(`giver_id.eq.${session.user.id},recipient_id.eq.${session.user.id}`)
    .order('created_at', { ascending: false });

  const { data: topGivers } = await supabase
    .from('emerald_stats')
    .select('*, user:user_id(*)')
    .order('total_given', { ascending: false })
    .limit(10);

  return (
    <Page 
      variant={2}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Emeralds
            </h1>
            <p className="text-white/60">
              Every emerald is a spark of appreciation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <GivenCount count={givenCount || 0} />
            <ReceivedCount count={receivedCount || 0} />
            <MonthlyStats userId={session.user.id} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EmeraldHistory history={history || []} />
            </div>
            <div>
              <TopGivers givers={topGivers || []} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}