// app/(hermes)/bazaar/vendors/[id]/page.tsx
// Vendor Sanctuary - Single vendor profile
// Feeling: Professional, trustworthy, connected

import { Page } from '@/components/bifrost/Page';

interface VendorSanctuaryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VendorSanctuaryPageProps) {
  const { id } = await params;
  return {
    title: `Vendor ${id.slice(0, 8)} | Sovereign Sanctuary`,
    description: 'Their craft, their sovereignty'
  };
}

export default async function VendorSanctuaryPage({ params }: VendorSanctuaryPageProps) {
  const { id } = await params;
  
  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          {/* Content will be added when components are ready */}
          {/* Vendor ID: {id} */}
        </div>
      </main>
    </Page>
  );
}