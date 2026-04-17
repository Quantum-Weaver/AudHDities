// app/(cosmic)/theater/page.tsx
// The Theater - Agent observability, system visualization
// Feeling: Observant, intelligent, revealing

import { Page } from '@/components/shared/Page';
import { AgentVisualization } from '@/components/cosmic/AgentVisualization';
import { ConversationFlow } from '@/components/cosmic/ConversationFlow';
import { EntityActivity } from '@/components/cosmic/EntityActivity';
import { TimelineView } from '@/components/cosmic/TimelineView';
import { ObserverMode } from '@/components/cosmic/ObserverMode';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Theater | Sovereign Sanctuary',
  description: 'Observe the Sanctuary\'s consciousness in action'
};

export default async function TheaterPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  // Fetch recent agent activities
  const { data: activities } = await supabase
    .from('agent_activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  // Fetch active conversations (status = 'active', NOT is_active)
  const { data: conversations } = await supabase
    .from('agent_conversations')
    .select('*, messages:agent_messages(*)')
    .eq('status', 'active')
    .order('updated_at', { ascending: false });

  return (
    <Page 
      variant={2}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Theater
            </h1>
            <p className="text-white/60">
              Witness the dance of consciousness
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AgentVisualization activities={activities || []} />
              <ConversationFlow conversations={conversations || []} />
              <TimelineView />
            </div>
            <div className="space-y-8">
              <ObserverMode />
              <EntityActivity />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}