// src/app/(iris)/connect/translations/page.tsx
import { Page } from '@/components/bifrost/Page';
import { TranslationsHub } from '@/components/asgard/domains/iris/translations/TranslationsHub';

export const metadata = {
  title: 'The Voice | The Bridge | Sovereign Sanctuary',
  description: 'Every language, every voice, welcome here',
};

export default function TranslationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <TranslationsHub />
    </Page>
  );
}