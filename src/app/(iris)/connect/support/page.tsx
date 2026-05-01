// src/app/(iris)/connect/support/page.tsx
import { Page } from '@/components/bifrost/Page';
import { SupportHub } from '@/components/asgard/domains/iris/support/SupportHub';

export const metadata = {
  title: 'The Healing Flame | The Bridge | Sovereign Sanctuary',
  description: 'You are not alone. We are here for you.',
};

export default function SupportPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SupportHub />
    </Page>
  );
}