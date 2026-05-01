// src/app/(iris)/connect/feed/page.tsx
import { Page } from '@/components/bifrost/Page';
import { PulseFeed } from '@/components/asgard/domains/iris/feed/PulseFeed';

export const metadata = {
  title: 'The Pulse | The Bridge | Sovereign Sanctuary',
  description: 'What\'s resonating in the Sanctuary',
};

export default function FeedPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <PulseFeed />
    </Page>
  );
}