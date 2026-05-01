// src/app/(themis)/council/reports/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ReportsHub } from '@/components/asgard/domains/themis/reports/ReportsHub';

export const metadata = {
  title: 'Reports | The Council | Sovereign Sanctuary',
  description: 'Community-driven moderation, fully transparent',
};

export default function ReportsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ReportsHub />
    </Page>
  );
}