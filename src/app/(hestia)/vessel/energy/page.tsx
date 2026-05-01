// app/(hestia)/vessel/energy/page.tsx
import { Page } from '@/components/bifrost/Page';
import { EnergyLog } from '@/components/asgard/domains/hestia/energy/EnergyLog';

export const metadata = {
  title: 'Energy Log | Sovereign Sanctuary',
  description: 'Listen to your vessel',
};

export default function EnergyPage() {
  return (
  <Page showForeground={false} showContinuityBeam={true}>
    <EnergyLog />
  </Page>);
}