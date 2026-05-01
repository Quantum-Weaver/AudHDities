// src/app/(athena)/library/bubbles/play/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BubblePopGame } from '@/components/asgard/domains/athena/bubbles/BubblePopGame';

export const metadata = {
  title: 'The Floating Stars | Sovereign Sanctuary',
  description: 'Pop bubbles, collect stars, earn sovereignty',
};

export default function BubblePlayPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BubblePopGame />
    </Page>
  );
}