// src/app/(mnemosyne)/observatory/timeline/page.tsx
import { Page } from '@/components/bifrost/Page';
import { TimelineSpiral } from '@/components/asgard/domains/mnemosyne/timeline/TimelineSpiral';

export const metadata = { title: 'The Spiral | Sovereign Sanctuary', description: 'Your journey, visible at last' };

export default function TimelinePage() {
  return (<Page showForeground={false} showContinuityBeam={true}><TimelineSpiral /></Page>);
}