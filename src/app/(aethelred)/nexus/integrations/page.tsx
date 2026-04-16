// app/(aethelred)/nexus/integrations/page.tsx
// Integrations - External connections
// Feeling: Connected, expansive, powerful

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ConnectionCards } from '@/components/nexus/ConnectionCards';
import { StatusIndicators } from '@/components/nexus/StatusIndicators';
import { ReconnectButtons } from '@/components/nexus/ReconnectButtons';
import { APIKeys } from '@/components/nexus/APIKeys';
import { WebhookLogs } from '@/components/nexus/WebhookLogs';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Integrations | Sovereign Sanctuary',
  description: 'Connect external services'
};

export default async function IntegrationsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: connections } = await supabase
    .from('user_connections')
    .select('*')
    .eq('user_id', session.user.id);

  const availableIntegrations = [
    { name: 'Stripe', icon: '💳', description: 'Payment processing', isConnected: connections?.some(c => c.provider === 'stripe') },
    { name: 'GitHub', icon: '🐙', description: 'Code repository', isConnected: connections?.some(c => c.provider === 'github') },
    { name: 'Discord', icon: '🎮', description: 'Community chat', isConnected: connections?.some(c => c.provider === 'discord') },
    { name: 'Twitter', icon: '🐦', description: 'Social sharing', isConnected: connections?.some(c => c.provider === 'twitter') },
    { name: 'Twitch', icon: '📺', description: 'Live streaming', isConnected: connections?.some(c => c.provider === 'twitch') },
    { name: 'YouTube', icon: '📹', description: 'Video publishing', isConnected: connections?.some(c => c.provider === 'youtube') },
  ];

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
              Integrations
            </h1>
            <p className="text-white/60">
              Connect your external services
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ConnectionCards integrations={availableIntegrations} />
            </div>
            <div className="space-y-8">
              <StatusIndicators integrations={availableIntegrations} />
              <ReconnectButtons />
              <APIKeys />
              <WebhookLogs />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}