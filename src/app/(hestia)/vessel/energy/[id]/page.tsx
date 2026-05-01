// app/(hestia)/vessel/energy/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EnergyEntryDetail } from '@/components/asgard/domains/hestia/energy/EnergyEntryDetail';

export const metadata = {
  title: 'Energy Entry | Sovereign Sanctuary',
  description: 'A moment of awareness',
};

export default function EnergyEntryPage() {
  return (
  <Page showForeground={false} showContinuityBeam={true}>
    <EnergyEntryDetail />
  </Page>);
}