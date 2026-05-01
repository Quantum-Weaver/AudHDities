// src/app/(athena)/library/bubbles/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BubblesGallery } from '@/components/asgard/domains/athena/bubbles/BubblesGallery';

export const metadata = {
  title: 'The Floating Stars | Sovereign Sanctuary',
  description: 'Collect bubbles and earn sovereignty',
};

export default function BubblesPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BubblesGallery />
    </Page>
  );
}