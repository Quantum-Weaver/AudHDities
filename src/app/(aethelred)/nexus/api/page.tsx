// app/(aethelred)/nexus/api/page.tsx
// The Gateway - API documentation, developer portal
// Feeling: Powerful, accessible, expansive

import { Page } from '@/components/arrchive/layout/Page';
import { EndpointList } from '@/components/nexus/EndpointList';
import { DocumentationView } from '@/components/nexus/DocumentationView';
import { CodeExamples } from '@/components/nexus/CodeExamples';
import { TestConsole } from '@/components/nexus/TestConsole';
import { AuthManager } from '@/components/nexus/AuthManager';

export const metadata = {
  title: 'The Gateway | Sovereign Sanctuary',
  description: 'API documentation and developer tools'
};

export default async function APIPage() {
  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Gateway
            </h1>
            <p className="text-white/60">
              Build on the Sanctuary
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DocumentationView />
              <CodeExamples />
              <TestConsole />
            </div>
            <div className="space-y-8">
              <AuthManager />
              <EndpointList />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}