// src/app/(iris)/connect/page.tsx
import { Page } from '@/components/bifrost/Page';
import { BridgeHub } from '@/components/asgard/domains/iris/connect/BridgeHub';

export const metadata = {
  title: 'The Bridge | Sovereign Sanctuary',
  description: 'Where sovereign souls connect',
};

export default function BridgePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <BridgeHub />
    </Page>
  );
}