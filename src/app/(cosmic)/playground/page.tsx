// src/app/(cosmic)/playground/page.tsx
import { Page } from '@/components/bifrost/Page';
import { Playground } from '@/components/asgard/domains/cosmic/playground/Playground';

export const metadata = {
  title: 'The Sandbox | Sovereign Sanctuary',
  description: 'Every component outside asgard, by grouping',
};

export default function PlaygroundPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <Playground />
    </Page>
  );
}