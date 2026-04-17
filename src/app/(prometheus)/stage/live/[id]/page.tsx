// app/(prometheus)/stage/live/[id]/page.tsx
// Live Performance - Single live performance view
// Feeling: Euphoric, connected, immersive

import { Page } from '@/components/shared/Page';

interface LivePerformancePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LivePerformancePageProps) {
  const { id } = await params;
  return {
    title: `Live Performance ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Witness the moment'
  };
}

export default async function LivePerformancePage({ params }: LivePerformancePageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Performance ID: {id} */}
        </div>
      </main>
    </Page>
  );
}