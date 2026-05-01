'use client';

import { Page } from '@/components/bifrost/Page';
import { ApplicationForm } from '@/components/asgard/domains/themis/governance/ApplicationForm';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/runes/Skeleton';

export default function VendorApplicationPage() {
  const { user, loading } = useAuth();

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-6">
              <Skeleton variant="text" className="h-8 w-64 mx-auto mb-8" />
              <Skeleton variant="card" className="h-64" />
            </div>
          ) : !user ? (
            <div className="text-center">
              <p className="text-star-dust/60">Sign in to apply as a vendor.</p>
            </div>
          ) : (
            <ApplicationForm
              userId={user.id}
              applicationType="vendor"
            />
          )}
        </div>
      </main>
    </Page>
  );
}