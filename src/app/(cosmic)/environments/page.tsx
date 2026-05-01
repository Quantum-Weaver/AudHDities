// src/app/(cosmic)/environments/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EnvironmentsGallery } from '@/components/asgard/domains/cosmic/environments/EnvironmentsGallery';

export const metadata = {
  title: 'The Realms | Sovereign Sanctuary',
  description: 'Choose the environment that calls to you',
};

export default function EnvironmentsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EnvironmentsGallery />
    </Page>
  );
}