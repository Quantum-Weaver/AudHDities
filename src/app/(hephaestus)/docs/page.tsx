// src/app/(content)/docs/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { DocsContent } from '@/components/asgard/domains/hephaestus/docs/DocsContent';

export const metadata: Metadata = {
  title: 'Documentation | AUDHDITIES',
  description: 'Explore the sanctuary architecture, guides, and philosophy',
};

export default function DocsHomePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main>
        <DocsContent />
      </main>
    </Page>
  );
}