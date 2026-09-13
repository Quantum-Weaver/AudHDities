// src/app/(themis)/council/admin/page.tsx
import { Page } from '@/components/bifrost/Page';
import { AdminHub } from '@/components/asgard/domains/themis/admin/AdminHub';
import { requireAdmin } from '@/components/asgard/domains/themis/admin/gate';

export const metadata = {
  title: 'Administration | The Council | Sovereign Sanctuary',
  description: 'Tools for Sanctuary stewards',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  await requireAdmin('/council/admin');

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <AdminHub />
    </Page>
  );
}
