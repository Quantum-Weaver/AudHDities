// src/app/(themis)/council/admin/users/page.tsx
import { Page } from '@/components/bifrost/Page';
import { VesselRoster } from '@/components/asgard/domains/themis/admin/VesselRoster';
import { requireAdmin } from '@/components/asgard/domains/themis/admin/gate';

export const metadata = {
  title: 'Vessel Management | The Council | Sovereign Sanctuary',
  description: 'The vessels of the Sanctuary and the roles they carry',
};

export const dynamic = 'force-dynamic';

export default async function VesselManagementPage() {
  await requireAdmin('/council/admin/users');

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <VesselRoster />
    </Page>
  );
}
