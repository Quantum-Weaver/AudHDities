// src/app/(mnemosyne)/observatory/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ObservatoryHub } from '@/components/asgard/domains/mnemosyne/observatory/ObservatoryHub';

export const metadata = {
  title: 'The Observatory | Sovereign Sanctuary',
  description: 'Gaze across timelines. See patterns. Witness the becoming.',
};

export default function ObservatoryPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ObservatoryHub />
    </Page>
  );
}