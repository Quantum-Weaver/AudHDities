// app/(hermes)/creators/[id]/page.tsx
// Creator Sanctuary - Single creator profile
// Feeling: Honoring, inspiring, connected
// Environment: dynamic based on creator's primary category

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { CreatorProfile } from '@/components/hermes/CreatorProfile';
import { CreatorProducts } from '@/components/hermes/CreatorProducts';
import { ContributionHistory } from '@/components/hermes/ContributionHistory';
import { Testimonials } from '@/components/hermes/Testimonials';
import { ContactButton } from '@/components/hermes/ContactButton';
import { FollowButton } from '@/components/hermes/FollowButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface CreatorSanctuaryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CreatorSanctuaryPage({ params }: CreatorSanctuaryPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();

  const { data: creator } = await supabase
    .from('profiles')
    .select('*, creator_profile:creator_profiles(*), products:products(*)')
    .eq('id', id)
    .single();

  if (!creator || !creator.is_creator) {
    notFound();
  }

  // Check if current user follows this creator
  let isFollowing = false;
  if (session) {
    const { data: follow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', session.user.id)
      .eq('following_id', id)
      .single();
    isFollowing = !!follow;
  }

  // Environment based on creator's primary category
  const primaryCategory = creator.creator_profile?.creative_categories?.[0];
  const categoryEnv: Record<string, string> = {
    music: 'music',
    comedy: 'lounge',
    art: 'music',
    writing: 'library',
    education: 'library',
  };
  const environment = categoryEnv[primaryCategory] || 'community';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="flex justify-end gap-3 mb-6">
            <FollowButton 
              creatorId={id} 
              isFollowing={isFollowing} 
            />
            <ContactButton creatorId={id} />
          </div>

          <CreatorProfile creator={creator} />

          <div className="mt-12">
            <CreatorProducts products={creator.products || []} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <ContributionHistory creatorId={id} />
            <Testimonials creatorId={id} />
          </div>
        </div>
      </main>
    </Page>
  );
}