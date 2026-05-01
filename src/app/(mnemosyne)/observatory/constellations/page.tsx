// src/app/(mnemosyne)/observatory/constellations/page.tsx
import { Page } from '@/components/bifrost/Page';
import { GrandPattern } from '@/components/asgard/domains/mnemosyne/constellations/GrandPattern';

export const metadata = { title: 'The Grand Pattern | Sovereign Sanctuary', description: 'How all threads connect' };

export default function ConstellationsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><GrandPattern /></Page>);
}