// src/app/(athena)/library/bubbles/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BubbleDetail } from '@/components/asgard/domains/athena/bubbles/BubbleDetail';

export const metadata = {
  title: 'Bubble | The Floating Stars | Sovereign Sanctuary',
  description: 'A collectible star',
};

export default function BubbleDetailPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BubbleDetail />
    </Page>
  );
}