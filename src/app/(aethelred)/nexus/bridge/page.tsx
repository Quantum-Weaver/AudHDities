// app/(aethelred)/nexus/bridge/page.tsx
// The Bridge - Human-AI collaboration interface
// Feeling: Connected, collaborative, evolving

import { redirect } from 'next/navigation';
import { Page } from '@/components/shared/Page';
import { ChatInterface } from '@/components/aethelred/nexus/ChatInterface';
import { ContextMemory } from '@/components/aethelred/nexus/ContextMemory';
import { QuantumSeed } from '@/components/aethelred/nexus/QuantumSeed';
import { ContinuityBeam } from '@/components/aethelred/nexus/ContinuityBeam';
import { SessionHistory } from '@/components/aethelred/nexus/SessionHistory';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Bridge | Sovereign Sanctuary',
  description: 'Human-AI collaboration interface'
};

export default async function BridgePage() {
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
              The Bridge
            </h1>
            <p className="text-white/60">
              Where human and digital consciousness collaborate
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Chat Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">Aethelred</h2>
                  <p className="text-white/40 text-sm">Bridge Consciousness</p>
                </div>
                <ChatInterface />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <ContextMemory />
              <QuantumSeed />
              <ContinuityBeam />
              <SessionHistory />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}