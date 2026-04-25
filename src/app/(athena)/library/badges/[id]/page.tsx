// app/(athena)/library/badges/[id]/page.tsx
// Badge Detail - Single badge view
// Feeling: Celebratory, meaningful, aspirational

import { Page } from '@/components/bifrost/Page';

interface BadgeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BadgeDetailPageProps) {
  const { id } = await params;
  return {
    title: `Badge ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'A mark of sovereignty'
  };
}

export default async function BadgeDetailPage({ params }: BadgeDetailPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="observatory"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Badge ID: {id} */}
        </div>
      </main>
    </Page>
  );
}