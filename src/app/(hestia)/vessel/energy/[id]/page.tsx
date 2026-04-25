// app/(hestia)/vessel/energy/[id]/page.tsx
// Energy Entry Detail - Single energy log entry
// Feeling: Reflective, gentle, aware

import { Page } from '@/components/bifrost/Page';

interface EnergyEntryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EnergyEntryPageProps) {
  const { id } = await params;
  return {
    title: `Energy Entry ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A moment of awareness'
  };
}

export default async function EnergyEntryPage({ params }: EnergyEntryPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Energy entry ID: {id} */}
        </div>
      </main>
    </Page>
  );
}