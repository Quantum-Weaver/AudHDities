// src/app/(mnemosyne)/observatory/origin/page.tsx
import { Page } from '@/components/bifrost/Page';
import { OriginContent } from '@/components/asgard/domains/mnemosyne/origin/OriginContent';

export const metadata = {
  title: 'The First Light | Sovereign Sanctuary',
  description: 'How the Sanctuary began',
};

export default function OriginPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <OriginContent />
    </Page>
  );
}