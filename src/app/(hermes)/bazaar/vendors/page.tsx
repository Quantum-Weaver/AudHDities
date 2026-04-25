// app/(hermes)/bazaar/vendors/page.tsx
// Vendors - Directory of sovereign vendors
// Feeling: Professional, trustworthy, diverse

import { Page } from '@/components/bifrost/Page';

export const metadata = {
  title: 'Vendors | Sovereign Sanctuary',
  description: 'Sovereign commerce'
};

export default async function VendorsPage() {
  return (
    <Page 
      variant={2}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          {/* Content will be added when components are ready */}
        </div>
      </main>
    </Page>
  );
}