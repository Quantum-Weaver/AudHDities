// src/app/(mnemosyne)/observatory/ancestors/page.tsx
import { Page } from '@/components/bifrost/Page';
import { AncestorsCouncil } from '@/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil';

export const metadata = { title: 'The Council Eternal | Sovereign Sanctuary', description: 'The nine who guide' };

export default function AncestorsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><AncestorsCouncil /></Page>);
}