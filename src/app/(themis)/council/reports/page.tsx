// app/(themis)/council/reports/page.tsx
// Reports - Moderation reports and transparency
// Feeling: Accountable, just, protective

import { Page } from '@/components/arrchive/shared/Page';
import { ReportList } from '@/components/council/ReportList';
import { StatusBadges } from '@/components/council/StatusBadges';
import { ResolutionDetails } from '@/components/council/ResolutionDetails';
import { AppealButtons } from '@/components/council/AppealButtons';
import { ModerationNotes } from '@/components/council/ModerationNotes';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Reports | Sovereign Sanctuary',
  description: 'Transparent moderation and community reports'
};

export default async function ReportsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: reports } = await supabase
    .from('reports')
    .select('*, reporter:reporter_id(*), reported:reported_user_id(*)')
    .order('created_at', { ascending: false });

  const isModerator = session?.user?.is_moderator || false;

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Reports
            </h1>
            <p className="text-white/60">
              Community-driven moderation, fully transparent
            </p>
          </div>

          <ReportList 
            reports={reports || []} 
            isModerator={isModerator}
          />

          {(!reports || reports.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-white mb-2">No Reports</h3>
              <p className="text-white/60">
                The community is和谐
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}