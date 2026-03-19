// app/(dashboard)/profile/[id]/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import ProfileTabs from '@/components/profiles/ProfileTabs';
import ProfileOverview from '@/components/profiles/ProfileOverview';
import type { Database } from '@/types/supabase/database.types';

export const metadata: Metadata = {
  title: 'Profile | AUDHDITIES',
  description: 'View profile',
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabase();
  
  // Get current user for isOwnProfile check
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile with all related data in parallel
  const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', params.id).single(),
    supabase.from('community_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('creator_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('vendor_profiles').select('*').eq('id', params.id).maybeSingle(),
    supabase.from('user_badges').select('*, badge').eq('user_id', params.id)
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
          {/* Tabs */}
          <ProfileTabs 
            profile={profile}
            communityProfile={communityProfile}
            creatorProfile={creatorProfile}
            vendorProfile={vendorProfile}
            isOwnProfile={isOwnProfile}
          />

          {/* Default Overview Tab Content */}
          <div className="mt-8">
            <ProfileOverview 
              profile={profile}
              communityProfile={communityProfile}
              creatorProfile={creatorProfile}
              vendorProfile={vendorProfile}
              badges={badges}
              isOwnProfile={isOwnProfile}
            />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
