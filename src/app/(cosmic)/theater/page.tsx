// src/app/(cosmic)/theater/page.tsx
import { Page } from '@/components/bifrost/Page';
import { Theater } from '@/components/asgard/domains/cosmic/theater/Theater';

export const metadata = {
  title: 'The Theater | Sovereign Sanctuary',
  description: 'Witness the dance of consciousness',
};

export default function TheaterPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <Theater />
    </Page>
  );
}