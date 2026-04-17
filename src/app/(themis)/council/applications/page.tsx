// app/(themis)/council/applications/page.tsx
// Applications - Creator/vendor/curator applications
// Feeling: Hopeful, aspirational, welcoming

import { Page } from '@/components/arrchive/shared/Page';
import { ApplicationList } from '@/components/council/ApplicationList';
import { ReviewQueue } from '@/components/council/ReviewQueue';
import { StatusFilters } from '@/components/council/StatusFilters';
import { ApprovalButtons } from '@/components/council/ApprovalButtons';
import { NotesField } from '@/components/council/NotesField';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Applications | Sovereign Sanctuary',
  description: 'Apply to become a creator, vendor, or curator'
};

export default async function ApplicationsPage() {
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: applications } = await supabase
    .from('applications')
    .select('*, applicant:applicant_id(*)')
    .order('created_at', { ascending: false });

  const isReviewer = session?.user?.is_moderator || session?.user?.is_admin || false;

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
              Applications
            </h1>
            <p className="text-white/60">
              Join the Sanctuary as a creator, vendor, or curator
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ApplicationList 
                applications={applications || []} 
                isReviewer={isReviewer}
              />
            </div>
            {isReviewer && (
              <div className="space-y-8">
                <ReviewQueue applications={applications || []} />
                <ApprovalButtons />
                <NotesField />
              </div>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}