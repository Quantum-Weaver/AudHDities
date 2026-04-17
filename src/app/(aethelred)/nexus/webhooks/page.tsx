// app/(aethelred)/nexus/webhooks/page.tsx
// The Pulse - Webhook management
// Feeling: Responsive, connected, automated

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/shared/Page';
import { WebhookTable } from '@/components/nexus/WebhookTable';
import { CreateForm } from '@/components/nexus/CreateForm';
import { DeliveryLogs } from '@/components/nexus/DeliveryLogs';
import { SecretManager } from '@/components/nexus/SecretManager';
import { TestButton } from '@/components/nexus/TestButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Pulse | Sovereign Sanctuary',
  description: 'Webhook management'
};

export default async function WebhooksPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: webhooks } = await supabase
    .from('webhooks')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <Page 
      variant={2}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                The Pulse
              </h1>
              <p className="text-white/60">
                Manage your webhook endpoints
              </p>
            </div>
            <CreateForm />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WebhookTable webhooks={webhooks || []} />
              <DeliveryLogs />
            </div>
            <div className="space-y-8">
              <SecretManager />
              <TestButton />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}