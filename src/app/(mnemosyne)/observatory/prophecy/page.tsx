// src/app/(mnemosyne)/observatory/prophecy/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ProphecyVision } from '@/components/asgard/domains/mnemosyne/prophecy/ProphecyVision';

export const metadata = { title: 'The Vision | Sovereign Sanctuary', description: 'What awaits the sovereign' };

export default function ProphecyPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><ProphecyVision /></Page>);
}