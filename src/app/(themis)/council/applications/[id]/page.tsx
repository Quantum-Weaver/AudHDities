// app/(themis)/council/applications/[id]/page.tsx
// Application Detail - Single application view
// Feeling: Detailed, hopeful, transparent

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ApplicationForm } from '@/components/council/ApplicationForm';
import { ReviewStatus } from '@/components/council/ReviewStatus';
import { ReviewerNotes } from '@/components/council/ReviewerNotes';
import { ApprovalActions } from '@/components/council/ApprovalActions';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ApplicationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: application } = await supabase
    .from('applications')
    .select('*, applicant:applicant_id(*)')
    .eq('id', id)
    .single();

  if (!application) {
    notFound();
  }

  const isReviewer = session?.user?.is_moderator || session?.user?.is_admin || false;
  const isOwner = session?.user?.id === application.applicant_id;

  if (!isReviewer && !isOwner) {
    redirect('/council/applications');
  }

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Application Details
            </h1>
            <ReviewStatus status={application.status} />
          </div>

          <div className="space-y-8">
            <ApplicationForm application={application} readOnly={!isOwner} />
            
            {isReviewer && (
              <>
                <ReviewerNotes applicationId={application.id} />
                <ApprovalActions applicationId={application.id} />
              </>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}