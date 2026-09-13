// src/app/(cosmic)/colors/page.tsx
import { Page } from '@/components/bifrost/Page';
import { Colours } from './Colours';

export const metadata = {
  title: 'The Colours | Sovereign Sanctuary',
  description: 'Every named colour and gradient the cosmic tokens hold',
};

export default function ColorsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <Colours />
    </Page>
  );
}
