// src/app/(themis)/council/applications/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ApplicationsHub } from '@/components/asgard/domains/themis/applications/ApplicationsHub';

export const metadata = {
  title: 'Applications | The Council | Sovereign Sanctuary',
  description: 'Review creator, vendor, and curator applications',
};

export default function ApplicationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ApplicationsHub />
    </Page>
  );
}