// app/(themis)/council/admin/page.tsx
// The Hearth of Governance - Administrative functions
// Feeling: Responsible, powerful, careful
// ACCESS: Admin only

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { UserManagement } from '@/components/council/UserManagement';
import { ContentModeration } from '@/components/council/ContentModeration';
import { SystemSettings } from '@/components/council/SystemSettings';
import { AnalyticsDashboard } from '@/components/council/AnalyticsDashboard';
import { AuditLogs } from '@/components/council/AuditLogs';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Governance | Sovereign Sanctuary',
  description: 'Administrative governance tools'
};

export default async function AdminPage() {
  const session = await auth();
  const supabase = await createServerSupabase();

  // Verify admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session?.user.id)
    .single();

  if (!session || !profile?.is_admin) {
    redirect('/');
  }

  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Hearth of Governance
            </h1>
            <p className="text-white/60">
              Administrative tools for Sanctuary stewards
            </p>
          </div>

          <div className="space-y-12">
            <UserManagement />
            <ContentModeration />
            <SystemSettings />
            <AnalyticsDashboard />
            <AuditLogs />
          </div>
        </div>
      </main>
    </Page>
  );
}