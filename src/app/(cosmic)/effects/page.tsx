// src/app/(cosmic)/effects/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EffectsGrimoire } from '@/components/asgard/domains/cosmic/effects/EffectsGrimoire';

export const metadata = {
  title: 'The Grimoire | Sovereign Sanctuary',
  description: 'Ancient effects for the modern weaver',
};

export default function EffectsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <EffectsGrimoire />
    </Page>
  );
}