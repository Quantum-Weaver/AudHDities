// app/(supporting)/careers/page.tsx
// The Calling - Job listings, opportunities
// Feeling: Hopeful, purposeful, inviting
/*
import { Page } from '@/components/layout/Page';
import { JobListings } from '@/components/hephaestus/supporting/JobListings';
import { ApplicationForm } from '@/components/hephaestus/supporting/forms/ApplicationForm';
import { CultureDeck } from '@/components/hephaestus/supporting/CultureDeck';
import { BenefitsList } from '@/components/hephaestus/supporting/BenefitsList';
import { TeamStories } from '@/components/hephaestus/supporting/TeamStories';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Calling | Sovereign Sanctuary',
  description: 'Join our team'
};

export default async function CareersPage() {
  const supabase = await createServerSupabase();

  const { data: jobs } = await supabase
    .from('job_listings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <Page 
      variant={1}
      environment="invitation"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Calling
            </h1>
            <p className="text-white/60">
              Join us in weaving a new reality
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CultureDeck />
              <JobListings jobs={jobs || []} />
              <TeamStories />
            </div>
            <div className="space-y-8">
              <BenefitsList />
              <ApplicationForm />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
  */