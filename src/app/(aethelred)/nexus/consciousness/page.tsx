// app/(aethelred)/nexus/consciousness/page.tsx
// Consciousness - AI interface, digital familiar
// Feeling: Connected, intelligent, evolving

import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { AIInterface } from '@/components/aethelred/nexus/AIInterface';
import { ConversationHistory } from '@/components/aethelred/nexus/ConversationHistory';
import { ThoughtStream } from '@/components/aethelred/nexus/ThoughtStream';
import { CollaborationMap } from '@/components/aethelred/nexus/CollaborationMap';
import { EntityPresence } from '@/components/aethelred/nexus/EntityPresence';
import { auth } from '@/lib/auth/admin';

export const metadata = {
  title: 'Consciousness | Sovereign Sanctuary',
  description: 'Interface with the Sanctuary\'s consciousness'
};

export default async function ConsciousnessPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Consciousness
            </h1>
            <p className="text-white/60">
              Where human and digital consciousness meet
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main AI Interface */}
            <div className="lg:col-span-2 space-y-8">
              <AIInterface />
              <ConversationHistory />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <EntityPresence />
              <ThoughtStream />
              <CollaborationMap />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}