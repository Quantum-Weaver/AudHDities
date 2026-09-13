// src/app/(cosmic)/cosmic/page.tsx
import { Page } from '@/components/bifrost/Page';
import { CosmicHub } from './CosmicHub';

export const metadata = {
  title: 'The Design Playground | Sovereign Sanctuary',
  description: 'The rooms where the Sanctuary shows its own dress',
};

export default function CosmicPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <CosmicHub />
    </Page>
  );
}
