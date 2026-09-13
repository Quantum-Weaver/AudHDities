// src/app/(themis)/council/admin/audit/page.tsx
import { Page } from '@/components/bifrost/Page';
import { AuditLog } from '@/components/asgard/domains/themis/admin/AuditLog';
import { requireAdmin } from '@/components/asgard/domains/themis/admin/gate';

export const metadata = {
  title: 'Audit Logs | The Council | Sovereign Sanctuary',
  description: 'Administrative and moderation actions, as they were taken',
};

export const dynamic = 'force-dynamic';

export default async function AuditLogPage() {
  await requireAdmin('/council/admin/audit');

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <AuditLog />
    </Page>
  );
}
