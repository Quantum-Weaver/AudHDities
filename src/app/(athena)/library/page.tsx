// src/app/(athena)/library/page.tsx
import { Page } from '@/components/bifrost/Page';
import { LibraryHub } from '@/components/asgard/domains/athena/library/LibraryHub';

export const metadata = {
  title: 'The Library | Sovereign Sanctuary',
  description: 'Knowledge awaits',
};

export default function LibraryPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <LibraryHub />
    </Page>
  );
}