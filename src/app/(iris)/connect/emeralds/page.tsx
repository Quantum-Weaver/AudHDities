// src/app/(iris)/connect/emeralds/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EmeraldsHistory } from '@/components/asgard/domains/iris/emeralds/EmeraldsHistory';

export const metadata = {
  title: 'Emeralds | The Bridge | Sovereign Sanctuary',
  description: 'Every emerald is a spark of appreciation',
};

export default function EmeraldsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EmeraldsHistory />
    </Page>
  );
}