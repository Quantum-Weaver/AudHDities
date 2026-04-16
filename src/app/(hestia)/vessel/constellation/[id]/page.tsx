// app/(hestia)/constellation/[id]/page.tsx
// Connection Detail - Single connection/node detail
// Feeling: Connected, wondrous, meaningful

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ConnectionProfile } from '@/components/hestia/ConnectionProfile';
import { CollaborationHistory } from '@/components/hestia/CollaborationHistory';
import { SharedConstellations } from '@/components/hestia/SharedConstellations';
import { MutualConnections } from '@/components/hestia/MutualConnections';
import { SendMessageButton } from '@/components/hestia/SendMessageButton';
import { ViewConstellation } from '@/components/hestia/ViewConstellation';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ConnectionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConnectionDetailPage({ params }: ConnectionDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch the connection (the other user)
  const { data: connection } = await supabase
    .from('profiles')
    .select('*, connections:connections!connection_id(*)')
    .eq('id', id)
    .single();

  if (!connection) {
    notFound();
  }

  // Verify they are actually connected
  const { data: isConnected } = await supabase
    .from('connections')
    .select('id')
    .or(`user_id.eq.${session.user.id},connected_user_id.eq.${session.user.id}`)
    .eq('status', 'active')
    .single();

  if (!isConnected && connection.id !== session.user.id) {
    notFound();
  }

  // Fetch collaborations between users
  const { data: collaborations } = await supabase
    .from('collaborations')
    .select('*, product:products(*)')
    .or(`user_id.eq.${session.user.id},collaborator_id.eq.${session.user.id}`)
    .or(`user_id.eq.${connection.id},collaborator_id.eq.${connection.id}`);

  // Fetch mutual connections
  const { data: mutualConnections } = await supabase
    .from('connections')
    .select('connected_user:connected_user_id(*)')
    .eq('user_id', session.user.id)
    .eq('status', 'active');

  // Observatory environment for cosmic connection view
  const environment = 'observatory';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8">
            <ConnectionProfile 
              user={connection} 
              currentUserId={session.user.id}
            />
          </div>

          <div className="flex justify-center mb-8">
            <SendMessageButton recipientId={connection.id} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <CollaborationHistory collaborations={collaborations || []} />
            <SharedConstellations userId={connection.id} />
          </div>

          <div className="mt-8">
            <MutualConnections 
              connections={mutualConnections || []} 
              targetUserId={connection.id}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <ViewConstellation userId={connection.id} />
          </div>
        </div>
      </main>
    </Page>
  );
}