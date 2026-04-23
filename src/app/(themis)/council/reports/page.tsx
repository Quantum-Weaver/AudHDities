// app/(themis)/council/reports/page.tsx
// Reports - Moderation reports and transparency
// Feeling: Accountable, just, protective

import { Page } from '@/components/shared/Page';

export const metadata = {
  title: 'Reports | Sovereign Sanctuary',
  description: 'Community-driven moderation, fully transparent'
};

export default async function ReportsPage() {
  return (
    <Page 
      variant={2}
      environment="council"
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