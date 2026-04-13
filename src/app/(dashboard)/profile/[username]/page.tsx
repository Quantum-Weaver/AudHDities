/* @/app/(dashboard)/profile/[username]/page.tsx */
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AuthGuard from '@/components/auth/AuthGuard'
import ProfileHeader from '@/components/profiles/ProfileHeader'
import ProfileTabs from '@/components/profiles/ProfileTabs'
import RoleBadge from '@/components/profiles/RoleBadge'
import HouseBadge from '@/components/profiles/HouseBadge'
import SovereigntyScore from '@/components/profiles/SovereigntyScore'

export const metadata: Metadata = {
  title: 'Profile | AUDHDITIES',
  description: 'View profile',
}

export default async function ProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch profile by username
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (error || !profile) {
    notFound()
  }

  const isOwnProfile = user?.id === profile.id

  // Fetch extended profile data if needed
  const { data: communityProfile } = isOwnProfile
    ? await supabase
        .from('community_profiles')
        .select('*')
        .eq('id', profile.id)
        .single()
    : { data: null }

  const { data: creatorProfile } = await supabase
    .from('creator_profiles')
    .select('total_products')
    .eq('id', profile.id)
    .single()

  const productCount = creatorProfile?.total_products || 0

  // Format date
  const joinedDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown'

  // Get display name (fallback to username)
  const displayName = profile.display_name || profile.username

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <div className="mx-auto max-w-5xl">
          <ProfileHeader
            profile={profile}
            isOwnProfile={isOwnProfile}
          />

          {/* Profile Info Section */}
          <div className="mt-8 px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{displayName}</h1>
                <p className="text-white/40">@{profile.username}</p>

                {/* Role Badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <RoleBadge
                    isCreator={profile.is_creator}
                    isVendor={profile.is_vendor}
                    isAdmin={profile.is_admin}
                    isQuantumWeaver={profile.is_quantum_weaver}
                  />
                  <HouseBadge house={profile.primary_house} />
                </div>
              </div>

              <SovereigntyScore score={profile.sovereignty_score || 0} />
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-4 text-white/80">{profile.bio}</p>
            )}

            {/* Member Since */}
            <p className="mt-4 text-sm text-white/40">
              Joined {joinedDate}
            </p>

            {/* Community Profile Info (if available and own profile) */}
            {isOwnProfile && communityProfile && (
              <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
                {/* Neurodivergent Identity */}
                {communityProfile.nd_identity &&
                  communityProfile.nd_identity.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white/60">
                        Neurodivergent Identity
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {communityProfile.nd_identity.map((identity: string) => (
                          <span
                            key={identity}
                            className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400"
                          >
                            {identity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Sensory Accommodations */}
                {communityProfile.sensory_accommodations &&
                  communityProfile.sensory_accommodations.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white/60">
                        Sensory Accommodations
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {communityProfile.sensory_accommodations.map(
                          (acc: string) => (
                            <span
                              key={acc}
                              className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400"
                            >
                              {acc}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Communication Style */}
                {communityProfile.communication_style && (
                  <div>
                    <h3 className="text-sm font-medium text-white/60">
                      Communication Style
                    </h3>
                    <p className="mt-1 text-sm text-white/80 capitalize">
                      {communityProfile.communication_style}
                    </p>
                  </div>
                )}

                {/* House Progress */}
                {communityProfile.joined_house && (
                  <div>
                    <h3 className="text-sm font-medium text-white/60">
                      House Journey
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {communityProfile.house_initiate && 'Initiate • '}
                      {communityProfile.house_adept && 'Adept • '}
                      {communityProfile.house_master && 'Master'}
                      {!communityProfile.house_initiate && 'Not yet started'}
                    </p>
                  </div>
                )}

                {/* Mentor Status */}
                {communityProfile.is_mentor && (
                  <div>
                    <h3 className="text-sm font-medium text-white/60">
                      Mentor
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      Mentoring {communityProfile.mentee_count} people
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-8 px-6">
            <ProfileTabs
              username={profile.username || 'user'}
              isOwnProfile={isOwnProfile}
              productCount={productCount}
            />
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}