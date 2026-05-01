// src/app/(iris)/connect/support/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { SupportThread } from '@/components/asgard/domains/iris/support/SupportThread';

export const metadata = {
  title: 'Support Thread | The Bridge | Sovereign Sanctuary',
  description: 'Your voice matters',
};

export default function SupportThreadPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <SupportThread />
    </Page>
  );
}