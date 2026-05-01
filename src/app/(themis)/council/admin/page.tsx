// src/app/(themis)/council/admin/page.tsx
import { Page } from '@/components/bifrost/Page';
import { AdminHub } from '@/components/asgard/domains/themis/admin/AdminHub';

export const metadata = {
  title: 'Administration | The Council | Sovereign Sanctuary',
  description: 'Tools for Sanctuary stewards',
};

export default function AdminPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <AdminHub />
    </Page>
  );
}