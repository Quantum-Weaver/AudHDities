// src/app/(dashboard)/profile/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import ProfileTabs from '@/components/profiles/ProfileTabs';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile | AUDHDITIES',
  description: 'View profile',
};

export default async function ProfilePage({
  params,
}: {
  params: { username?: string };
}) {
  const supabase = await createServerSupabase();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Determine which profile to show
  let profile;
  
  if (params?.username) {
    // Viewing someone else's profile by username
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', params.username)
      .single();
    profile = data;
  } else if (user) {
    // Viewing own profile
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  } else {
    redirect('/login');
  }

  if (!profile) {
    notFound();
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={isOwnProfile}
        />

        <div className="container max-w-7xl mx-auto px-6 mt-16">
          {/* Profile Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {profile.display_name || profile.username}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-white/60 mb-6">
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={14} />
                Joined {new Date(profile.created_at!).toLocaleDateString()}
              </span>
              {profile.is_quantum_weaver && (
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                  Quantum Weaver
                </span>
              )}
              {profile.is_admin && (
                <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                  Admin
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-white/80 max-w-2xl">{profile.bio}</p>
            )}
          </div>

          {/* Tabs */}
          <ProfileTabs 
            username={profile.username || 'user'}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </main>
    </AuthGuard>
  );
}