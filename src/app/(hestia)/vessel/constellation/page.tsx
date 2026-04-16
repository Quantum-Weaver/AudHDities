// app/(hestia)/constellation/page.tsx
// Constellation - Connection map, collaboration web
// Feeling: Connected, expansive, wondrous
// Environment: observatory (vision space)

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ConnectionGraph } from '@/components/hestia/ConnectionGraph';
import { CollaborationWeb } from '@/components/hestia/CollaborationWeb';
import { ContributionNodes } from '@/components/hestia/ContributionNodes';
import { RelationshipEdges } from '@/components/hestia/RelationshipEdges';
import { InteractiveOrbs } from '@/components/hestia/InteractiveOrbs';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Constellation | Sovereign Sanctuary',
  description: 'Your web of connections'
};

export default async function ConstellationPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch user's connections
  const { data: connections } = await supabase
    .from('connections')
    .select('*, connected_user:connected_user_id(*)')
    .eq('user_id', session.user.id)
    .eq('status', 'active');

  // Fetch collaborations
  const { data: collaborations } = await supabase
    .from('collaborations')
    .select('*, collaborator:collaborator_id(*), product:products(*)')
    .eq('user_id', session.user.id);

  // Observatory environment for cosmic visualization
  const environment = 'observatory';

  return (
    <Page 
      variant={2}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Constellation
            </h1>
            <p className="text-white/60">
              Every connection is a star in your constellation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ConnectionGraph connections={connections || []} />
              <CollaborationWeb collaborations={collaborations || []} />
            </div>
            <div className="space-y-8">
              <ContributionNodes contributions={collaborations || []} />
              <RelationshipEdges connections={connections || []} />
              <InteractiveOrbs />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}