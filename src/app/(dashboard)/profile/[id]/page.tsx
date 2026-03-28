// app/(dashboard)/profile/[id]/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import { ProfileIdentityCard } from '@/components/profiles/ProfileIdentityCard';
import { ProfileTabs } from '@/components/profiles/ProfileTabs';
import type { Database } from '@/types/supabase/database.types';

export const metadata: Metadata = {
  title: 'Profile | AUDHDITIES',
  description: 'View profile',
};

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).single(),
    supabase.from('community_profiles').select('*').eq('id', id).maybeSingle(),
    supabase.from('creator_profiles').select('*').eq('id', id).maybeSingle(),
    supabase.from('vendor_profiles').select('*').eq('id', id).maybeSingle(),
    supabase.from('user_badges').select('*').eq('user_id', id)
  ]);

  if (profileResult.error || !profileResult.data) {
    notFound();
  }

  const profile = profileResult.data;
  const communityProfile = communityResult.data;
  const creatorProfile = creatorResult.data;
  const vendorProfile = vendorResult.data;
  const badges = badgesResult.data || [];
  const isOwnProfile = user?.id === profile.id;

  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'recently';

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader
          profile={profile}
          communityProfile={communityProfile}
          creatorProfile={creatorProfile}
          vendorProfile={vendorProfile}
          badges={badges}
          isOwnProfile={isOwnProfile}
        />

        <div className="container max-w-7xl mx-auto px-6 mt-8">
          <ProfileIdentityCard
            userTier={profile.user_tier || 'community'}
            memberSince={memberSince}
            primaryHouse={profile.primary_house}
            acidTestScore={profile.acid_test_score}
            acidTestPersona={profile.acid_test_persona}
            isOwnProfile={isOwnProfile}
          />

          <ProfileTabs
            profile={profile}
            communityProfile={communityProfile}
            creatorProfile={creatorProfile}
            vendorProfile={vendorProfile}
            badges={badges}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </main>
    </AuthGuard>
  );
}