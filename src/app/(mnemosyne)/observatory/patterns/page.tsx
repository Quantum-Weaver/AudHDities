// src/app/(mnemosyne)/observatory/patterns/page.tsx
import { Page } from '@/components/bifrost/Page';
import { PatternWeave } from '@/components/asgard/domains/mnemosyne/patterns/PatternWeave';

export const metadata = { title: 'The Weave | Sovereign Sanctuary', description: 'What the data whispers' };

export default function PatternsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><PatternWeave /></Page>);
}